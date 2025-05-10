import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const formatCountdownTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const pad = (num) => String(num).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
};
const CountdownTimer = ({ initialSeconds = 0, sx }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Typography component={"span"} sx={sx}>
      {formatCountdownTime(timeLeft)}
    </Typography>
  );
};

export default CountdownTimer;
