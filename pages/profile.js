import {
  Box,
  Divider,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import StayCurrentPortraitTwoToneIcon from "@mui/icons-material/StayCurrentPortraitTwoTone";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { useUser, useUserState } from "hook/useUser";
//

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "#000",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

function Profile() {
  const user = useUserState();
  const { back } = useRouter();

  const { logout } = useUser();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        width="100%"
        bgcolor="#ffc73f"
        maxWidth={600}
        borderRadius={3}
        overflow="hidden"
      >
        <Box
          p={5}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton onClick={() => back()}>
              <ArrowForwardIosIcon sx={{ color: "white" }} variant="h6" />
            </IconButton>
            <Typography color="white" fontWeight="bold">
              پروفایل
            </Typography>
          </Box>
          <LightTooltip title="خروج">
            <IconButton onClick={logout}>
              <LogoutIcon sx={{ color: "white" }} />
            </IconButton>
          </LightTooltip>
        </Box>
        <Box p={5} pt={2} sx={{ display: "flex", alignItems: "center" }}>
          <AccountCircleIcon sx={{ color: "white", fontSize: 100 }} />
          <Typography variant="h5" ml={2} color="white">
            {user?.username}
          </Typography>
        </Box>
        <Stack
          spacing={2}
          p={7}
          borderRadius="70px 70px 0  0"
          bgcolor="white"
          divider={<Divider />}
        >
          <Stack direction="row" alignItems="center">
            <Stack direction="row" sx={{ width: "200px" }} spacing={1}>
              <AccountCircleTwoToneIcon color="warning" />
              <Typography>نام و نام خانوادگی:</Typography>
            </Stack>
            <Typography>{user?.username}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Stack direction="row" sx={{ width: "200px" }} spacing={1}>
              <StayCurrentPortraitTwoToneIcon color="warning" />
              <Typography>شماره موبایل:</Typography>
            </Stack>
            <Typography> {user?.phoneNo}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Stack direction="row" sx={{ width: "200px" }} spacing={1}>
              <FaceTwoToneIcon color="warning" />
              <Typography>جنسیت:</Typography>
            </Stack>
            <Typography>
              {user?.gender === 1 ? "مرد" : user?.gender === 2 ? "زن" : "سایر"}
            </Typography>
          </Stack>
          {user?.role === 2 ? (
            <Stack direction="row" alignItems="center">
              <Stack direction="row" sx={{ width: "200px" }} spacing={1}>
                <LocalTaxiIcon color="warning" />
                <Typography>نوع اتومبیل:</Typography>
              </Stack>
              <Typography>{user?.car}</Typography>
            </Stack>
          ) : null}
          {user?.role === 2 ? (
            <Stack direction="row" alignItems="center">
              <Stack direction="row" sx={{ width: "200px" }} spacing={1}>
                <LocalTaxiIcon color="warning" />
                <Typography>پلاک اتومبیل:</Typography>
              </Stack>
              <Typography>{user?.carId}</Typography>
            </Stack>
          ) : null}
        </Stack>
      </Box>
    </Box>
  );
}

export default Profile;
