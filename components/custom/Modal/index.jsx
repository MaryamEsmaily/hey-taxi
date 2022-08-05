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
      onClose={toggle}
      sx={{ textAlign: "end" }}
      scroll="body"
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
