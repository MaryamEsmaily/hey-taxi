import {
  Box,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import React, { useEffect } from "react";
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
//
const initialValues = {
  origin: "",
  destination: "",
  numOfTripper: "1",
};
//
function TripDetails({ markers }) {
  const { push } = useRouter();
  const { toggle, config } = useModal();

  const handleSubmit = (values) => {
    toggle();
  };
  //
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    formik.getFieldProps("origin").onChange({
      target: {
        value: markers?.[0]?.lat,
        name: "origin",
      },
    });
    formik.getFieldProps("destination").onChange({
      target: {
        value: markers?.[1]?.lat,
        name: "destination",
      },
    });
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
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeOutlinedIcon color="warning" />
                    </InputAdornment>
                  ),
                }}
                {...formik.getFieldProps("origin")}
              />
              <TextField
                placeholder="مقصد"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PlaceOutlinedIcon color="warning" />
                    </InputAdornment>
                  ),
                }}
                {...formik.getFieldProps("destination")}
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
            {...formik.getFieldProps("numOfTripper")}
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
