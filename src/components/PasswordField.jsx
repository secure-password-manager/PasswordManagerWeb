/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, InputAdornment, IconButton, TextField } from "@mui/material";
import {
  ContentCopy,
  LockReset,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import SnackBar from './SnackBar'
import PasswordGenerator from "../lib/passwordGenerator";


const PasswordGeneratorField = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
      setOpenSnackbar(true);
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
      <SnackBar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        duration={2000}
        message={"Password Copied"}
        open={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      />
    </Box>
  );
};
export default PasswordGeneratorField;
