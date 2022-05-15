import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress, TextField } from '@mui/material';
import { Header } from '../components';
import { getUserRequest } from '../store/reducers/getUser';
import * as styles from '../styles/pages/SearchPage.module.css';

const SearchPage = () => {
	const nav = useNavigate();
	const dispatch = useDispatch();
	const [name, setName] = React.useState('');

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
			avatar_url.length > 0 &&
			loaded
		) {
			nav('/user/' + username);
		}
	}, [username, avatar_url, loaded]);

	return (
		<div>
			<Header />
			<form
				className={styles.default.form}
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit}
			>
				{loading ? <CircularProgress /> : <></>}
				<TextField
					size='small'
					style={{ marginRight: 50 }}
					id='standard-basic'
					label='GitHub User'
					onChange={(e) => setName(e.target.value)}
					helperText={error}
					error={error !== undefined && error.length > 0}
				/>
				<Button variant='contained' size='medium' type='submit'>
					SUBMIT
				</Button>
			</form>
		</div>
	);
};

export default SearchPage;
