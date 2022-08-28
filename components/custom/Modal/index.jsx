import React from "react";
import Dialog from "@mui/material/Dialog";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
function Modal({ children, config, showCloseButton = true }) {
  const { isShowing, toggle } = config;
  //
  return (
    <Dialog
      fullWidth
      open={isShowing ?? false}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          toggle();
        }
      }}
      sx={{ textAlign: "end" }}
      scroll="body"
      disableEscapeKeyDown
    >
      {showCloseButton ? (
        <Box p={1}>
          <IconButton onClick={toggle}>
            <CloseIcon />
          </IconButton>
        </Box>
      ) : null}
      <>{children}</>
    </Dialog>
  );
}

export default Modal;
