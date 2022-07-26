import * as yup from "yup";
//
const loginSchema = yup.object().shape({
  password: yup.string().required(" رمز عبور ضروری است"),
  mobileNumber: yup
    .string()
    .required("وارد کردن شماره موبایل ضروری است.")
    .matches(/^09[0-9]{9}$/g, "با فرمت درست وارد کنید"),
});

export default loginSchema;
