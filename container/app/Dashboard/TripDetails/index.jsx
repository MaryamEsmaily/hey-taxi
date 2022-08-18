import {
  Box,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import SquareIcon from "@mui/icons-material/Square";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { useRouter } from "next/router";
import useModal from "hook/useModal";
import ModalSearchingForTripper from "components/Modal/ModalSearchingForTripper";
import { useFormik } from "formik";
import axios from "axios";
import { usePostTripTripRequest } from "hook/api/useApiTrip";
import { useUserState } from "hook/useUser";
//

const initialValues = {
  sourceAndDest: {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    sLongitude: 0,
    sLatitude: 0,
    dLongitude: 0,
    dLatitude: 0,
  },
  passesNum: 0,
  passengerId: "",
};
//
function TripDetails({ markers }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState();
  const { push } = useRouter();
  const { toggle, config } = useModal();
  const user = useUserState();
  //
  const postTripTripRequest = usePostTripTripRequest();
  const handleSubmit = (values) => {
    postTripTripRequest.mutate(
      {
        sourceAndDest: {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          sLongitude: 51.4152,
          sLatitude: 35.6872,
          dLongitude: +markers?.[1].lng,
          dLatitude: +markers?.[1].lat,
        },
        passesNum: 3 - values.passesNum,
        passengerId: user?.id,
      },
      {
        onSuccess: (res) => {
          toggle();
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };
  //
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (markers?.[0]) {
      axios
        .get("https://api.neshan.org/v4/reverse", {
          params: {
            ...markers?.[0],
          },
          headers: {
            "Api-Key": "service.7f87d05ab66c440098e036b97f3dd1b1",
          },
        })
        .then((res) => {
          setOrigin(res?.data?.formatted_address);
        });
    } else setOrigin("");

    if (markers?.[1]) {
      axios
        .get("https://api.neshan.org/v4/reverse", {
          params: {
            ...markers?.[1],
          },
          headers: {
            "Api-Key": "service.7f87d05ab66c440098e036b97f3dd1b1",
          },
        })
        .then((res) => {
          setDestination(res?.data?.formatted_address);
        });
    } else setDestination("");
  }, [markers]);

  return (
    <>
      <ModalSearchingForTripper config={config} />
      <Box pt={5} px={6} sx={{ bgcolor: "background.paper" }} height="100%">
        <Box
          mb={8}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={() => push("/profile")}>
            <AccountCircleOutlinedIcon color="warning" />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalTaxiIcon color="warning" sx={{ fontSize: 20 }} />
            <Typography>هی تاکسی!</Typography>
          </Box>
        </Box>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Typography
            fontSize="24px"
            sx={{
              textAlign: "center",
            }}
            mb={3}
          >
            مشخصات مسیر
          </Typography>
          <Box
            mb={8}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Box px={2}>
              <TextField
                sx={{ mb: 2 }}
                placeholder="مبدا"
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeOutlinedIcon color="warning" />
                    </InputAdornment>
                  ),
                }}
                value={origin}
              />
              <TextField
                placeholder="مقصد"
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PlaceOutlinedIcon color="warning" />
                    </InputAdornment>
                  ),
                }}
                value={destination}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CircleIcon color="warning" sx={{ fontSize: 8 }} />
              <Divider
                orientation="vertical"
                sx={{ height: 45, borderColor: "#ffc73f" }}
                variant="middle"
              />
              <SquareIcon color="warning" sx={{ fontSize: 8 }} />
            </Box>
          </Box>
          <Typography
            fontSize="24px"
            my={3}
            sx={{
              textAlign: "center",
            }}
          >
            تعداد نفرات
          </Typography>
          <TextField
            type="number"
            defaultValue={1}
            InputProps={{
              inputProps: { min: 1, max: 3 },
              startAdornment: (
                <InputAdornment position="start">
                  <PeopleAltOutlinedIcon color="warning" />
                </InputAdornment>
              ),
            }}
            sx={{
              pl: 2,
              pr: 3,
              mb: 10,
              textAlign: "center",
              "*::-webkit-inner-spin-button": {
                opacity: 1,
              },
              "*::-webkit-outer-spin-button": {
                opacity: 1,
              },
              "& input": {
                textAlign: "center",
              },
            }}
            {...formik.getFieldProps("passesNum")}
          />
          <Box pl={2} pr={3}>
            <Button
              type="submit"
              fullWidth
              sx={{ borderRadius: "50px" }}
              color="neutral"
            >
              ثبت درخواست
            </Button>
            <Button
              fullWidth
              sx={{ borderRadius: "50px", mt: 1 }}
              color="neutral"
              variant="text"
              onClick={() => formik.resetForm()}
            >
              لغو
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default TripDetails;
