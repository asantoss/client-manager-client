import * as React from 'react';

import {
	TextField,
	Select,
	IconButton,
	NativeSelect,
	Fab
} from '@material-ui/core';
import { css } from '@emotion/core';
import { Product } from '../../types/Invoice.d';

export default function InvoiceForm() {
	const [product, setProduct] = React.useState<Product[]>([]);
	const handleAddProduct = (product: Product) => {
		setProduct(s => [...s, product]);
	};
	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
			`}></div>
	);
}
