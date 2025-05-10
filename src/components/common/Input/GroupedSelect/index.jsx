import React from "react";
import {
  MenuItem,
  Select,
  ListSubheader,
  FormHelperText,
  styled,
  lighten,
  darken,
} from "@mui/material";

const GroupHeader = styled(ListSubheader)(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  lineHeight: "inherit",
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupedSelectComponent = ({
  value,
  onChange,
  options = [],
  optionValueProps = "value",
  helpertext,
  ...props
}) => {
  const handleOnChange = (value) => {
    onChange(value);
  };

  const groupedOptions = options.reduce((acc, option) => {
    const group = acc.find((g) => g.parent === option.parent);
    if (group) {
      group.options.push(option);
    } else {
      acc.push({ parent: option.parent, options: [option] });
    }
    return acc;
  }, []);

  return (
    <React.Fragment>
      <Select
        value={value}
        onChange={(e) => handleOnChange(e.target.value)}
        defaultValue={""}
        {...props}
      >
        {options.length > 0 ? (
          groupedOptions.flatMap((group, index) => [
            <GroupHeader key={`header-${index}`}>{group.parent}</GroupHeader>,
            ...group.options.map((item) => (
              <MenuItem
                key={item[optionValueProps]}
                value={item[optionValueProps]}
              >
                {item.label}
              </MenuItem>
            )),
          ])
        ) : (
          <MenuItem value="" disabled>
            <em>None</em>
          </MenuItem>
        )}
      </Select>
      {helpertext && <FormHelperText error>{helpertext}</FormHelperText>}
    </React.Fragment>
  );
};
export default GroupedSelectComponent;
