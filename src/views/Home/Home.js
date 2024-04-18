import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { Drawer } from "@mui/material";

import { UISettingsContext } from "../../context/UISettingContext";

import Header from "../../components/Header";
import NavMenu from "../../components/NavMenu";

import constants from "../../constants/constants";

import cssStyles from "./Home.module.css";

const { NAV_SIDE_BAR, HEADER, UI_SETTINGS_CONTEXT } = constants;

const Home = ({ children }) => {
  const uiSettings = useMemo(
    () => ({
      ...UI_SETTINGS_CONTEXT,
    }),
    []
  );

  return (
    <UISettingsContext.Provider value={uiSettings}>
      <div className={cssStyles.wrapper}>
        <Header />
        <div
          style={{
            height: `calc(100% - ${HEADER.HEIGHT + 1}px)`,
            // top: HEADER.HEIGHT,
            position: "relative",
            display: "flex",
          }}
        >
          <Drawer
            sx={{
              width: NAV_SIDE_BAR.WIDTH,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: NAV_SIDE_BAR.WIDTH,
                height: `calc(100% - ${HEADER.HEIGHT + 1}px)`,
                top: HEADER.HEIGHT + 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              },
            }}
            variant="persistent"
            anchor="left"
            open={true}
          >
            <NavMenu />
          </Drawer>
          <main style={{ width: "100%" }}>{children}</main>
        </div>
      </div>
    </UISettingsContext.Provider>
  );
};

Home.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(Home);
