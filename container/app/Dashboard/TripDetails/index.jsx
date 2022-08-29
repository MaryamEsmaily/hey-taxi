import {
  Box,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
  Grid,
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
  const [checked, setChecked] = useState(false);
  //
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
        passengerId: user?.passId,
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
            "Api-Key": "service.71e4b3742d254ed797f31bdec2a100401",
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
            "Api-Key": "service.71e4b3742d254ed797f31bdec2a10040",
          },
        })
        .then((res) => {
          setDestination(res?.data?.formatted_address);
        });
    } else setDestination("");
  }, [markers]);

  return (
    <>
      <ModalSearchingForTripper
        config={config}
        passengerNum={formik?.values.passesNum}
      />
      <Box
        zIndex={999}
        position="fixed"
        top="10px"
        left="50%"
        sx={{ bgcolor: "background.paper", transform: "translateX(-50%)" }}
        display="flex"
        alignItems="center"
        width="90%"
        maxWidth="600px"
        height="70px"
        justifyContent="space-between"
        px="20px"
        boxShadow="0 6px 15px 0 rgb(0 0 0 / 10%)"
        borderRadius="8px"
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocalTaxiIcon color="warning" sx={{ fontSize: 35, mr: 2 }} />
          <Box>
            <Typography fontSize="16px">هی تاکسی!</Typography>
            <Typography fontSize="12px" color="rgb(0,0,0,0.4)">
              سامانه درخواست خودرو
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={() => push("/profile")}>
          <AccountCircleOutlinedIcon color="warning" />
        </IconButton>
      </Box>
      <Box
        zIndex={999}
        position="fixed"
        bottom="10px"
        left="50%"
        p="20px"
        sx={{ bgcolor: "background.paper", transform: "translateX(-50%)" }}
        boxShadow="0 6px 15px 0 rgb(0 0 0 / 10%)"
        borderRadius="8px"
        width="90%"
        maxWidth="600px"
      >
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={0} p="0" alignItems={"center"}>
            <Grid item xs={12}>
              <TextField
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "orange",
                      "&.Mui-checked": {
                        color: "orange",
                      },
                    }}
                    checked={checked}
                    onChange={(e) => {
                      setChecked(e.target.checked);
                      formik.setFieldValue("passesNum", 3);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="همسفر نمی خواهم"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                defaultValue={1}
                InputProps={{
                  disabled: checked ? true : false,
                  readOnly: checked ? true : false,
                  inputProps: { min: 1, max: 3 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <PeopleAltOutlinedIcon color="warning" />
                    </InputAdornment>
                  ),
                }}
                sx={{
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
            </Grid>
            <Grid item xs={12} pt={1}>
              <Button type="submit" fullWidth color="neutral" size="large">
                ثبت درخواست
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default TripDetails;
