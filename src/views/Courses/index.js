import React from "react";

import { Grid } from "@mui/material";
import CourseCard from "../../components/CourseCard";

const data = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

const Courses = () => {
  return (
    <Grid container spacing={2} style={{ padding: 24 }}>
      {data.map((item, index) => (
        <Grid item md={4}>
          <CourseCard {...item} actionAreaDiabled />
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(Courses);
