import React, { useContext, useState, useMemo, useCallback } from "react";

import { Card, Grid, Typography, Button, TextField } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { useNavigate } from "react-router-dom";

import ViewHeader from "../../components/ViewHeader";
import Loader from "../../components/Loader";
import { UserContext } from "../../context/UserContext";
import { HTTPRequestWithCaching } from "../../utils/HTTPRequestWithCaching";
import { getURL } from "../../utils/urls";
import constants from "../../constants/constants";
import Notifier from "../../components/Notifier";

const ManageAccount = () => {
  const userDetails = useContext(UserContext);
  const [openPassword, setOpenPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNotifier, setShowNotifier] = useState(false);
  const [notifierMsg, setNotifierMsg] = useState("");
  const navigate = useNavigate();

  const handleOnBack = useCallback(() => navigate("/my-courses"), [navigate]);

  const handleOnPasswordChange = useCallback(
    (evt) => setPassword(evt.target.value),
    []
  );

  const handleOnOldPasswordChange = useCallback(
    (evt) => setOldPassword(evt.target.value),
    []
  );

  const handleOnConfirmPasswordChange = useCallback(
    (evt) => setConfirmPassword(evt.target.value),
    []
  );

  const isPasswordMatching = useMemo(
    () => password === confirmPassword,
    [password, confirmPassword]
  );

  const isPasswordValid = useMemo(
    () => password.length >= 6 && password.length <= 10,
    [password]
  );

  const isOldPasswordValid = useMemo(
    () => oldPassword.length >= 6 && oldPassword.length <= 10,
    [oldPassword]
  );

  const handleOnUpdatePassword = useCallback(() => {
    setLoading(true);
    HTTPRequestWithCaching.httpRequest({
      url: getURL(constants.URL_KEYS.UPDATE_PASSWORD),
      method: constants.API_META.METHOD.PUT,
      reqParams: { oldPassword, newPassword: password },
      token: userDetails.token,
    }).then(
      () => {
        setLoading(false);
        setOpenPassword(false);
        setShowNotifier(true);
        setNotifierMsg("Password has been updated successfully!");
      },
      () => {
        setLoading(false);
        setShowNotifier(true);
        setNotifierMsg("Failed to update the password");
      }
    );
  }, [userDetails.token, password, oldPassword]);

  return (
    <>
      <Button
        variant="text"
        startIcon={<ArrowBackIosIcon style={{ fontSize: 12 }} />}
        size="small"
        style={{ marginLeft: 8 }}
        onClick={handleOnBack}
      >
        Back
      </Button>
      <ViewHeader title="Manage Account" />
      {loading ? (
        <Loader />
      ) : (
        <Grid container direction="column" spacing={2} style={{ padding: 16 }}>
          <Grid item>
            <Card style={{ padding: 16 }}>
              <Grid container direction="column" spacing={2}>
                <Grid item container spacing={2}>
                  <Grid item>
                    <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                      Name :
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      {userDetails.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item>
                    <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                      Email :
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      {userDetails.email}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container spacing={2} direction="column">
                  {!openPassword && (
                    <Grid item>
                      <Button
                        variant="outlined"
                        onClick={() => setOpenPassword(true)}
                      >
                        Change Password
                      </Button>
                    </Grid>
                  )}
                  {openPassword && (
                    <>
                      <Grid item>
                        <TextField
                          style={{ width: 300 }}
                          type="password"
                          label="Old Password"
                          value={oldPassword}
                          onChange={handleOnOldPasswordChange}
                          helperText="Password must be of 6-10 characters"
                          error={oldPassword && !isOldPasswordValid}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          style={{ width: 300 }}
                          type="password"
                          label="New Password"
                          value={password}
                          onChange={handleOnPasswordChange}
                          helperText="Password must be of 6-10 characters"
                          error={password && !isPasswordValid}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          style={{ width: 300 }}
                          type="password"
                          label="Confirm New Password"
                          disabled={!password}
                          value={confirmPassword}
                          onChange={handleOnConfirmPasswordChange}
                          error={!isPasswordMatching}
                          helperText={
                            !isPasswordMatching && "Passwords not matching."
                          }
                        />
                      </Grid>
                      <Grid item container spacing={2}>
                        <Grid item>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => setOpenPassword(false)}
                          >
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOnUpdatePassword}
                            disabled={
                              !isPasswordMatching ||
                              !isOldPasswordValid ||
                              !isPasswordValid
                            }
                          >
                            Update Password
                          </Button>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}
      <Notifier
        open={showNotifier}
        onClose={() => setShowNotifier(false)}
        severity="info"
        message={notifierMsg}
      />
    </>
  );
};

export default React.memo(ManageAccount);
