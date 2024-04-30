import React, {
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import PropTypes from "prop-types";

import { Drawer } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { UISettingsContext } from "../../context/UISettingContext";
import { UserPrefernceContext } from "../../context/UserPrefernceContext";
import { LanguagesContext } from "../../context/LanguagesContext";
import Header from "../../components/Header";
import NavMenu from "../../components/NavMenu";
import Loader from "../../components/Loader";
import { UserContext } from "../../context/UserContext";
import constants from "../../constants/constants";
import cssStyles from "./Home.module.css";
import { HTTPRequestWithCaching } from "../../utils/HTTPRequestWithCaching";
import { getURL } from "../../utils/urls";

const { NAV_SIDE_BAR, HEADER, UI_SETTINGS_CONTEXT } = constants;

const Home = ({ children }) => {
  const userDetails = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [langs, setLangs] = useState([]);
  const [prefernces, setPrefernces] = useState(
    constants.USER_PREFERNCE_CONTEXT
  );
  const uiSettings = useMemo(
    () => ({
      ...UI_SETTINGS_CONTEXT,
    }),
    []
  );

  const userPrefernce = useMemo(
    () => ({ ...prefernces, setPrefernces }),
    [prefernces]
  );

  useEffect(() => {
    if (location.pathname !== "/courses" && !userDetails.email) {
      navigate("/courses");
    }
  }, [userDetails, location, navigate]);

  const handleOnLogin = useCallback((showLoader) => {
    setLoading(showLoader);
  }, []);

  useEffect(() => {
    if (userDetails.token) {
      setLoading(true);

      HTTPRequestWithCaching.httpRequest({
        url: getURL(constants.URL_KEYS.LANGUAGES),
        token: userDetails.token,
      }).then(
        (res) => {
          setLoading(false);
          setLangs(res);
        },
        (err) => {
          setLoading(false);
          console.error("Failed to get languages list.", err);
        }
      );

      HTTPRequestWithCaching.httpRequest({
        url: getURL(constants.URL_KEYS.PREFERNCES),
        token: userDetails.token,
      }).then(
        (res) => {
          setLoading(false);
          userPrefernce.setPrefernces(res);
        },
        (err) => {
          setLoading(false);
          console.error("Failed to get user perfernces");
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails.token]);

  return (
    <UISettingsContext.Provider value={uiSettings}>
      <UserPrefernceContext.Provider value={userPrefernce}>
        <LanguagesContext.Provider value={langs}>
          <div className={cssStyles.wrapper}>
            {loading && <Loader className={cssStyles.loader} />}
            <Header onLogin={handleOnLogin} />
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
              <main className={cssStyles.mainWrapper}>{children}</main>
            </div>
          </div>
        </LanguagesContext.Provider>
      </UserPrefernceContext.Provider>
    </UISettingsContext.Provider>
  );
};

Home.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(Home);
