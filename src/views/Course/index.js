import React, { useState, useContext, useEffect, useCallback } from "react";

import {
  Grid,
  Typography,
  Chip,
  Button,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import clsx from "clsx";
import { useParams, useNavigate } from "react-router-dom";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Loader from "../../components/Loader";
import messages from "../../constants/messages";
import constants from "../../constants/constants";
import ViewHeader from "../../components/ViewHeader";
import { UserContext } from "../../context/UserContext";
import { LanguagesContext } from "../../context/LanguagesContext";
import { HTTPRequestWithCaching } from "../../utils/HTTPRequestWithCaching";
import { getURL } from "../../utils/urls";
import { getImagesByLangAndLevel } from "../../utils/app";
import Notifier from "../../components/Notifier";

import cssStyles from "./Course.module.css";

// const props = {
//   _id: "6622a51e9ff3b411446d65fd",
//   title: "Intermediate 2",
//   description:
//     "Second part of intermediate series of English language learning",
//   langId: 1,
//   level: 2,
//   status: 0,
//   contents: {
//     textContent:
//       "List Of English Words\n=============\n\nA text file containing over 466k English words.\n",
//     youtubeVideoSrcId: "L2vS_050c-M",
//     audioSrc: "https://www2.cs.uic.edu/~i101/SoundFiles/preamble10.wav",
//   },
// };

const {
  COURSE: { LANGUAGE, LEVEL, MARK_AS_COMPLETE, START_COURSE },
} = messages;

const { LEVEL_MAP, STATUS_MAP } = constants;

const Course = () => {
  const [data, setData] = useState({});
  const { status, langId, title, level, description, contents } = data;
  const statusDetails = STATUS_MAP[status];
  const [loading, setLoading] = useState(false);
  const [operation, setOperation] = useState("");
  const [alterMsg, setAlterMsg] = useState("");
  const userDetails = useContext(UserContext);
  const { map: langMap } = useContext(LanguagesContext);
  const lang = langMap[langId];
  const { id } = useParams();
  const [showNotifier, setShowNotifier] = useState(false);
  const [notifierMsg, setNotifierMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setAlterMsg("");
    HTTPRequestWithCaching.httpRequest({
      url: `${getURL(constants.URL_KEYS.MYCOURSES)}/${id}`,
      token: userDetails.token,
    }).then(
      (res) => {
        setData(res);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        setAlterMsg("Course details not found.");
      }
    );
  }, [id, userDetails.token]);

  const handleOnOperationConfirm = useCallback(() => {
    setLoading(true);
    HTTPRequestWithCaching.httpRequest({
      url: getURL(constants.URL_KEYS.COURSE_STATUS),
      method: constants.API_META.METHOD.PUT,
      token: userDetails.token,
      reqParams: {
        status: operation === "start" ? "IN_PROGRESS" : "COMPLETED",
        timestamp: Date.now(),
        id: id,
        token: userDetails.token,
      },
    }).then(
      (res) => {
        setData((d) => ({ ...d, ...res }));
        setLoading(false);
        setOperation("");
        setNotifierMsg("Courses status has been updated successfully!");
        setShowNotifier(true);
      },
      (err) => {
        setLoading(false);
        setNotifierMsg(err.errorMessage);
        setShowNotifier(true);
      }
    );
  }, [userDetails.token, id, operation]);

  const handleOnBack = useCallback(() => navigate("/my-courses"), [navigate]);

  return (
    <>
      <Button
        variant="text"
        startIcon={<ArrowBackIosIcon style={{ fontSize: 12 }} />}
        size="small"
        style={{ marginLeft: 8 }}
        onClick={handleOnBack}
      >
        Back
      </Button>
      <ViewHeader title="Course Page" />
      {loading ? (
        <Loader />
      ) : (
        <>
          {title && (
            <Grid
              container
              spacing={2}
              direction="column"
              style={{ padding: 8 }}
            >
              <Grid item>
                <img
                  src={getImagesByLangAndLevel(lang?.label, level)}
                  alt="banner"
                  className={cssStyles.banner}
                />
              </Grid>
              <Grid item container alignItems="center">
                <Typography variant="h5">{title}</Typography>
                <Chip
                  {...statusDetails}
                  size="small"
                  style={{ marginLeft: 8 }}
                />
              </Grid>
              <Grid item container>
                <Grid item md={6}>
                  <Typography variant="subtitle1">
                    {LANGUAGE} : {lang.label}
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography variant="subtitle1">
                    {LEVEL} : {LEVEL_MAP[level]?.label}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">{description}</Typography>
              </Grid>
              <Grid item style={{ position: "relative" }}>
                <div className={cssStyles.videoWrapper}>
                  {status === "NOT_STARTED" &&
                    (contents.youtubeVideoSrcId || contents.audioSrc) && (
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        className={cssStyles.overlay}
                      >
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ borderRadius: "25px" }}
                            onClick={() => setOperation("start")}
                          >
                            {START_COURSE}
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  {contents.youtubeVideoSrcId && (
                    <LiteYouTubeEmbed
                      id={contents.youtubeVideoSrcId}
                      title={title}
                      wrapperClass={clsx(`yt-lite`, cssStyles.videoPlayer)}
                    />
                  )}
                  {contents.audioSrc && (
                    <AudioPlayer autoPlay src={contents.audioSrc} />
                  )}
                </div>
                {contents.textContent && (
                  <div className={cssStyles.markdownWrapper}>
                    {status === "NOT_STARTED" && (
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        className={cssStyles.overlay}
                      >
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ borderRadius: "25px" }}
                            onClick={() => setOperation("start")}
                          >
                            {START_COURSE}
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                    <Markdown remarkPlugins={[remarkGfm]}>
                      {contents.textContent}
                    </Markdown>
                  </div>
                )}
              </Grid>
              <Grid item container justifyContent="center">
                <Grid item>
                  {status === "IN_PROGRESS" && (
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ borderRadius: "25px" }}
                      onClick={() => setOperation("complete")}
                    >
                      {MARK_AS_COMPLETE}
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
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
          <Dialog
            open={operation}
            onClose={() => setOperation(false)}
            sm
            fullWidth
          >
            <DialogContent>
              <DialogContentText>
                {`Do you want to ${operation} the course ?`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOperation(false)}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleOnOperationConfirm}
                autoFocus
                variant="contained"
                color="primary"
              >
                {operation === "start" ? START_COURSE : MARK_AS_COMPLETE}
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
      )}
    </>
  );
};

export default React.memo(Course);
