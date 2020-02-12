import React, { useState } from "react";

import {
  TextField,
  Select,
  IconButton,
  NativeSelect,
  Fab
} from "@material-ui/core";
import { css } from "@emotion/core";
import { Add } from "@material-ui/icons";
import ProductPanel from "./ProductPanel";

export default function InvoiceForm({ client }) {
  const [product, setProduct] = useState([]);
  const handleAddProduct = product => {
    setProduct(s => [...s, product]);
  };
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      `}
    >
      <ProductPanel submit={handleAddProduct} />
    </div>
  );
}
