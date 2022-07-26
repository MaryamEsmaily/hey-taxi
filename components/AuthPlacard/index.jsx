import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

function AuthPlacard() {
  return (
    <Box textAlign="center" pt={10} backgroundColor="white">
      <Typography fontSize="26px" fontWeight="bold" mb={1} color="#ffc73f">
        هی تاکسی!
      </Typography>
      <Typography fontSize="14px" fontWeight="bold">
        صرفه جویی در وقت و هزینه را با ما تجربه کنید
      </Typography>
      <Image
        src="/img/manWithTaxi.jpg"
        layout="fixed"
        width="450px"
        height="350px"
        alt=""
      />
    </Box>
  );
}

export default AuthPlacard;
