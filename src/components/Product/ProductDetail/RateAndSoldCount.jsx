import React from "react";
import {
  Grid,
  Typography,
  Rating,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DividerComponent } from "../../common/UI";
import { Star } from "@mui/icons-material";
import {
  formatRateScore,
  numberShorteningFormat,
} from "../../../utils/formatting";

const ProductRateAndSoldInfo = ({
  rateScore = 0,
  rateCount = 0,
  soldCount = 0,
}) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up("sm"));

  if (!isTablet) {
    return (
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        columnGap={1}
        py={1}
      >
        {rateCount > 0 ? (
          <>
            <Grid item xs="auto">
              <Stack flexDirection="row" alignItems="center">
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="#ff9100"
                  sx={{ borderBottom: "1px solid #ff9100" }}
                >
                  {formatRateScore(rateScore)}
                </Typography>
                <Star fontSize="small" sx={{ color: "#ff9100" }} />
                <Typography fontSize="14px" color="text.secondary">
                  ({numberShorteningFormat(rateCount)})
                </Typography>
              </Stack>
            </Grid>
          </>
        ) : (
          <Grid item xs="auto">
            <Typography color="text.secondary" fontSize="14px">
              No Ratings Yet
            </Typography>
          </Grid>
        )}
        <Grid item xs="auto">
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <Typography fontSize="15px" fontWeight={500}>
              {numberShorteningFormat(soldCount)}
            </Typography>
            <Typography color="text.secondary" fontSize="14px">
              Sold
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container alignItems="center" columnGap={2} py={1}>
      {rateCount > 0 ? (
        <>
          <Grid item xs="auto">
            <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
              <Typography
                fontSize="15px"
                fontWeight={700}
                color="#ff9100"
                sx={{ borderBottom: "1px solid #ff9100" }}
              >
                {formatRateScore(rateScore)}
              </Typography>
              <Rating
                name="read-only"
                value={rateScore}
                precision={0.5}
                readOnly
                icon={<Star fontSize="small" />}
                emptyIcon={<Star fontSize="small" />}
                sx={{ color: "#ff9100" }}
              />
            </Stack>
          </Grid>
          <DividerComponent orientation="vertical" isVertical flexItem />
          <Grid item xs="auto">
            <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
              <Typography
                fontSize="15px"
                fontWeight={500}
                sx={{ borderBottom: "1px solid black" }}
              >
                {numberShorteningFormat(rateCount)}
              </Typography>
              <Typography color="text.secondary" fontSize="14px">
                Ratings
              </Typography>
            </Stack>
          </Grid>
        </>
      ) : (
        <Grid item xs="auto">
          <Typography color="text.secondary" fontSize="14px">
            No Ratings Yet
          </Typography>
        </Grid>
      )}
      <DividerComponent orientation="vertical" isVertical flexItem />
      <Grid item xs="auto">
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Typography fontSize="15px" fontWeight={500}>
            {numberShorteningFormat(soldCount)}
          </Typography>
          <Typography color="text.secondary" fontSize="14px">
            Sold
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProductRateAndSoldInfo;
