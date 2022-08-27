import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import { useTripRequestsCtx } from "hook/useSocket";
import { useRouter } from "next/router";
import { usePostTripCreateTrip } from "hook/api/useApiTrip";
import { useUserState } from "hook/useUser";
import useGetLocationName from "hook/useGetLocationName";
import useToast from "hook/useToast";

const ItemForMap = ({ latLng }) => {
  const name = useGetLocationName(latLng);
  return <>{name}</>;
};
//
function TripRequests() {
  //
  const toast = useToast();
  const { tripList, isConnected, SendRequest } = useTripRequestsCtx();
  //
  const { push, query, isReady } = useRouter();
  const user = useUserState();

  const postTripCreateTrip = usePostTripCreateTrip();

  useEffect(() => {
    if (isConnected && query && isReady) {
      SendRequest(query);
    }
  }, [query, isConnected, isReady]);

  const handleSubmit = (trip) => {
    const queryData = { ...trip, ...query };
    push({
      pathname: "/app/start-trip",
      query: queryData,
    });
    // postTripCreateTrip.mutate(
    //   {
    //     driverId: user?.id,
    //     pretripId: trip?.id,
    //   },
    //   {
    //     onSuccess: (res) => {
    //       console.log(res);

    //   },
    //   onError: (err) => {
    //     toast.error({ err });
    //   },
    // }
    // );
  };
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
          {tripList?.map((trip) => (
            <Box key={trip?.id}>
              <Box p={2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography color="gray" width="120px">
                    محدوده مبدا:{" "}
                  </Typography>
                  <ItemForMap
                    latLng={{ lat: trip?.sLatitude1, lng: trip?.sLongitude1 }}
                  />
                  <Typography textAlign="center">{trip?.origin} </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography color="gray" width="120px">
                    محدوده مقصد:{" "}
                  </Typography>
                  <ItemForMap
                    latLng={{
                      lat: trip?.dLatitude1,
                      lng: trip?.dLongitude1,
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography color="gray" width="120px">
                    قیمت:
                  </Typography>
                  <Typography textAlign="center">{trip?.price}</Typography>
                </Box>
                <Box textAlign="end" mt={2}>
                  <Button
                    size="small"
                    color="success"
                    onClick={() => handleSubmit(trip)}
                  >
                    قبول
                  </Button>
                </Box>
              </Box>
              <Divider />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default TripRequests;
