import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack spacing={10} alignItems="center" mt={5}>
        <Box>
          <Typography fontSize="58px" fontWeight="bold" color="#ffc73f">
            هی تاکسی
          </Typography>
          <Typography fontSize="30px" fontWeight="bold" color="#ffc73f">
            سرویس آنلاین مسافربری اقتصادی
          </Typography>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          fontSize="20px"
          fontWeight="bold"
          spacing={10}
        >
          <Typography fontSize="30px" color="#727272">
            راحت سفر کنید
          </Typography>
          <Button onClick={() => push("/login")} borderRadius="lg" px={8}>
            ورود
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
