import React from "react";
import getValidationFieldProps from "utils/getValidationFieldProps";
import AuthLayout from "layout/AuthLayout";
import Link from "next/link";
import PasswordInput from "components/PasswordInput/PasswordInput";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AuthPlacard from "components/AuthPlacard";
import useToast from "hook/useToast";
import { useFormik } from "formik";
import registerSchema from "schema/registerSchema";
import RegisterPlacard from "components/RegisterPlacard";
import { useRouter } from "next/router";
//
const initialValues = {
  mobileNumber: "",
  password: "",
};
//
function RegisterPage() {
  const toast = useToast();
  //
  const { push } = useRouter();
  //
  const handleSubmit = (values) => {
    push("/login");
  };
  //
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: registerSchema,
  });

  return (
    <Box borderRadius="8px" width="100%" maxWidth={1000} overflow="hidden">
      <Grid container height="600px">
        <Grid item xs={6}>
          <Box
            backgroundColor="#ffc73f"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: " center",
            }}
            // borderRadius="4px"
            height="100%"
          >
            <Box
              borderRadius="8px"
              backgroundColor="white"
              mx={10}
              p={5}
              component="form"
              onSubmit={formik.handleSubmit}
            >
              <Typography fontSize="18px" fontWeight="bold" mb={1}>
                ثبت نام
              </Typography>
              <Typography fontSize="12px" fontWeight="bold" color="gray" mb={2}>
                مشخصات خود را وارد کنید
              </Typography>
              <TextField
                label="نام کاربری"
                {...formik.getFieldProps("mobileNumber")}
                {...getValidationFieldProps(formik, "mobileNumber")}
              />
              <PasswordInput
                label="رمز عبور"
                {...formik.getFieldProps("password")}
                {...getValidationFieldProps(formik, "password")}
              />
              <PasswordInput
                label="تکرار رمز عبور"
                {...formik.getFieldProps("password")}
                {...getValidationFieldProps(formik, "password")}
              />
              <FormControl size="small">
                <InputLabel id="demo-simple-select-label">نقش کاربر</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="نقش کاربر"
                >
                  <MenuItem value={1}>مسافر</MenuItem>
                  <MenuItem value={2}>راننده</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel sx={{ display: "unset" }}>جنسیت</FormLabel>
                <RadioGroup row>
                  <FormControlLabel
                    value="female"
                    control={<Radio size="small" color="warning" />}
                    label="زن"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio size="small" color="warning" />}
                    label="مرد"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio size="small" color="warning" />}
                    label="سایر"
                  />
                </RadioGroup>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                sx={{ borderRadius: "50px", mt: 2 }}
                color="neutral"
              >
                ثبت نام
              </Button>
              <Box sx={{ textAlign: "center" }}>
                <Link href="/login" passHref>
                  <Typography component="a" fontSize="12px">
                    حساب کاربری دارید؟ ورود
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <RegisterPlacard />
        </Grid>
      </Grid>
    </Box>
  );
}

RegisterPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default RegisterPage;
