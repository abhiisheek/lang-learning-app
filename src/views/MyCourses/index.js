import React, {
  useState,
  useMemo,
  useContext,
  useEffect,
  useCallback,
} from "react";

import { Grid, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CourseCard from "../../components/CourseCard";
import Loader from "../../components/Loader";
import ViewHeader from "../../components/ViewHeader";
import { UserContext } from "../../context/UserContext";
import { LanguagesContext } from "../../context/LanguagesContext";
import { HTTPRequestWithCaching } from "../../utils/HTTPRequestWithCaching";
import { getURL } from "../../utils/urls";
import constants from "../../constants/constants";
import Notifier from "../../components/Notifier";

// const data = [
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
//   },
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
//   },
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
//   },
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
//   },
// ];

const MyCourses = () => {
  const [loading, setLoading] = useState(false);
  const userDetails = useContext(UserContext);
  const { map: langMap } = useContext(LanguagesContext);
  const [data, setData] = useState([]);
  const [showNotifier, setShowNotifier] = useState(false);
  const [notifierMsg, setNotifierMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    HTTPRequestWithCaching.httpRequest({
      url: `${getURL(constants.URL_KEYS.MYCOURSES)}`,
      token: userDetails.token,
    }).then(
      (res) => {
        setLoading(false);
        setData(res);
      },
      (err) => {
        console.error(err);
        setLoading(false);
        setNotifierMsg(
          err.errorMessage || `Failed to load courses. Please try again!`
        );
        setShowNotifier(true);
      }
    );
  }, [userDetails.token]);

  const alterMsg = useMemo(() => {
    if (data.length === 0) {
      return "No courses available for the selected languages.";
    } else {
      return;
    }
  }, [data]);

  const onCourseCardClick = useCallback(
    (item) => navigate(`/course/${item._id}`),
    [navigate]
  );

  return (
    <>
      <ViewHeader title="My Courses" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid container spacing={2} style={{ padding: 24 }}>
            {data.map((item, index) => (
              <Grid item md={4}>
                <CourseCard
                  {...item}
                  langMap={langMap}
                  onClick={() => onCourseCardClick(item)}
                />
              </Grid>
            ))}
          </Grid>
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
          <Notifier
            open={showNotifier}
            onClose={() => setShowNotifier(false)}
            severity="info"
            message={notifierMsg}
          />
        </>
      )}
    </>
  );
};

export default React.memo(MyCourses);
