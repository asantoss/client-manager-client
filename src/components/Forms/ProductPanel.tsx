import * as React from 'react';
import { useFormik } from 'formik';
import { Input, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useSpring } from 'react-spring';
import { Button, ProductPanelStyled, MainActions } from '../../styles';
import { Product } from '../../types/Invoice';
import { ProductForm } from '../../styles/ProductPanel';

interface ProductPanelProps {
	setProductOpen: Function;
	style?: Object;
	submit?: Function;
}

const ProductPanel: React.FC<ProductPanelProps> = ({
	setProductOpen,
	style
}) => {
	const spring = useSpring({
		from: { display: 'none', opacity: 0 },
		to: { display: 'flex', opacity: 1 }
	});
	const [localProducts, setlocalProducts] = React.useState<Product[]>(
		[]
	);
	const dispatch = useDispatch();
	const [isFlat, setIsflat] = React.useState(true);
	const formik = useFormik({
		initialValues: {
			productName: '',
			description: '',
			price: 0,
			quantity: 1
		},
		onSubmit: (product: Product) => {
			const quantity =
				product.quantity > 1
					? product.quantity
					: 1;
			dispatch({
				type: 'ADD_PRODUCT',
				payload: { ...product, quantity }
			});
			saveProductToLocalStorage(product);
			formik.resetForm();
		}
	});

	const localStorageProducts = localStorage.getItem('products');
	React.useEffect(() => {
		//@ts-ignore
		if (localStorageProducts) {
			//@ts-ignore
			setlocalProducts((s: any) => [
				...JSON.parse(localStorageProducts)
			]);
		}
		return () => {};
	}, [localStorageProducts]);
	const loadProduct = (product: Product): void => {
		setIsflat(product.quantity > 1 ? false : true);
		formik.setValues(
			{
				...product
			},
			true
		);
	};
	const handleClearLocalStorage = () => {
		setlocalProducts([]);
		localStorage.removeItem('products');
	};
	return (
		<ProductPanelStyled style={style} className='invoice-panel'>
			<MainActions
				pageName='Products'
				closeFunction={() =>
					setProductOpen(false)
				}
			/>
			<ProductForm onSubmit={formik.handleSubmit}>
				<label htmlFor='productName'>
					Name
				</label>
				<Input
					name='productName'
					type='text'
					placeholder='Name'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={
						formik.values
							.productName
					}
					required
				/>
				<label htmlFor=''>Description</label>
				<Input
					name='description'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={
						formik.values
							.description
					}
					placeholder='Optional'
				/>
				<div className='product-type'>
					<p
						onClick={() => {
							if (
								!isFlat
							) {
								setIsflat(
									true
								);
							}
						}}
						className={
							isFlat
								? 'active'
								: ''
						}>
						Flat Rate
					</p>
					<p
						className={
							!isFlat
								? 'active'
								: ''
						}
						onClick={() => {
							if (
								isFlat
							) {
								setIsflat(
									false
								);
							}
						}}>
						Quantity
					</p>
				</div>
				{isFlat ? (
					<div
						style={spring}
						className='product-type'>
						<label htmlFor=''>
							Price:{' '}
						</label>
						<Input
							name='price'
							type='number'
							onBlur={
								formik.handleBlur
							}
							onChange={
								formik.handleChange
							}
							value={
								formik
									.values
									.price
							}
							required
						/>
					</div>
				) : (
					<div
						className='product-type qty'
						style={spring}>
						<div>
							<label htmlFor=''>
								Qty.
							</label>
							<Input
								name='quantity'
								onBlur={
									formik.handleBlur
								}
								onChange={
									formik.handleChange
								}
								value={
									formik
										.values
										.quantity
								}
								required
							/>
						</div>
						<p>X</p>
						<div>
							<label htmlFor=''>
								Price:{' '}
							</label>
							<Input
								type='number'
								name='price'
								onBlur={
									formik.handleBlur
								}
								onChange={
									formik.handleChange
								}
								value={
									formik
										.values
										.price
								}
								required
							/>
						</div>
					</div>
				)}
				<hr />
				<div className='recently-used'>
					{' '}
					<p>Recently Used</p>
					<IconButton
						onClick={
							handleClearLocalStorage
						}>
						<Close />
					</IconButton>
				</div>
				{localProducts.length > 0 &&
					localProducts.map(
						(
							product: Product,
							index: number
						) => {
							return (
								<div
									key={
										index
									}
									className='product'
									onClick={() =>
										loadProduct(
											product
										)
									}>
									<p>
										<span>
											Name:{' '}
										</span>
										{
											product.productName
										}
									</p>
									{product.quantity >
										0 && (
										<p>
											<span>
												Qty.
											</span>
											{
												product.quantity
											}
										</p>
									)}
									<p>
										<span>
											Price
										</span>
										{
											product.price
										}
									</p>{' '}
								</div>
							);
						}
					)}
				<Button
					type='submit'
					variant='success'
					align='center'>
					Save
				</Button>
			</ProductForm>
		</ProductPanelStyled>
	);
};

export default ProductPanel;

function saveProductToLocalStorage(product: Product): void {
	const localStorageProducts = localStorage.getItem('products');
	const localStorageProductsParsed: Product[] =
		JSON.parse(localStorageProducts) || [];
	const filteredProducts = localStorageProductsParsed.filter(
		(item: Product, index: number) => {
			if (
				item.productName ===
					product.productName &&
				item.price === product.price &&
				item.quantity === product.quantity
			) {
				return true;
			}
			return false;
		}
	);
	if (filteredProducts.length > 0) {
		return;
	} else {
		return localStorage.setItem(
			'products',
			JSON.stringify([
				...localStorageProductsParsed,
				product
			])
		);
	}
}
