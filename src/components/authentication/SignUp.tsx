import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
	TextField,
	InputLabel,
	InputAdornment,
	IconButton
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { REGISTER } from '../../apollo/constants';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '../../styles';
import { SignUpFormContainer } from '.';

const SignUpSchema = Yup.object().shape({
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
		.required('Required'),
	password: Yup.string()
		.required('No password provided.')
		.min(8, 'Password is too short - should be 8 chars minimum.')
		.matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
});

export default function SignUp() {
	const [isPasswordShown, setPassShowed] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();
	const handleShowPassword = () => {
		setPassShowed(!isPasswordShown);
	};

	const [handleRegister, { loading }] = useMutation(REGISTER);
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			phoneNumber: '',
			address: '',
			city: '',
			zipCode: '',
			companyName: ''
		},
		validationSchema: SignUpSchema,
		onSubmit: values => {
			handleRegister({
				variables: { ...values }
			}).then(() => {
				dispatch({
					type: 'LOGIN',
					payload: { ...values }
				});
				history.push('/');
			});
		}
	});
	if (loading) return <p>Loading....</p>;
	return (
		<SignUpFormContainer onSubmit={formik.handleSubmit}>
			<h1>Sign Up</h1>
			<InputLabel />
			<TextField
				name='email'
				label='Email'
				variant='outlined'
				onChange={formik.handleChange}
				value={formik.values.email}
				helperText={formik.errors.email && formik.errors.email}
				error={!!formik.errors.email}
			/>
			<TextField
				variant='outlined'
				type={isPasswordShown ? 'text' : 'password'}
				autoComplete='new-password'
				required
				name='password'
				label='Password'
				onChange={formik.handleChange}
				value={formik.values.password}
				error={!!formik.errors.password}
				helperText={formik.errors.password}
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={handleShowPassword}>
								{isPasswordShown ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					)
				}}
			/>
			<TextField
				name='firstName'
				label='First Name'
				variant='outlined'
				onChange={formik.handleChange}
				value={formik.values.firstName}
				helperText={formik.errors.firstName && formik.errors.firstName}
				error={!!formik.errors.firstName}
			/>
			<TextField
				name='lastName'
				label='Last Name'
				variant='outlined'
				onChange={formik.handleChange}
				value={formik.values.lastName}
				helperText={formik.errors.lastName && formik.errors.lastName}
				error={!!formik.errors.lastName}
			/>

			<TextField
				name='companyName'
				label='Company Name'
				variant='outlined'
				onChange={formik.handleChange}
				value={formik.values.companyName}
			/>
			<TextField
				name='phoneNumber'
				label='Phone Number'
				variant='outlined'
				onChange={formik.handleChange}
				value={formik.values.phoneNumber}
				helperText={formik.errors.phoneNumber && formik.errors.phoneNumber}
				error={!!formik.errors.phoneNumber}
			/>

			<TextField
				name='address'
				label='Address'
				variant='outlined'
				onChange={formik.handleChange}
				value={formik.values.address}
				helperText={formik.errors.address && formik.errors.address}
				error={!!formik.errors.address}
			/>
			<TextField
				name='city'
				label='City'
				variant='outlined'
				onChange={formik.handleChange}
				value={formik.values.city}
			/>
			<Button>Submit</Button>
		</SignUpFormContainer>
	);
}
