import React from "react";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from "@mui/icons-material/Quiz";
import AssessmentIcon from "@mui/icons-material/Assessment";

import { Link } from "react-router-dom";

import messages from "../../constants/messages";

const {
  NAV: { MY_COURSES, MY_REPORTS, COURSES },
} = messages;

const navs = [
  {
    name: MY_COURSES,
    icon: QuizIcon,
    path: "/my-courses",
  },
  {
    name: MY_REPORTS,
    icon: AssessmentIcon,
    path: "/my-reports",
  },
  {
    name: COURSES,
    icon: QuizIcon,
    path: "/courses",
  },
];

const NavMenu = () => {
  return (
    <List>
      {navs.map((item) => (
        <ListItem key={item.name} disablePadding>
          <Link
            to={item.path}
            style={{ width: "100%", textDecoration: "none", color: "black" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

NavMenu.propTypes = {};

export default React.memo(NavMenu);
