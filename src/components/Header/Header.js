import React, { useCallback, useContext, useMemo, useState } from "react";

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
    backgroundColor: theme.palette.colors.white,
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: "relative",
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  "&.MuiToolbar-root": {
    minHeight: HEADER.HEIGHT,
    maxHeight: HEADER.HEIGHT,
    backgroundColor: theme.palette.colors.white,
    display: "flex",
  },
}));

// eslint-disable-next-line no-unused-vars
const StypedTypography = styled(Typography)(({ theme }) => ({
  "&.MuiTypography-subtitle1": {
    color: theme.palette.colors.black87,
    paddingLeft: 8,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  "&.MuiAvatar-root": {
    backgroundColor: theme.palette.primary.main,
    fontSize: 16,
    width: 32,
    height: 32,
    marginRight: 24,
  },
}));

const Header = () => {
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
                  <Typography variant="h5" color="secondary">
                    {APP_TITLE}
                  </Typography>
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
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={handleOnLoginDialogOpen}
                    >
                      {LOGIN}
                    </Button>
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
      <Login open={openLoginDialog} onCancel={handleOnLoginDialogClose} />
    </>
  );
};

Header.propTypes = {};

export default React.memo(Header);
