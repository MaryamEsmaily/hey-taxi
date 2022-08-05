import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import Modal from "components/custom/Modal";
import React from "react";
//
function ModalSearchingForTripper({ config }) {
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
            در حال جستجوی همسفر برای شما هستیم
          </Typography>
          <CircularProgress color="warning" />
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", px: 10 }}>
          <Button type="submit" sx={{ borderRadius: "50px" }} color="neutral">
            ادامه با همین تعداد
          </Button>
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
