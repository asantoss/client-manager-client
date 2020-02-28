import * as React from 'react';
import { useEffect } from 'react';
import Layout from './components/Layouts/Layout';
import { Route, Switch } from 'react-router-dom';
import SignUp from './components/authentication/SignUp';
import Clients from './components/Clients';
import SignIn from './components/authentication/SignIn';
import { ApolloProvider } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import InvoiceCreator from './pages/InvoiceCreator';
import TopBar from './components/Layouts/TopBar';

import theme from './styles/theme';
import { GlobalStyle } from './styles';
import { client } from './cache';
import Dashboard from './pages/Dashboard';

interface user {
	isLoggedIn: Boolean;
	email: String;
	firstName: String;
	lastName: String;
	id: Number;
}

function App() {
	const user: user = useSelector((state: any) => state.user);
	const history = useHistory();
	useEffect(() => {
		if (!user.isLoggedIn) {
			history.push('/login');
		}
	}, [user.isLoggedIn, history]);
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<ApolloProvider client={client}>
				<TopBar />
				<Switch>
					<Route
						exact
						path='/'
						render={() => {
							return (
								<Layout>
									<Clients />
								</Layout>
							);
						}}
					/>
					<Route
						exact
						path='/invoice/:type'
						render={() => {
							return (
								<Layout>
									<InvoiceCreator />
								</Layout>
							);
						}}
					/>
					<Route
						exact
						path='/invoices'
						render={() => {
							return (
								<Layout>
									<Dashboard />
								</Layout>
							);
						}}
					/>
					<Route exact path='/register' component={SignUp} />
					<Route
						path='/login'
						render={() => {
							return <SignIn redirect='/' />;
						}}
					/>
				</Switch>
			</ApolloProvider>
		</ThemeProvider>
	);
}

export default App;
