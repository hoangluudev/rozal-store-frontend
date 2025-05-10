import React from "react";
import {
  Box,
  Checkbox,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import CartItemTableBody from "./components/CartItemTableBody";

const CartItemTable = ({
  cartData = [],
  totalItemCount,
  selectedCount,
  productDetailUrl,
  onQuantityChange,
  onSelectChange,
  onSelectAll,
  onDelete,
  pending = false,
}) => {
  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={
                    totalItemCount > 0 && selectedCount === totalItemCount
                  }
                  indeterminate={
                    selectedCount > 0 && selectedCount < totalItemCount
                  }
                  onChange={onSelectAll}
                  disabled={pending}
                />
              </TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <CartItemTableBody
            cartData={cartData}
            productDetailUrl={productDetailUrl}
            onQuantityChange={onQuantityChange}
            onSelectChange={onSelectChange}
            onDelete={onDelete}
            pending={pending}
          />
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CartItemTable;
