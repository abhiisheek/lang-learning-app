import React from "react";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  CardActions,
  Button,
} from "@mui/material";
import messages from "../../constants/messages";
import constants from "../../constants/constants";
import { getImagesByLangAndLevel } from "../../utils/app";

const {
  COURSE: { LANGUAGE, LEVEL, ENROLL },
} = messages;

const { LEVEL_MAP, STATUS_MAP } = constants;

const data = {
  _id: "c1",
  title: "English Basics 1",
  description:
    "This is first part of the English basics series. This for beginners",
  langId: 222,
  level: 1,
  contents: {
    youtubeVideoSrcId: "L2vS_050c-M",
    audioSrc: "https://www2.cs.uic.edu/~i101/SoundFiles/preamble10.wav",
    textContent: `A paragraph with *emphasis* and **strong importance**.`,
  },
  status: 1,
};

const CourseCard = (props = data) => {
  const status = STATUS_MAP[props.status];
  const lang = props?.langMap[props?.langId];

  return (
    <Card>
      <CardActionArea disabled={props.actionAreaDiabled}>
        <CardContent style={{ padding: 0 }}>
          <CardMedia
            component="img"
            height="140"
            image={getImagesByLangAndLevel(lang?.label, props?.level)}
            alt={props.title}
          />
          <div style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom component="div">
              {props.title}
              {status && (
                <Chip
                  {...status}
                  size="small"
                  style={{
                    height: 16,
                    fontSize: 12,
                    marginTop: -6,
                    marginLeft: 4,
                  }}
                />
              )}
            </Typography>
            <Typography variant="caption" gutterBottom component="div">
              {props.description}
            </Typography>
            <Grid container>
              <Grid item md={6}>
                <Typography
                  variant="caption"
                  gutterBottom
                  style={{ fontWeight: 600 }}
                >
                  {LANGUAGE} : {lang?.label}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="caption"
                  gutterBottom
                  style={{ fontWeight: 600 }}
                >
                  {LEVEL} : {LEVEL_MAP[props.level]?.label}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </CardActionArea>
      {props.actionAreaDiabled && (
        <CardActions style={{ float: "right" }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{ borderRadius: 25 }}
            onClick={props.onEnroll}
          >
            {ENROLL}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default React.memo(CourseCard);
