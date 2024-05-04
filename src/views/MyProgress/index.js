import React, { useContext, useEffect, useState } from "react";

import { Grid, Alert } from "@mui/material";

import Loader from "../../components/Loader";
import ViewHeader from "../../components/ViewHeader";
import LangProgressCard from "../../components/LangProgressCard";
import { UserContext } from "../../context/UserContext";
import { HTTPRequestWithCaching } from "../../utils/HTTPRequestWithCaching";
import { getURL } from "../../utils/urls";
import constants from "../../constants/constants";

const MyProgress = () => {
  const userDetails = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    HTTPRequestWithCaching.httpRequest({
      url: getURL(constants.URL_KEYS.ASSESSEMENTS),
      token: userDetails.token,
    }).then(
      (res) => {
        setData(Object.values(res));
        setLoading(false);
      },
      () => {
        setData([]);
      }
    );
  }, [userDetails.token]);

  return (
    <>
      <ViewHeader title="My Progress" />
      {loading ? (
        <Loader />
      ) : (
        <Grid container direction="column" spacing={2} style={{ padding: 16 }}>
          {data.map((item) => (
            <Grid item key={item._id}>
              <LangProgressCard {...item} />
            </Grid>
          ))}
          {data.length === 0 && (
            <Grid
              item
              container
              alignItems="center"
              justifyContent="center"
              style={{ height: "50%" }}
            >
              <Grid item>
                <Alert severity="warning">
                  No progress reports available at the moment.
                </Alert>
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default React.memo(MyProgress);
