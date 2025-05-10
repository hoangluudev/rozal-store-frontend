import * as React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Container, FormHelperText, Stack, Typography } from "@mui/material";
import { stripHtmlTags } from "../../../../utils/formatting";

const RichTextEditorComponent = ({
  value,
  onChange,
  limit = 500,
  helperText,
}) => {
  const [editorLength, setEditorLength] = React.useState(0);
  const isOverLimit = editorLength > limit;

  const handleChange = (event, editor) => {
    const data = editor.getData();
    onChange(data);
    setEditorLength(stripHtmlTags(data).length);
  };

  return (
    <Container className="px-0">
      <CKEditor editor={ClassicEditor} data={value} onChange={handleChange} />
      <Stack
        flexDirection={"row"}
        justifyContent={!helperText ? "flex-end" : "space-between"}
      >
        {helperText ? (
          <FormHelperText error>{helperText}</FormHelperText>
        ) : (
          <></>
        )}
        <Typography
          color={isOverLimit ? "error" : "inherit"}
          component={"p"}
        >{`${editorLength}/${limit}`}</Typography>
      </Stack>
    </Container>
  );
};
export default RichTextEditorComponent;
