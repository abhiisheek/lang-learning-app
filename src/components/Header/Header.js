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

import constants from "../../constants/constants";
import messages from "../../constants/messages";

import cssStyles from "./Header.module.css";
import Login from "./Login";

const { HEADER } = constants;
const {
  APP_TITLE,
  HEADER: { LOGIN, LOGOUT },
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

  const handleOnLogin = useCallback(() => {
    onLogin();
  }, [onLogin]);

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
                  {userDetails.email1 ? (
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
      />
    </>
  );
};

Header.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default React.memo(Header);
