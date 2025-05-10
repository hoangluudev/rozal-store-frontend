import React from "react";

const ProductDescription = ({ product }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: product?.description || "No description.",
      }}
    />
  );
};

export default ProductDescription;
