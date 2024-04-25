import React, { useState, useCallback } from "react";
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
  LOGIN_DIALOG: { TITLE, EMAIL, PASSWORD, SING_UP, CANCEL_BTN, LOGIN_BTN },
} = messages;

const Login = ({ onLogin, open, onCancel, onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnEmailChange = useCallback(
    (evt) => setEmail(evt.target.value),
    []
  );
  const handleOnPasswordChange = useCallback(
    (evt) => setPassword(evt.target.value),
    []
  );

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{TITLE}</DialogTitle>
      <DialogContent style={{ paddingTop: 20 }}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField
              type="email"
              label={EMAIL}
              fullWidth
              value={email}
              onChange={handleOnEmailChange}
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              label={PASSWORD}
              fullWidth
              value={password}
              onChange={handleOnPasswordChange}
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
                onClick={() => onLogin({ email, password })}
                variant="contained"
              >
                {LOGIN_BTN}
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Button variant="text" onClick={onSignup}>
              {SING_UP}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSignup: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default React.memo(Login);
