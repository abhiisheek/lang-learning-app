import React, { useState, useCallback, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import clsx from "clsx";

import Notifier from "../Notifier";
import { UserContext } from "../../context/UserContext";
import { LanguagesContext } from "../../context/LanguagesContext";
import { UserPrefernceContext } from "../../context/UserPrefernceContext";
import { HTTPRequestWithCaching } from "../../utils/HTTPRequestWithCaching";
import { getURL } from "../../utils/urls";
import Loader from "../Loader";
import constants from "../../constants/constants";
import messages from "../../constants/messages";

import cssStyles from "./LangSelector.module.css";

const {
  LANG_SELECTOR: { TITLE, SAVE_BTN, CANCEL_BTN },
} = messages;

const LangSelector = ({ open, onCancel, selected }) => {
  const userDetails = useContext(UserContext);
  const langs = useContext(LanguagesContext);
  const userPerfernce = useContext(UserPrefernceContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNotifier, setShowNotifier] = useState(false);
  const [notifierMsg, setNotifierMsg] = useState("");

  useEffect(() => {
    // setLoading(true);
    // HTTPRequestWithCaching.httpRequest({
    //   url: getURL(constants.URL_KEYS.LANGUAGES),
    //   token: userDetails.token,
    // }).then(
    //   (res) => {
    //     setLoading(false);
    //     setData(
    //       res.map((item) => {
    //         if (selected[item._id]) {
    //           item.selected = true;
    //         }

    //         return item;
    //       })
    //     );
    //   },
    //   (err) => {
    //     setLoading(false);
    //     console.error("Failed to get languages list.", err);
    //   }
    // );

    if (langs.length) {
      const clonedData = JSON.parse(JSON.stringify(langs));
      setData(
        clonedData.map((item) => {
          if (selected[item._id]) {
            item.selected = true;
          }

          return item;
        })
      );
    }
  }, [langs, selected]);

  const handleOnSelect = useCallback((item) => {
    item.selected = !item.selected;

    setData((d) => {
      return [...d];
    });
  }, []);

  const handleOnSave = useCallback(() => {
    setLoading(true);

    const langsPayload = {};

    data.forEach((item) => {
      if (item.selected) {
        langsPayload[item._id] = item;
      }
    });

    HTTPRequestWithCaching.httpRequest({
      url: getURL(constants.URL_KEYS.PREFERNCES),
      method: constants.API_META.METHOD.PUT,
      token: userDetails.token,
      reqParams: { prefernces: { langs: langsPayload } },
    }).then(
      (res) => {
        setLoading(false);
        userPerfernce.setPrefernces(res);
        onCancel();
        setShowNotifier(true);
        setNotifierMsg("Language perfernce saved successfully!");
      },
      (err) => {
        setLoading(false);
        console.error("Failed to save prefernces.", err);
        setShowNotifier(true);
        setNotifierMsg("Failed to save language prefernce!");
      }
    );
  }, [userPerfernce, userDetails.token, data, onCancel]);

  return (
    <>
      <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
        {loading && <Loader className={cssStyles.loader} />}
        <DialogTitle>{TITLE}</DialogTitle>
        <DialogContent style={{ paddingTop: 20 }}>
          <Grid container spacing={2} direction="column">
            <Grid item container spacing={3}>
              {data.map((item) => (
                <Grid item key={item.id}>
                  <Card>
                    <CardActionArea
                      style={{ padding: 8 }}
                      onClick={() => handleOnSelect(item)}
                      className={clsx({ [cssStyles.selected]: item.selected })}
                    >
                      <CardContent>
                        <Typography variant="h6">{item.label}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Grid item container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button onClick={onCancel} variant="outlined">
                  {CANCEL_BTN}
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={handleOnSave} variant="contained">
                  {SAVE_BTN}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Notifier
        open={showNotifier}
        onClose={() => setShowNotifier(false)}
        severity="info"
        message={notifierMsg}
      />
    </>
  );
};

LangSelector.propTypes = {
  selected: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default React.memo(LangSelector);
