const getValidationFieldProps = (formik, name) => {
  const error = formik.errors?.[name];
  const isTouched = formik.touched?.[name];
  return {
    isInvalid: error && isTouched,
  };
};

export default getValidationFieldProps;
