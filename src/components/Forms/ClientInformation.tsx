import * as React from 'react';
import { useFormik } from 'formik';
// import { useMutation } from '@apollo/react-hooks';
import * as Yup from 'yup';
import {
	TextField,
	Button,
	CircularProgress,
	Typography
} from '@material-ui/core';
import { css } from '@emotion/core';
import { ClientInformationForm } from '../../styles/Clients';
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
}

const ClientInformation: React.FC<ClientInformationProps> = ({
	setClientOpen,
	isClientOpen
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
		dispatch({ type: 'SET_CLIENT', payload: values });
		setTimeout(() => setClientOpen(!isClientOpen), 5000);
	};
	if (loading)
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
	return (
		<ClientInformationForm onSubmit={formik.handleSubmit}>
			<TextField
				className='client_input'
				name='firstName'
				label='First Name'
				variant='outlined'
				onChange={formik.handleChange}
				onBlur={formik.handleChange}
				value={formik.values.firstName}
			/>
			<TextField
				className='client_input'
				name='firstName'
				label='First Name'
				variant='outlined'
				onChange={formik.handleChange}
				onBlur={formik.handleChange}
				value={formik.values.firstName}
			/>
			<Button
				style={{
					color: 'white',
					width: '50px',
					alignSelf: 'center'
				}}
				variant='contained'
				color='primary'
				type='submit'>
				Save
			</Button>
		</ClientInformationForm>
	);
};

export default ClientInformation;
