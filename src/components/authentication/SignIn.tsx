import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
	TextField,
	InputLabel,
	Typography,
	IconButton,
	InputAdornment
} from '@material-ui/core';

import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useLazyQuery } from '@apollo/react-hooks';
import { LOGIN } from '../../apollo/constants';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SignInForm, Button } from '../../styles';

export default function SignIn() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [isPasswordShown, setPassShowed] = useState(false);
	const [handleLogin] = useLazyQuery(LOGIN, {
		onCompleted: data => {
			if (data.login) {
				dispatch({
					type: 'LOGIN',
					payload: { ...data.login }
				});
				history.push('/invoice/creator');
			}
		}
	});
	const formik = useFormik({
		initialValues: {
			password: '',
			email: ''
		},
		onSubmit: values => {
			handleLogin({ variables: { ...values } });
		}
	});
	const handleShowPassword = () => {
		setPassShowed(!isPasswordShown);
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};
	return (
		<SignInForm onSubmit={formik.handleSubmit}>
			<Typography variant='h2'>Sign In</Typography>
			<InputLabel />
			<TextField
				variant='outlined'
				type='email'
				name='email'
				label='Email'
				onChange={formik.handleChange}
				value={formik.values.email}
			/>
			<TextField
				variant='outlined'
				type={
					isPasswordShown
						? 'text'
						: 'password'
				}
				name='password'
				label='Password'
				onChange={formik.handleChange}
				value={formik.values.password}
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={
									handleShowPassword
								}
								onMouseDown={
									handleMouseDownPassword
								}>
								{isPasswordShown ? (
									<Visibility />
								) : (
									<VisibilityOff />
								)}
							</IconButton>
						</InputAdornment>
					)
				}}
			/>
			<Link to='/register'>Don't have an account?</Link>
			<Button type='submit' variant='success'>
				Submit
			</Button>
		</SignInForm>
	);
}
