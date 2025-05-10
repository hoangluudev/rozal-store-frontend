import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordionComponent = ({
  title = "No Title",
  secondaryTitle = "",
  children,
  defaultExpanded = false,
}) => {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${title}-content`}
        id={`${title}-header`}
      >
        <Stack flexDirection={"column"}>
          <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
          {secondaryTitle ? (
            <Typography sx={{ fontSize: "0.8rem" }}>
              {secondaryTitle}
            </Typography>
          ) : (
            <></>
          )}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionComponent;
