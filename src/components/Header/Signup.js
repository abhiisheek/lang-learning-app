import React, { useState, useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
} from "@mui/material";

import messages from "../../constants/messages";

const {
  SIGNUP_DIALOG: {
    TITLE,
    EMAIL,
    NAME,
    CONFIRM_PASSWORD,
    PASSWORD,
    PASSWORD_NOT_MATCHED,
    CANCEL_BTN,
    SIGNUP_BTN,
    PASSWORD_HELPTEXT,
  },
} = messages;

const Signup = ({ open, onCancel, onSignup }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOnNameChange = useCallback(
    (evt) => setName(evt.target.value),
    []
  );

  const handleOnEmailChange = useCallback(
    (evt) => setEmail(evt.target.value),
    []
  );

  const handleOnPasswordChange = useCallback(
    (evt) => setPassword(evt.target.value),
    []
  );

  const handleOnConfirmPasswordChange = useCallback(
    (evt) => setConfirmPassword(evt.target.value),
    []
  );

  useEffect(() => {
    setEmail("");
    setName("");
    setConfirmPassword("");
    setPassword("");
  }, [open]);

  const isPasswordMatching = useMemo(
    () => password === confirmPassword,
    [password, confirmPassword]
  );

  const isPasswordValid = useMemo(
    () => password.length >= 6 && password.length <= 10,
    [password]
  );

  const isEmailValid = useMemo(
    () => email.match(/[A-Za-z0-9\\._%+\\-]+@[A-Za-z0-9\\.\\-]+\.[A-Za-z]{2,}/),
    [email]
  );

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{TITLE}</DialogTitle>
      <DialogContent style={{ paddingTop: 20 }}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField
              label={NAME}
              fullWidth
              value={name}
              onChange={handleOnNameChange}
            />
          </Grid>
          <Grid item>
            <TextField
              type="email"
              label={EMAIL}
              fullWidth
              value={email}
              onChange={handleOnEmailChange}
              error={email && !isEmailValid}
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              label={PASSWORD}
              fullWidth
              value={password}
              onChange={handleOnPasswordChange}
              helperText={PASSWORD_HELPTEXT}
              error={password && !isPasswordValid}
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              label={CONFIRM_PASSWORD}
              fullWidth
              disabled={!password}
              value={confirmPassword}
              onChange={handleOnConfirmPasswordChange}
              error={!isPasswordMatching}
              helperText={!isPasswordMatching && PASSWORD_NOT_MATCHED}
            />
          </Grid>
          <Grid item container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button onClick={onCancel} variant="outlined">
                {CANCEL_BTN}
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => onSignup({ email, password, name })}
                variant="contained"
                disabled={
                  !isPasswordMatching ||
                  !isEmailValid ||
                  !name ||
                  !isPasswordValid ||
                  !confirmPassword
                }
              >
                {SIGNUP_BTN}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

Signup.propTypes = {
  open: PropTypes.bool.isRequired,
  onSignup: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default React.memo(Signup);
