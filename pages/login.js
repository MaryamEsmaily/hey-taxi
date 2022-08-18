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
import { useRouter } from "next/router";
import { usePostAuthLogin } from "hook/api/useApiAuth";
import { useUser } from "hook/useUser";
import { useTripRequestsCtx } from "hook/useSocket";
//
const initialValues = {
  phoneNo: "",
  password: "",
};
//
function LoginPage() {
  //
  const toast = useToast();
  const { push } = useRouter();
  const { startConnection } = useTripRequestsCtx();
  //
  const postAuthLogin = usePostAuthLogin();
  const { setUser } = useUser();

  const handleSubmit = (values) => {
    postAuthLogin.mutate(values, {
      onSuccess: (res) => {
        setUser({
          username: res?.value.user.username,
          id: res?.value.passOrDriverId,
          role: res?.value.user.role,
          phoneNo: res?.value.user.phoneNo,
          gender: res?.value.user.gender,
        });
        toast.success({ res });
        push("/app/dashboard");
        startConnection();
      },
      onError: (err) => {
        toast.error({ err });
      },
    });
  };
  //
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: loginSchema,
  });
  //
  return (
    <Box borderRadius="8px" width="100%" maxWidth={1000} overflow="hidden">
      <Grid container height="504px">
        <Grid item xs={6}>
          <AuthPlacard />
        </Grid>
        <Grid item xs={6}>
          <Box
            backgroundColor="#ffc73f"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: " center",
            }}
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
                ورود
              </Typography>
              <Typography fontSize="12px" fontWeight="bold" color="gray" mb={2}>
                برای استفاده از امکانات سامانه وارد شوید
              </Typography>
              <TextField
                label="شماره تماس"
                {...formik.getFieldProps("phoneNo")}
                {...getValidationFieldProps(formik, "phoneNo")}
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
