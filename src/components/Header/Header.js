import React, { useContext } from "react";

import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, Avatar, Typography, Grid } from "@mui/material";

import Logo from "../../images/logo.png";

import { UserContext } from "../../context/UserContext";

import constants from "../../constants/constants";
import messages from "../../constants/messages";

import cssStyles from "./Header.module.css";

const { HEADER } = constants;
const { APP_TITLE } = messages;

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
  },
}));

const Header = () => {
  const userDetails = useContext(UserContext);

  return (
    <StyledAppBar>
      <StyledToolbar>
        <Grid container alignItems="center">
          <Grid item md={6}>
            <Grid container sx={{ height: HEADER.HEIGHT }} alignItems="center">
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
                <Grid container>
                  <StyledAvatar>{userDetails.shortId}</StyledAvatar>
                  <StypedTypography variant="subtitle1">
                    {userDetails.userid}
                  </StypedTypography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledToolbar>
    </StyledAppBar>
  );
};

Header.propTypes = {};

export default React.memo(Header);
