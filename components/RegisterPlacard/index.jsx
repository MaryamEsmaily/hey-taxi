import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

function RegisterPlacard() {
  return (
    <Box textAlign="center" pt={10} backgroundColor="white" height="100%">
      <Typography fontSize="26px" fontWeight="bold" mb={1} color="#ffc73f">
        هی تاکسی!
      </Typography>
      <Typography fontSize="14px" fontWeight="bold" mb={12}>
        اولین تاکسی اقتصادی آنلاین در هر زمان و مکان
      </Typography>
      <Image
        src="/img/taxi.jpg"
        layout="fixed"
        width="450px"
        height="350px"
        alt=""
      />
    </Box>
  );
}

export default RegisterPlacard;
