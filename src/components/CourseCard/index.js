import React from "react";
import PropTypes from "prop-types";

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

// const data = {
//   _id: "c1",
//   title: "English Basics 1",
//   description:
//     "This is first part of the English basics series. This for beginners",
//   langId: 222,
//   level: 1,
//   contents: {
//     youtubeVideoSrcId: "L2vS_050c-M",
//     audioSrc: "https://www2.cs.uic.edu/~i101/SoundFiles/preamble10.wav",
//     textContent: `A paragraph with *emphasis* and **strong importance**.`,
//   },
//   status: 1,
// };

const CourseCard = ({
  status,
  langId,
  langMap,
  onClick,
  onEnroll,
  title,
  level,
  actionAreaDiabled,
  description,
}) => {
  const statusDetails = STATUS_MAP[status];
  const lang = langMap[langId];

  return (
    <Card>
      <CardActionArea disabled={actionAreaDiabled} onClick={onClick}>
        <CardContent style={{ padding: 0 }}>
          <CardMedia
            component="img"
            height="140"
            image={getImagesByLangAndLevel(lang?.label, level)}
            alt={title}
          />
          <div style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom component="div">
              {title}
              {status && (
                <Chip
                  {...statusDetails}
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
              {description}
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
                  {LEVEL} : {LEVEL_MAP[level]?.label}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </CardActionArea>
      {actionAreaDiabled && (
        <CardActions style={{ float: "right" }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{ borderRadius: 25 }}
            onClick={onEnroll}
          >
            {ENROLL}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

CourseCard.propTypes = {
  status: PropTypes.string.isRequired,
  langId: PropTypes.number.isRequired,
  langMap: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onEnroll: PropTypes.func,
  title: PropTypes.node.isRequired,
  level: PropTypes.number.isRequired,
  actionAreaDiabled: PropTypes.bool.isRequired,
  description: PropTypes.node.isRequired,
};

export default React.memo(CourseCard);
