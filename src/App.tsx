import * as React from 'react';
import { useEffect } from 'react';
import Layout from './components/Layouts/Layout';
import { Route, Switch } from 'react-router-dom';
import SignUp from './components/authentication/SignUp';
import Clients from './components/Clients';
import SignIn from './components/authentication/SignIn';
import { ApolloProvider } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import InvoiceCreator from './pages/InvoiceCreator';
import TopBar from './components/Layouts/TopBar';
import { animated, useTransition } from 'react-spring';
import theme from './styles/theme';
import { GlobalStyle } from './styles';
import { client } from './cache';

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
	const location = useLocation();
	const transitions = useTransition(location, location => location.pathname, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { display: 'none' }
	});

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
				{transitions.map(({ item, props, key }) => {
					return (
						<animated.div key={key} style={props}>
							<Switch location={item}>
								<Route
									exact
									path='/clients'
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
									path='/invoice/creator'
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
												<InvoiceCreator />
											</Layout>
										);
									}}
								/>
								<Route exact path='/register' component={SignUp} />
								<Route
									path='/login'
									render={() => {
										return <SignIn redirect='/clients' />;
									}}
								/>
							</Switch>
						</animated.div>
					);
				})}
			</ApolloProvider>
		</ThemeProvider>
	);
}

export default App;
