import * as React from 'react';
// import { useEffect } from 'react';
import Layout from './components/Layouts/Layout';
import { Route, Switch } from 'react-router-dom';
import SignUp from './components/authentication/SignUp';
import Clients from './components/Client/Clients';
import SignIn from './components/authentication/SignIn';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import InvoiceCreator from './pages/InvoiceCreator/InvoiceCreator';
import TopBar from './components/Layouts/Navbar/TopBar';
import theme from './styles/theme';
import { GlobalStyle } from './styles';
import { client } from './cache';
import InvoicesPage from './pages/Invoices';
import { HomePage } from './pages/Home';

interface user {
	isLoggedIn: Boolean;
	email: String;
	firstName: String;
	lastName: String;
	id: Number;
}

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<ApolloProvider client={client}>
				<TopBar />
				<Switch>
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
						path='/'
						render={() => {
							return (
								<Layout>
									<HomePage />
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
									<InvoicesPage />
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
