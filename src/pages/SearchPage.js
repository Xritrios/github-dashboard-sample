import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { Header } from '../components';
import { getUserRequest } from '../store/reducers/getUser';
import * as styles from '../styles/pages/SearchPage.module.css';

const SearchPage = () => {
	const nav = useNavigate();
	const dispatch = useDispatch();
	const [name, setUsername] = React.useState('');

	const { username, avatar_url, loading, loaded, error } = useSelector(
		(state) => state.getUser
	);

	const handleSubmit = (event) => {
		event.preventDefault();

		dispatch(getUserRequest(name));
	};

	React.useEffect(() => {
		if (
			username !== undefined &&
			username.length > 0 &&
			avatar_url !== undefined &&
			avatar_url.length > 0
		) {
			nav('/user/' + username);
		}
	}, [username, avatar_url]);

	return (
		<div>
			<Header />
			<form
				className={styles.default.form}
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit}
			>
				<TextField
					className={styles.default.textfield}
					id='standard-basic'
					label='Standard'
					onChange={(e) => setUsername(e.target.value)}
				/>
				<Button variant='contained' type='submit'>
					SUBMIT
				</Button>
			</form>
		</div>
	);
};

export default SearchPage;
