import * as React from 'react';
import { useFormik } from 'formik';
// import { useMutation } from '@apollo/react-hooks'; ,m
import * as Yup from 'yup';
import {
	TextField,
	Button,
	CircularProgress,
	Typography
} from '@material-ui/core';
import { css } from '@emotion/core';
import { ClientInformationForm } from '.';
import { useDispatch } from 'react-redux';
import { Client } from '../../types/Invoice';
const ClientSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too long!')
		.required('Required'),
	lastName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too long!')
		.required('Required'),
	email: Yup.string()
		.email('Invalid Email')
		.required('Required')
});

interface ClientInformationProps {
	setClientOpen: Function;
	isClientOpen: Boolean;
	saveToLocal: Function;
}

const ClientInformation: React.FC<ClientInformationProps> = ({
	setClientOpen,
	isClientOpen,
	saveToLocal
}) => {
	const [loading, setLoading] = React.useState(false);
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			address: '',
			city: '',
			zipCode: ''
		},
		validationSchema: ClientSchema,
		onSubmit: values => {
			handleNext(values);
		}
	});
	const handleNext = (values: Client) => {
		setLoading(!loading);
		saveToLocal({ ...values });
		dispatch({ type: 'SET_CLIENT', payload: values });
		setTimeout(() => setClientOpen(false), 500);
	};
	if (loading) {
		return (
			<div
				css={css`
					display: flex;
					flex-direction: column;
					align-items: center;
				`}>
				<Typography>Setting all of the client information...</Typography>
				<br />
				<CircularProgress color='secondary' />
			</div>
		);
	}
	return (
		<ClientInformationForm onSubmit={formik.handleSubmit}>
			<TextField
				className='client_input'
				name='firstName'
				label='First Name'
				style={{ flexGrow: 2 }}
				variant='outlined'
				onChange={formik.handleChange}
				onBlur={formik.handleChange}
				value={formik.values.firstName}
				required
			/>
			<TextField
				className='client_input'
				name='lastName'
				label='Last Name'
				variant='outlined'
				onChange={formik.handleChange}
				onBlur={formik.handleChange}
				value={formik.values.lastName}
				required
			/>
			<TextField
				className='client_input'
				name='email'
				label='Email'
				style={{ flexGrow: 2 }}
				variant='outlined'
				onChange={formik.handleChange}
				onBlur={formik.handleChange}
				value={formik.values.email}
				required
			/>
			<TextField
				className='client_input'
				name='phoneNumber'
				label='Phone Number'
				variant='outlined'
				onChange={formik.handleChange}
				onBlur={formik.handleChange}
				placeholder='Optional'
				value={formik.values.phoneNumber}
			/>
			<TextField
				className='client_input'
				name='address'
				label='Address'
				variant='outlined'
				style={{ flexGrow: 2 }}
				onChange={formik.handleChange}
				onBlur={formik.handleChange}
				value={formik.values.address}
				placeholder='Optional'
			/>
			<TextField
				className='client_input'
				name='city'
				label='City'
				variant='outlined'
				onChange={formik.handleChange}
				onBlur={formik.handleChange}
				value={formik.values.city}
				placeholder='Optional'
			/>
			<TextField
				className='client_input'
				name='zipCode'
				label='Zip Code'
				variant='outlined'
				onChange={formik.handleChange}
				onBlur={formik.handleChange}
				value={formik.values.zipCode}
				placeholder='Optional'
			/>
			<Button
				style={{
					color: 'white',
					width: '50px',
					alignSelf: 'center'
				}}
				variant='contained'
				type='submit'>
				Save
			</Button>
		</ClientInformationForm>
	);
};

export default ClientInformation;