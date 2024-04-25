import React, { useCallback, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Button,
} from "@mui/material";

import Logo from "../../images/logo.png";
import { UserContext } from "../../context/UserContext";
import { HTTPRequestWithCaching } from "../../utils/HTTPRequestWithCaching";
import constants from "../../constants/constants";
import messages from "../../constants/messages";
import Login from "./Login";
import { getURL } from "../../utils/urls";
import Notifier from "../Notifier";

import cssStyles from "./Header.module.css";

const {
  HEADER,
  URL_KEYS,
  API_META: { METHOD },
  SESSIONSTORAGE_KEYS: { USERDETAILS },
} = constants;
const {
  APP_TITLE,
  HEADER: { LOGIN, LOGOUT },
  LOGIN_DIALOG: { LOGIN_SUCCESS, LOGIN_ERROR },
} = messages;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  "&.MuiAppBar-root": {
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: "relative",
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  "&.MuiToolbar-root": {
    minHeight: HEADER.HEIGHT,
    maxHeight: HEADER.HEIGHT,
    display: "flex",
  },
}));

const StypedButton = styled(Button)(({ theme }) => ({
  "&.MuiButton-root": {
    color: theme.palette.primary.contrastText,
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
    },
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  "&.MuiAvatar-root": {
    backgroundColor: theme.palette.primary.contrastText,
    fontSize: 16,
    width: 32,
    height: 32,
    color: theme.palette.primary.main,
  },
}));

const Header = ({ onLogin }) => {
  const userDetails = useContext(UserContext);
  const [menuTarget, setMenuTarget] = useState(null);
  const [showNotifier, setShowNotifier] = useState(false);
  const [notifierType, setNotifierType] = useState("info");
  const [notifierMsg, setNotifierMSg] = useState("");
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const handleOnLoginDialogClose = useCallback(
    () => setOpenLoginDialog(false),
    []
  );

  const handleOnLoginDialogOpen = useCallback(
    () => setOpenLoginDialog(true),
    []
  );

  const handleOnAccountMenuOpen = useCallback(
    (evt) => setMenuTarget(evt.currentTarget),
    []
  );

  const handleOnAccountMenuClose = useCallback(
    (evt) => setMenuTarget(null),
    []
  );

  const handleOnLogin = useCallback(
    (payload) => {
      onLogin(true);
      HTTPRequestWithCaching.httpRequest({
        url: getURL(URL_KEYS.LOGIN),
        reqParams: payload,
        method: METHOD.POST,
        cacheResponse: false,
      }).then(
        (res) => {
          const details = res[0];
          const shortId = `${details.name[0]}${
            details.name[details.name.length - 1]
          }`;

          sessionStorage.setItem(USERDETAILS, JSON.stringify(res[0]));
          userDetails.setUserInfo({
            ...userDetails,
            name: details.name,
            email: details.email,
            shortId,
          });

          onLogin(false);
          handleOnLoginDialogClose();
          setNotifierMSg(LOGIN_SUCCESS);
          setNotifierType("success");
          setShowNotifier(true);
        },
        (err) => {
          setNotifierMSg(LOGIN_ERROR);
          setNotifierType("error");
          setShowNotifier(true);
          onLogin(false);
        }
      );
    },
    [onLogin, userDetails, handleOnLoginDialogClose]
  );

  const handleOnNotifierClose = useCallback(() => setShowNotifier(false), []);

  const menuOpen = useMemo(() => Boolean(menuTarget), [menuTarget]);

  return (
    <>
      <StyledAppBar>
        <StyledToolbar>
          <Grid container alignItems="center">
            <Grid item md={6}>
              <Grid
                container
                sx={{ height: HEADER.HEIGHT }}
                alignItems="center"
              >
                <Grid item>
                  <img src={Logo} alt="app-logo" className={cssStyles.logo} />
                </Grid>
                <Grid item>
                  <Typography variant="h5">{APP_TITLE}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6}>
              <Grid
                container
                alignItems="center"
                justifyContent="end"
                sx={{ height: "100%" }}
                spacing={2}
              >
                <Grid item>
                  {userDetails.email ? (
                    <StyledAvatar
                      component={IconButton}
                      onClick={handleOnAccountMenuOpen}
                    >
                      {userDetails.shortId}
                    </StyledAvatar>
                  ) : (
                    <StypedButton
                      variant="outlined"
                      size="small"
                      onClick={handleOnLoginDialogOpen}
                    >
                      {LOGIN}
                    </StypedButton>
                  )}
                  <Menu
                    anchorEl={menuTarget}
                    open={menuOpen}
                    onClose={handleOnAccountMenuClose}
                  >
                    <MenuItem>{userDetails.name}</MenuItem>
                    <Divider />
                    <MenuItem onClick={() => {}}>{LOGOUT}</MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </StyledToolbar>
      </StyledAppBar>
      <Login
        open={openLoginDialog}
        onCancel={handleOnLoginDialogClose}
        onLogin={handleOnLogin}
        onSignup={() => {}} // TODO
      />
      <Notifier
        open={showNotifier}
        onClose={handleOnNotifierClose}
        severity={notifierType}
        message={notifierMsg}
      />
    </>
  );
};

Header.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default React.memo(Header);
