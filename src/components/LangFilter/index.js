import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";

import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

import { UserContext } from "../../context/UserContext";
import { HTTPRequestWithCaching } from "../../utils/HTTPRequestWithCaching";
import { getURL } from "../../utils/urls";
import constants from "../../constants/constants";

const LangFilter = ({ value, onChange }) => {
  const userDetails = useContext(UserContext);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    HTTPRequestWithCaching.httpRequest({
      url: getURL(constants.URL_KEYS.LANGUAGES),
      token: userDetails.token,
    }).then(
      (res) => {
        setOptions(res);
      },
      (err) => {
        console.error("Failed to get languages list.", err);
      }
    );
  }, [userDetails]);

  return (
    <FormControl
      style={{ width: 250, float: "right", margin: "16px 24px 0px 0px" }}
    >
      <InputLabel id="language-select-label">Language</InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        value={value}
        label="Language"
        onChange={onChange}
        disabled={!options.length}
      >
        {options.map((item) => (
          <MenuItem value={item._id}>{item.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

LangFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(LangFilter);
