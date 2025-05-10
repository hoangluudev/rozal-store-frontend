import React, { useState, useCallback, useEffect } from "react";
import { TextField, Box, Typography, Stack } from "@mui/material";

const NoteToSeller = ({ value = "", onChange }) => {
  const [note, setNote] = useState(value);
  const characterLimit = 100;
  const currentLength = note.length;

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onChange(note);
    }, 300);
    return () => clearTimeout(debounceTimeout);
  }, [note, onChange]);

  const handleOnChange = useCallback((e) => {
    setNote(e.target.value);
  }, []);

  return (
    <Box width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Stack flexDirection="row" columnGap={1}>
          <Typography
            fontWeight={600}
            sx={{
              fontSize: { xs: "1rem", lg: "1.2rem" },
            }}
          >
            Add Note
          </Typography>
          <Typography color="text.secondary">(optional)</Typography>
        </Stack>

        <Typography
          variant="body2"
          color={currentLength > characterLimit ? "error" : "text.secondary"}
        >
          {`${currentLength}/${characterLimit}`}
        </Typography>
      </Box>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        placeholder="Type a message..."
        value={note}
        onChange={handleOnChange}
        inputProps={{ maxLength: characterLimit }}
      />
    </Box>
  );
};

export default NoteToSeller;
