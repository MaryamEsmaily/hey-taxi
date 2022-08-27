import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import Modal from "components/custom/Modal";
import { useTripRequestsCtx } from "hook/useSocket";
import React, { useEffect, useState } from "react";
//
function ModalSearchingForTripper({ config }) {
  const { requestStatus } = useTripRequestsCtx();

  const [status, setStatus] = useState();

  useEffect(() => {
    switch (requestStatus) {
      case 1:
        setStatus("همسفری برای شما پیدا شد");
        break;
      case 2:
        setStatus("درخواست شما توسط راننده قبول شد");
        break;
      case 3:
        setStatus("درحال جستجوی همسفر");
        break;

      default:
        setStatus("منتظر بمانید");
        break;
    }
  }, [requestStatus]);

  return (
    <Modal showCloseButton={false} config={config}>
      <Card
        sx={{
          width: "100%",
          maxWidth: "600px",
          padding: 5,
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" textAlign={"center"} py={3}>
            درخواست شما ثبت شد
          </Typography>
          <Typography variant="h6" textAlign={"center"} pb={1}>
            {status}
          </Typography>
          <CircularProgress color="warning" />
        </CardContent>
        <CardActions sx={{ justifyContent: "center", px: 10 }}>
          <Button
            sx={{ borderRadius: "50px", px: 7 }}
            color="error"
            onClick={() => config.toggle()}
          >
            لغو
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

export default ModalSearchingForTripper;
