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
import useToast from "hook/useToast";
import { useFormik } from "formik";
import registerSchema from "schema/registerSchema";
import RegisterPlacard from "components/RegisterPlacard";
import { useRouter } from "next/router";
import { usePostAuthRegister } from "hook/api/useApiAuth";

//
const initialValues = {
  username: "",
  phoneNo: "",
  password: "",
  gender: 0,
  role: 0,
  car: "",
  carId: "",
};
//
function RegisterPage() {
  const toast = useToast();
  //
  const { push } = useRouter();
  //
  const postAuthRegister = usePostAuthRegister();
  const handleSubmit = (values) => {
    postAuthRegister.mutate(values, {
      onSuccess: (res) => {
        toast.success({ res });
        push("/login");
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
    // validationSchema: registerSchema,
  });

  return (
    <Box borderRadius="20px" width="100%" maxWidth={470} overflow="hidden">
      <Box
        py={3}
        backgroundColor="#ffc73f"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: " center",
        }}
        height="100%"
      >
        <Box
          borderRadius="10px"
          backgroundColor="white"
          mx={4}
          p={4}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Typography fontSize="18px" fontWeight="bold">
            ثبت نام
          </Typography>
          <Typography fontSize="12px" fontWeight="bold" color="gray" mb={1}>
            مشخصات خود را وارد کنید
          </Typography>
          <TextField
            label="نام کاربری"
            {...formik.getFieldProps("username")}
            {...getValidationFieldProps(formik, "username")}
          />
          <TextField
            label="شماره موبایل"
            {...formik.getFieldProps("phoneNo")}
            {...getValidationFieldProps(formik, "phoneNo")}
          />
          <PasswordInput
            label="رمز عبور"
            {...formik.getFieldProps("password")}
            {...getValidationFieldProps(formik, "password")}
          />
          <PasswordInput
            label="تکرار رمز عبور"
            {...formik.getFieldProps("rePassword")}
            {...getValidationFieldProps(formik, "rePassword")}
          />
          <FormControl size="small">
            <InputLabel>نقش کاربر</InputLabel>
            <Select label="نقش کاربر" {...formik.getFieldProps("role")}>
              <MenuItem value={1}>مسافر</MenuItem>
              <MenuItem value={2}>راننده</MenuItem>
            </Select>
          </FormControl>
          {formik.values.role === 2 ? (
            <>
              <TextField
                label="مدل اتومبیل"
                {...formik.getFieldProps("car")}
                {...getValidationFieldProps(formik, "car")}
              />
              <TextField
                label="پلاک اتومبیل"
                {...formik.getFieldProps("carId")}
                {...getValidationFieldProps(formik, "carId")}
              />
            </>
          ) : null}
          <FormControl>
            <FormLabel sx={{ display: "unset" }}>جنسیت</FormLabel>
            <RadioGroup row {...formik.getFieldProps("gender")}>
              <FormControlLabel
                value="2"
                control={<Radio size="small" color="warning" />}
                label="زن"
              />
              <FormControlLabel
                value="1"
                control={<Radio size="small" color="warning" />}
                label="مرد"
              />
              <FormControlLabel
                value="3"
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
    </Box>
  );
}

RegisterPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default RegisterPage;
