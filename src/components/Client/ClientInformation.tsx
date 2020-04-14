import * as React from 'react';
import { useFormik } from 'formik';
// import { useMutation } from '@apollo/react-hooks'; ,m
import * as Yup from 'yup';
import {
	TextField,
	Button,
	CircularProgress,
	Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_CLIENT } from '../../apollo/constants';
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
	email: Yup.string().email('Invalid Email').required('Required'),
});

interface ClientInformationProps {
	setClientOpen: Function;
	isClientOpen: Boolean;
	saveToLocal: Function;
}

const ClientInformation: React.FC<ClientInformationProps> = ({
	setClientOpen,
	isClientOpen,
	saveToLocal,
}) => {
	const [loading, setLoading] = React.useState(false);
	const { isLoggedIn, id } = useSelector((state: any) => state.user);
	const [createClient] = useMutation(CREATE_CLIENT);
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
		},
		validationSchema: ClientSchema,
		onSubmit: (values) => {
			handleNext(values);
		},
	});
	const handleNext = (values: Client) => {
		if (isLoggedIn) {
			createClient({
				variables: {
					...values,
					UserId: Number(id),
				},
			}).then(({ data }) => {
				dispatch({
					type: 'SET_CLIENT',
					payload: { ...values, id: Number(data?.createClient?.id) },
				});
				setClientOpen(false);
			});
		} else {
			setLoading(!loading);
			saveToLocal({ ...values });
			dispatch({ type: 'SET_CLIENT', payload: values });
			setClientOpen(false);
		}
	};
	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
				}}>
				<Typography>Setting all of the client information...</Typography>
				<br />
				<CircularProgress color='secondary' />
			</div>
		);
	}
	return (
		<form className='client-form' onSubmit={formik.handleSubmit}>
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
			<Button
				style={{
					color: 'white',
					width: '50px',
					alignSelf: 'center',
				}}
				variant='contained'
				type='submit'>
				Save
			</Button>
		</form>
	);
};

export default ClientInformation;
