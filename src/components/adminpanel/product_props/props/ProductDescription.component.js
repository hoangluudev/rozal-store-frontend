import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Container, Typography } from "@mui/material";

const stripHtmlTags = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

export const ProductFormDescription = ({ editorData, onChange }) => {
  const [editorLength, setEditorLength] = useState(0);

  const isOverLimit = editorLength > 1000 ? true : false;

  const handleChange = (event, editor) => {
    const data = editor.getData();
    onChange(data);
    setEditorLength(stripHtmlTags(data).length);
  };

  return (
    <Container className="px-0">
      <Typography>Description</Typography>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={handleChange}
      />
      <Typography
        color={isOverLimit ? "error" : "inherit"}
        align="right"
        component={"p"}
      >{`${editorLength}/1000`}</Typography>
    </Container>
  );
};
