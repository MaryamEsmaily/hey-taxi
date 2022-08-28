import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import Modal from "components/custom/Modal";
import { usePostTripCancelTrip } from "hook/api/useApiTrip";
import { useTripRequestsCtx } from "hook/useSocket";
import useToast from "hook/useToast";
import { useUserState } from "hook/useUser";
import React, { useEffect, useState } from "react";
//
function ModalSearchingForTripper({ config, passengerNum }) {
  const toast = useToast();
  const { requestStatus } = useTripRequestsCtx();

  const [status, setStatus] = useState();

  const postTripCancelTrip = usePostTripCancelTrip();
  const user = useUserState();

  const handleCancel = () => {
    postTripCancelTrip.mutate(
      {
        passengerId: user?.passId,
      },
      {
        onSuccess: (res) => {
          config.toggle();
          toast.success({ res });
        },
        onError: (err) => {
          toast.error({ err });
        },
      }
    );
  };

  useEffect(() => {
    switch (requestStatus) {
      case 1:
        setStatus("همسفری برای شما پیدا شد، در انتظار قبول راننده...");
        break;
      case 2:
        setStatus("درخواست شما توسط راننده قبول شد");
        setTimeout(() => {
          push("/app/accepted-request");
          config.toggle();
        }, 3000);

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
          {passengerNum === 3 ? (
            <Typography variant="h6" textAlign={"center"} pb={1}>
              در انتظار تایید راننده...
            </Typography>
          ) : (
            <Typography variant="h6" textAlign={"center"} pb={1}>
              {status}
            </Typography>
          )}

          <CircularProgress color="warning" />
        </CardContent>
        <CardActions sx={{ justifyContent: "center", px: 10 }}>
          {requestStatus !== 2 ? (
            <Button
              sx={{ borderRadius: "50px", px: 7 }}
              color="error"
              onClick={handleCancel}
            >
              لغو
            </Button>
          ) : null}
        </CardActions>
      </Card>
    </Modal>
  );
}

export default ModalSearchingForTripper;
