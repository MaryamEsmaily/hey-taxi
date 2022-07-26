import React from "react";
import loginSchema from "schema/loginSchema";
import getValidationFieldProps from "utils/getValidationFieldProps";
import { useFormik } from "formik";
import AuthLayout from "layout/AuthLayout";
import Link from "next/link";
import PasswordInput from "components/PasswordInput/PasswordInput";
import useToast from "hook/useToast";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import AuthPlacard from "components/AuthPlacard";
//
const initialValues = {
  mobileNumber: "",
  password: "",
};
//
function LoginPage() {
  //
  const toast = useToast();
  //
  const handleSubmit = (values) => {};
  //
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: loginSchema,
  });
  //
  return (
    <Box
      backgroundColor="#ffc73f"
      borderRadius="8px"
      width="100%"
      maxWidth={1000}
    >
      <Grid container height="504px">
        <Grid item xs={6}>
          <AuthPlacard />
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: " center",
              m: 10,
            }}
            backgroundColor="white"
            borderRadius="4px"
          >
            <Box
              p={5}
              component="form"
              onSubmit={formik.handleSubmit}
              height="full"
            >
              <Typography fontSize="18px" fontWeight="bold" mb={1}>
                ورود
              </Typography>
              <Typography fontSize="12px" fontWeight="bold" color="gray" mb={2}>
                برای استفاده از امکانات سامانه وارد شوید
              </Typography>
              <TextField
                size="small"
                sx={{
                  "& div": {
                    borderRadius: "50px",
                  },
                }}
                label="شماره تماس"
                {...formik.getFieldProps("mobileNumber")}
                {...getValidationFieldProps(formik, "mobileNumber")}
              />
              <PasswordInput
                label="رمز عبور"
                {...formik.getFieldProps("password")}
                {...getValidationFieldProps(formik, "password")}
              />

              <Button
                type="submit"
                fullWidth
                sx={{ borderRadius: "50px", mt: 2 }}
                color="neutral"
              >
                ورود
              </Button>
              <Box sx={{ textAlign: "center" }}>
                <Link href="/register" passHref>
                  <Typography component="a" fontSize="12px">
                    ثبت نام نکرده اید؟ کلیک کنید.
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
LoginPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
export default LoginPage;
