import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  Box,
  Avatar,
  Paper,
  Toolbar,
} from "@mui/material";
import {
  StyledHeaderTableCell,
  StyledTableBodyCell,
  StyledTableBodyRow,
} from "../../../common/UI/Table/Config";
import { Image } from "@mui/icons-material";
import { convertToCurrency } from "../../../../utils/formatting";
import { NoDataComponent } from "../../../misc/DataNotFound.component";
import TypographyComponent from "../../../common/UI/Typography";

const ProductVariantComponent = ({ variations = [] }) => {
  const headCells = [
    { id: "image", label: "Image" },
    { id: "variant", label: "Variant" },
    { id: "price", label: "Price" },
    { id: "comparePrice", label: "Compare-at Price" },
    { id: "quantity", label: "Quantity" },
    { id: "sku", label: "SKU" },
  ];

  return (
    <Box
      width={"100%"}
      component={Paper}
      style={{
        borderRadius: "20px",
        padding: "1rem",
        border: "1px solid grey",
      }}
    >
      <Toolbar
        sx={{
          flexWrap: { xs: "wrap", md: "nowrap" },
          justifyContent: "space-between",
        }}
        variant="dense"
      >
        <TypographyComponent
          sx={{ fontWeight: "bold" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Product Variant List
        </TypographyComponent>
      </Toolbar>
      <TableContainer>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              {headCells.map((headCell, index) => (
                <StyledHeaderTableCell key={index}>
                  {headCell.label}
                </StyledHeaderTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {variations.length > 0 ? (
              variations.map((variation, index) => {
                return (
                  <StyledTableBodyRow key={index} hover>
                    <StyledTableBodyCell>
                      {variation.image ? (
                        <Avatar variant="square" src={variation.image} />
                      ) : (
                        <Image
                          style={{ width: 40, height: 40 }}
                          color="action"
                        />
                      )}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {variation.variants.length > 0 &&
                        variation.variants
                          .map((variant) => variant.value)
                          .join(" / ")}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {convertToCurrency(variation.price)}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {convertToCurrency(variation.comparePrice)}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {variation.quantity}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>{variation.sku}</StyledTableBodyCell>
                  </StyledTableBodyRow>
                );
              })
            ) : (
              <StyledTableBodyRow>
                <StyledTableBodyCell colSpan={headCells.length}>
                  <NoDataComponent />
                </StyledTableBodyCell>
              </StyledTableBodyRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductVariantComponent;
