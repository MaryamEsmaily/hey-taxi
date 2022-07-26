import { useSnackbar } from "notistack";

function useToast() {
  const enqueueSnackbar = useSnackbar();
  //
  const toast = {
    success: ({ res, message }) => {
      enqueueSnackbar((message || res?.message) ?? "با موفقیت انجام شد.", {
        variant: "success",
      });
    },
    error: ({ err, message }) => {
      enqueueSnackbar(
        (message || err?.response?.data?.message) ?? "خطایی رخ داده است.",
        {
          variant: "error",
        }
      );
    },
  };
  //
  return toast;
}

export default useToast;
