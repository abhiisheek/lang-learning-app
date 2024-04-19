import React from "react";

import { Grid, Typography, Chip, Button } from "@mui/material";
import clsx from "clsx";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import banner from "../../images/english.png";

import messages from "../../constants/messages";

import cssStyles from "./Course.module.css";
import constants from "../../constants/constants";

const props = {
  _id: "c1",
  title: "English Basics 1",
  description:
    "This is first part of the English basics series. This for beginners",
  langId: 222,
  level: 1,
  contents: {
    youtubeVideoSrcId: "L2vS_050c-M",
    audioSrc: "https://www2.cs.uic.edu/~i101/SoundFiles/preamble10.wav",
    textContent: `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`,
  },
  status: 1,
};

const {
  COURSE: { LANGUAGE, LEVEL, MARK_AS_COMPLETE },
} = messages;

const { LEVEL_MAP, STATUS_MAP } = constants;

const Course = () => {
  const status = STATUS_MAP[props.status];

  return (
    <Grid container spacing={2} direction="column" style={{ padding: 8 }}>
      <Grid item>
        <img src={banner} alt="banner" className={cssStyles.banner} />
      </Grid>
      <Grid item container alignItems="center">
        <Typography variant="h5">{props.title}</Typography>
        <Chip {...status} size="small" />
      </Grid>
      <Grid item container>
        <Grid item md={6}>
          <Typography variant="subtitle1">
            {LANGUAGE} : {props.langId}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="subtitle1">
            {LEVEL} : {LEVEL_MAP[props.level]?.label}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2">{props.description}</Typography>
      </Grid>
      <Grid item>
        <div className={cssStyles.videoWrapper}>
          {props.contents.youtubeVideoSrcId && (
            <LiteYouTubeEmbed
              id={props.contents.youtubeVideoSrcId}
              title={props.title}
              wrapperClass={clsx(`yt-lite`, cssStyles.videoPlayer)}
            />
          )}
          {props.contents.audioSrc && (
            <AudioPlayer autoPlay src={props.contents.audioSrc} />
          )}
        </div>
        {props.contents.textContent && (
          <div className={cssStyles.markdownWrapper}>
            <Markdown remarkPlugins={[remarkGfm]}>
              {props.contents.textContent}
            </Markdown>
          </div>
        )}
      </Grid>
      <Grid item container justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: "25px" }}
          >
            {MARK_AS_COMPLETE}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(Course);
