/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, InputAdornment, IconButton, TextField } from "@mui/material";
import {
  CheckCircleOutline,
  ContentCopy,
  LockReset,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import AlertSnackbar from './AlertSnackbar.jsx';
import PasswordGenerator from "../lib/passwordGenerator";
import { checkIsPasswordCompromised } from "@/common/Compromised.jsx";


const PasswordGeneratorField = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [openCopyAlert, setOpenCopyAlert] = useState(false);
  const [openPasswordAlert, setOpenPasswordAlert] = useState(false);
  const [passwordAlertMessage, setPasswordAlertMessage] = useState("");
  const [passwordAlertSeverity, setPasswordAlertSeverity] = useState("success");

  const { handlePasswordChange, password, passwordError } = props;

  const pwg = new PasswordGenerator({
    includeUpper: true,
    includeLower: true,
    includeSymbol: false, // Setting to false since symbols can cause some illegal values for certain sites. If we extend our UI functionality in the future, users can select or deselect all these options.
    includeNumber: true,
  });

  const showHidePassword = () => setShowPassword(!showPassword);
  const copyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setOpenCopyAlert(true);
    }
  }

  const showPasswordAlert = (message, severity) => {
    setPasswordAlertMessage(message);
    setPasswordAlertSeverity(severity);
    setOpenPasswordAlert(true);
  }

  const onCompromisedPasswordCheck = (password) => {
    if (password.length) {
      checkIsPasswordCompromised(password).then((score) => {
        if(score === "-1") {
          showPasswordAlert("Compromised password checking is not available.", "warning");
        } else if (score === "0") {
          showPasswordAlert("This password was not found in any known data breaches.", "success");
        } else {
          showPasswordAlert(`This password has been exposed ${score} ${score > 1? "times" : "time"} 
          in data breaches.`, "error");
        }
      });
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ alignSelf: "flex-end" }}>
        <IconButton
          aria-label="toggle password copy"
          onClick={() => handlePasswordChange(pwg.getRandomPassword())}>
          <LockReset />
        </IconButton>
        <IconButton
          aria-label="compromised password check"
          onClick={() => onCompromisedPasswordCheck(password)}>
          <CheckCircleOutline />
        </IconButton>
      </Box>

      <TextField
        sx={{ flexGrow: 1 }}
        label="Password"
        variant="outlined"
        value={password}
        error={passwordError.status}
        helperText={passwordError.message}
        type={showPassword ? "text" : "password"}
        onChange={(event) => handlePasswordChange(event.target.value)}
        InputProps={{
          endAdornment: (
            <>
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={showHidePassword}
                  onMouseDown={showHidePassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password copy"
                  onClick={copyPassword}
                  onMouseDown={copyPassword}>
                  <ContentCopy />
                </IconButton>
              </InputAdornment>
            </>
          ),
        }}
      />
      <AlertSnackbar
        open={openCopyAlert}
        setOpen={setOpenCopyAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        duration={2000}
        message={"Password Copied"}
        severity={"success"}
      />
      <AlertSnackbar
        open={openPasswordAlert}
        setOpen={setOpenPasswordAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        duration={3000}
        message={passwordAlertMessage}
        severity={passwordAlertSeverity}
      />
    </Box>
  );
};
export default PasswordGeneratorField;
