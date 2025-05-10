import * as React from "react";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { EditUserInfoModal } from "./modal/edituserinfo.component";
import { formatDate, formatDatetime } from "../../utils/formatting";
import { useCurrentUserApi } from "../../hooks/api";

export const UserAccount = () => {
  const { updateUserInfo, fetchUserByAccessToken } = useCurrentUserApi();
  const { currentUserData, updateUserInfoPending } = useCurrentUserApi().state;

  const UserInfo = currentUserData || {};
  const [userForm, setUserForm] = React.useState({});

  React.useEffect(() => {
    if (updateUserInfoPending) {
      fetchUserByAccessToken();
    }
  }, [fetchUserByAccessToken, updateUserInfoPending]);

  const onUpdateFormChange = (data) => {
    setUserForm(data);
  };

  const handleSubmitForm = () => {
    updateUserInfo(userForm);
  };

  return (
    <Box>
      <Typography className="fw-bold" variant="h6" component="h6">
        Overview
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {[
          { label: "Username", value: UserInfo.username },
          { label: "Full Name", value: UserInfo.fullName },
          { label: "Email", value: UserInfo.email },
          { label: "Phone Number", value: UserInfo.phone || "None" },
          { label: "Gender", value: UserInfo.gender },
          {
            label: "Birth Date",
            value: formatDate(UserInfo.birthDate) || "None",
          },
          {
            label: "Join Date",
            value: formatDatetime(UserInfo.createdAt || ""),
          },
        ].map(({ label, value }, index) => (
          <Grid key={index} item xs={12} sm={6} lg={4}>
            <Stack>
              <Typography className="text-start" variant="body1" component="h6">
                {label}
              </Typography>
              <Typography className={`fw-bold text-start`}>{value}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6} lg={4}>
          <EditUserInfoModal
            userData={UserInfo}
            onChange={onUpdateFormChange}
            onClickSubmit={handleSubmitForm}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
