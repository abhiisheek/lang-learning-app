import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";

import {
  Grid,
  Button,
  Chip,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Alert,
} from "@mui/material";

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
import Notifier from "../../components/Notifier";

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
  const { langs, map: langMap } = useContext(LanguagesContext);
  const userPerfernce = useContext(UserPrefernceContext);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [langSelectorOpen, setLangSelectorOpen] = useState(false);
  const [selectedLangs, setSelectedLangs] = useState({});
  const [data, setData] = useState([]);
  const [showNotifier, setShowNotifier] = useState(false);
  const [notifierMsg, setNotifierMsg] = useState("");

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

  const handleOnEnrollConfirm = useCallback(() => {
    setLoading(true);

    HTTPRequestWithCaching.httpRequest({
      url: getURL(constants.URL_KEYS.ENROLL),
      method: constants.API_META.METHOD.POST,
      reqParams: {
        courseId: selectedCourse._id,
        langId: selectedCourse.langId,
        level: selectedCourse.level,
        enrolledTs: Date.now(),
      },
      token: userDetails.token,
    }).then(
      () => {
        setLoading(false);
        setNotifierMsg(
          `"${selectedCourse.title}" has be enrolled successfully!`
        );
        setShowNotifier(true);
        setSelectedCourse("");
      },
      (err) => {
        setLoading(false);
        setNotifierMsg(
          err.errorMessage ||
            `Failed to enroll to "${selectedCourse.title}" course. Try again!`
        );
        setShowNotifier(true);
      }
    );
  }, [selectedCourse, userDetails.token]);

  const alterMsg = useMemo(() => {
    if (Object.keys(selectedLangs).length === 0) {
      return "Please select the languages to view courses.";
    } else if (data.length === 0) {
      return " No courses available for the selected languages.";
    } else {
      return;
    }
  }, [selectedLangs, data]);

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
                disabled={!langs?.length}
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
          {alterMsg && (
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              style={{ height: "50%" }}
            >
              <Grid item>
                {alterMsg && <Alert severity="warning">{alterMsg}</Alert>}
              </Grid>
            </Grid>
          )}
          <Grid container spacing={2} style={{ padding: 24 }}>
            {data.map((item, index) => (
              <Grid item md={4} key={index}>
                <CourseCard
                  {...item}
                  actionAreaDiabled
                  langMap={langMap}
                  onEnroll={() => setSelectedCourse(item)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <Dialog open={selectedCourse} onClose={() => setSelectedCourse("")} xs fullWidth>
        <DialogContent>
          <DialogContentText>
            Do you want to enroll to the course ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setSelectedCourse("")}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleOnEnrollConfirm}
            autoFocus
            variant="contained"
            color="primary"
          >
            Enroll
          </Button>
        </DialogActions>
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

export default React.memo(Courses);
