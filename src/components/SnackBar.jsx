import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function SnackBar(props) {
  const { anchorOrigin, duration, open, setOpenSnackbar } = props;

  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackBar}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={anchorOrigin}
        autoHideDuration={duration}
        onClose={closeSnackBar}
        message="Password Copied"
        action={action}
      />
    </div>
  );
}
