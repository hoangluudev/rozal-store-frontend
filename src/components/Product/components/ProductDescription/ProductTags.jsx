import React from "react";
import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";

const ProductTags = ({ product, linkTo = "#" }) => {
  return (
    <div>
      {product?.tags && product.tags.length > 0 ? (
        product.tags.map((tag, index) => (
          <Chip
            key={index}
            label={"#" + tag}
            component={Link}
            to={linkTo + tag}
            variant="filled"
            color="default"
            style={{ marginRight: 5, marginBottom: 5 }}
            clickable
          />
        ))
      ) : (
        <>No tags.</>
      )}
    </div>
  );
};

export default ProductTags;
