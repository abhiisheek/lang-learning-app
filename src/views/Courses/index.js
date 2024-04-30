import React, { useState, useEffect, useContext, useMemo } from "react";

import { Grid, Button, Chip, Typography } from "@mui/material";

import { UserContext } from "../../context/UserContext";
import { LanguagesContext } from "../../context/LanguagesContext";
import { UserPrefernceContext } from "../../context/UserPrefernceContext";
import { HTTPRequestWithCaching } from "../../utils/HTTPRequestWithCaching";
import CourseCard from "../../components/CourseCard";
import Loader from "../../components/Loader";
import ViewHeader from "../../components/ViewHeader";
import LangSelector from "../../components/LangSelector";
import { getURL } from "../../utils/urls";
import constants from "../../constants/constants";

// const data1 = [
//   {
//     _id: "c1",
//     title: "English Basics 1",
//     description:
//       "This is first part of the English basics series. This for beginners",
//     langId: 222,
//     level: 1,
//     contents: {
//       youtubeVideoSrcId: "L2vS_050c-M",
//       audioSrc: "https://www2.cs.uic.edu/~i101/SoundFiles/preamble10.wav",
//       textContent: `A paragraph with *emphasis* and **strong importance**.`,
//     },
//     status: 1,
//   }
// ];

const Courses = () => {
  const userDetails = useContext(UserContext);
  const langs = useContext(LanguagesContext);
  const userPerfernce = useContext(UserPrefernceContext);
  const [loading, setLoading] = useState(false);
  const [langSelectorOpen, setLangSelectorOpen] = useState(false);
  const [selectedLangs, setSelectedLangs] = useState({});
  const [data, setData] = useState([]);

  const langMap = useMemo(() => {
    const map = {};

    langs.forEach((item) => (map[item._id] = item));

    return map;
  }, [langs]);

  useEffect(() => {
    if (userPerfernce.langs) {
      setSelectedLangs(userPerfernce.langs);
    }
  }, [userPerfernce.langs]);

  useEffect(() => {
    setLoading(true);
    HTTPRequestWithCaching.httpRequest({
      url: `${getURL(constants.URL_KEYS.COURSES)}`,
      method: constants.API_META.METHOD.POST,
      reqParams: {
        langIds: Object.keys(selectedLangs),
      },
      token: userDetails.token,
    }).then(
      (res) => {
        setLoading(false);
        setData(res);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
  }, [userDetails.token, selectedLangs]);

  return (
    <>
      <ViewHeader title="Courses" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
            style={{ padding: "16px 24px 0 0" }}
          >
            <Grid item>
              <Typography variant="subtitle1">Selected Languages :</Typography>
            </Grid>
            {Object.values(selectedLangs).map((item) => (
              <Grid item key={item.langId}>
                <Chip label={item.label} variant="outlined" />
              </Grid>
            ))}
            <Grid item>
              <Button
                onClick={() => setLangSelectorOpen(true)}
                variant="outlined"
                color="primary"
                size="small"
              >
                Change
              </Button>
            </Grid>
          </Grid>
          <LangSelector
            open={langSelectorOpen}
            selected={selectedLangs}
            onSelectedChange={setSelectedLangs}
            onCancel={() => setLangSelectorOpen(false)}
          />
          <Grid container spacing={2} style={{ padding: 24 }}>
            {data.map((item, index) => (
              <Grid item md={4} key={index}>
                <CourseCard {...item} actionAreaDiabled langMap={langMap} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default React.memo(Courses);
