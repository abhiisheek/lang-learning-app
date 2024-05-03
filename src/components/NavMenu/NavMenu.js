import React, { useMemo } from "react";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import { Link, useLocation } from "react-router-dom";

import messages from "../../constants/messages";
import clsx from "clsx";

import cssStyles from "./NavMenu.module.css";

const {
  NAV: { MY_COURSES, MY_REPORTS, COURSES },
} = messages;

const navs = [
  {
    name: MY_COURSES,
    icon: AutoStoriesIcon,
    path: "/my-courses",
  },
  {
    name: MY_REPORTS,
    icon: AssessmentIcon,
    path: "/my-reports",
  },
  {
    name: COURSES,
    icon: SchoolIcon,
    path: "/courses",
  },
];

const NavMenu = () => {
  const location = useLocation();

  const highlightedItemPath = useMemo(() => {
    if (location.pathname.startsWith("/course/")) {
      return "/my-courses";
    }

    return location.pathname;
  }, [location]);

  return (
    <List>
      {navs.map((item) => (
        <ListItem key={item.name} disablePadding>
          <Link
            to={item.path}
            style={{ width: "100%", textDecoration: "none", color: "black" }}
          >
            <ListItemButton
              selected={highlightedItemPath === item.path}
              className={clsx({
                [cssStyles.selected]: highlightedItemPath === item.path,
              })}
            >
              <ListItemIcon
                className={clsx({
                  [cssStyles.selected]: highlightedItemPath === item.path,
                })}
              >
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

export default React.memo(NavMenu);
