import React from "react";
import ProductsStore from "../Components/Products/Products";
import styled from "styled-components";

const StyledTotalItems = styled.div`
  max-width: 1200px;

  display: block;
  margin: auto;
  gap: 10px;
`;

const Shop = () => {
  return (
    <StyledTotalItems>
      <ProductsStore />
    </StyledTotalItems>
  );
};

export default Shop;
