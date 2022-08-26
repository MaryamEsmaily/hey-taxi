import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import { useTripRequestsCtx } from "hook/useSocket";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { usePostTripCreateTrip } from "hook/api/useApiTrip";
import { useUserState } from "hook/useUser";
//

const initialValues = {
  driverId:'',
  pretripId:''
}

function TripRequests() {
  const { tripList } = useTripRequestsCtx();
  //
  const { push } = useRouter();
  const user = useUserState();


  console.log(tripList)
  const postTripCreateTrip =usePostTripCreateTrip()

  const handleSubmit = (values) => {
    //
    postTripCreateTrip.mutate({

      driverId:user?.id,
      pretripId:''
    }, {
      onSuccess: (res) => {
        
        push("/app/start-trip")
      },
      onError: (err) => {
        toast.error({ err });
      },
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });
  //
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        as="form"
        onSubmit={formik.handleSubmit}
        width="100%"
        bgcolor="#fefefe"
        maxWidth={700}
        borderRadius={3}
        py={4}
        px={3}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={3}
        >
          <IconButton onClick={() => push("/profile")}>
            <AccountCircleOutlinedIcon color="warning" />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalTaxiIcon color="warning" sx={{ fontSize: 20 }} />
            <Typography>هی تاکسی!</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={3}
        >
          <Typography fontSize={26}>درخواست های سفر: </Typography>
          <Button
            size="small"
            color="error"
            onClick={() => push("/app/dashboard")}
          >
            پایان کار
          </Button>
        </Box>

        <Box height="70vh" overflow="auto" bgcolor="#e5e20029" borderRadius={2}>
          {tripList?.map((index, trip) => (
            <>
              <Box key={index} p={2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography color="gray" width="120px">
                    محدوده مبدا:{" "}
                  </Typography>

                  <Typography textAlign="center">{trip?.origin} </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography color="gray" width="120px">
                    محدوده مقصد:{" "}
                  </Typography>
                  <Typography textAlign="center">
                    {" "}
                    {trip?.destination}{" "}
                  </Typography>
                </Box>
                <Box textAlign="end" mt={2}>
                  <Button size="small" color="success" onClick={()=>handleSubmit()}>
                    قبول
                  </Button>
                </Box>
              </Box>
              <Divider />
            </>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default TripRequests;
