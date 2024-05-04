import React, { useMemo } from "react";
import PropTypes from "prop-types";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

import constants from "../../constants/constants";

const steps = [
  {
    id: 1,
    label: "Beginner",
  },
  {
    id: 2,
    label: "Intermediate",
  },
  {
    id: 3,
    label: "Advanced",
  },
];

// const data = {
//   label: "English",
//   proficiency: 1,
//   enrolledCourses: {
//     "6633cb92fab239f1872274b1": {
//       enrolledts: 1714670482074,
//     },
//     "6635d8cbb5bd1694e2ddb22a": {
//       enrolledTs: 1714804939700,
//     },
//   },
//   completedCourses: {
//     "6633cb92fab239f1872274b1": {
//       completedTs: 1714806015457,
//     },
//   },
//   _id: 1,
//   startedCourses: {
//     "6633cb92fab239f1872274b1": {
//       startedTs: 1714804939700,
//     },
//   },
// };

const LangProgressCard = (props) => {
  const {
    label,
    proficiency,
    enrolledCourses,
    startedCourses,
    completedCourses,
  } = props;

  const totalCourses = useMemo(
    () => Object.keys(enrolledCourses).length,
    [enrolledCourses]
  );
  const chartData = useMemo(() => {
    const completedCount = Object.keys(completedCourses).length;
    const startedCount = Object.keys(startedCourses).length;
    const notstartedCount = totalCourses - completedCount - startedCount;

    return [
      {
        id: 1,
        value: notstartedCount,
        label: "Not Started",
      },
      {
        id: 2,
        value: startedCount,
        label: "In Progress",
      },
      {
        id: 3,
        value: completedCount,
        label: "Completed",
      },
    ];
  }, [totalCourses, startedCourses, completedCourses]);

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="primary">
          {label}
        </Typography>
        <Grid container spacing={2}>
          <Grid
            item
            md={6}
            container
            direction="column"
            justifyContent="space-around"
          >
            <Grid item container spacing={1}>
              <Grid item>
                <Typography gutterBottom variant="subtitle1" color="secondary">
                  Proficiency:
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  color="secondary"
                  style={{ fontWeight: 600 }}
                >
                  {constants.LEVEL_MAP[proficiency]?.label}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Stepper alternativeLabel>
                {steps.map((item) => (
                  <Step
                    key={item.id}
                    completed={item.id === proficiency}
                    active={0}
                  >
                    <StepLabel>{item.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
          </Grid>
          <Grid item md={6} container direction="column">
            <Grid item>
              <Typography gutterBottom variant="subtitle1" color="secondary">
                Total no. of courses enrolled: {totalCourses}
              </Typography>
            </Grid>
            {totalCourses > 0 && (
              <Grid item>
                <PieChart
                  colors={[
                    "rgba(25, 34, 63, 0.78)",
                    "rgb(253, 212, 0)",
                    "rgb(132, 183, 97)",
                  ]}
                  series={[
                    {
                      data: chartData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                      },
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

LangProgressCard.propTypes = {
  label: PropTypes.string.isRequired,
  proficiency: PropTypes.number.isRequired,
  enrolledCourses: PropTypes.object.isRequired,
  startedCourses: PropTypes.object.isRequired,
  completedCourses: PropTypes.object.isRequired,
};

export default React.memo(LangProgressCard);
