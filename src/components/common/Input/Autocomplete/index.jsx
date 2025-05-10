import { Autocomplete, TextField } from "@mui/material";

const AutocompleteComponent = ({ options = [], ...props }) => {
  return (
    <Autocomplete
      fullWidth
      freeSolo
      options={options}
      renderInput={(params) => <TextField {...params} {...props.inputprops} />}
      {...props}
    />
  );
};
export default AutocompleteComponent;
