import * as React from 'react';
import { HomeStyled } from '.';
import { Button } from '../../styles';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
	return (
		<HomeStyled>
			<h1>Welcome to Client Manager!</h1>
			<p>
				Client Manager is a simple application to help your create professional
				looking invoices on the go!
			</p>
			<p>
				With our all in one platform you can create beautiful PDF invoices to
				send to your clients right from your browser. If you decide not to
				register with our system no problem! We will save your invoices to your
				local storage, but beware you will have to make sure they are not
				deleted. However if you register today you will be able to save all of
				your invoices to our cloud database.
			</p>
			<Link to='/invoice/creator'>
				<Button>Start</Button>
			</Link>
		</HomeStyled>
	);
};

export default HomePage;
