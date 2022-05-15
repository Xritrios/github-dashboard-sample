import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, CircularProgress, Paper, Typography } from '@mui/material';
import { initUserRequest } from '../store/reducers/getUser';
import { getReposOfUserRequest } from '../store/reducers/getReposOfUser';
import { Header } from '../components';
import * as styles from '../styles/pages/UserPage.module.css';

const UserPage = () => {
	const nav = useNavigate();
	const dispatch = useDispatch();
	const [name] = React.useState(window.location.pathname.split('/')[2]);

	const { username, avatar_url, repos, loading, loaded, error } = useSelector(
		(state) => state.getReposOfUser
	);

	React.useEffect(() => {
		dispatch(getReposOfUserRequest(name));
	}, []);

	const handleClick = (repo) => {
		nav('repo/' + repo);
	};

	const goBack = () => {
		dispatch(initUserRequest());
		nav('/');
	};

	return (
		<div>
			<Header />
			{loading ? (
				<div className={styles.default.container}>
					<CircularProgress />
				</div>
			) : (
				<div className={styles.default.container}>
					<Typography variant='h6'>Repositories of</Typography>
					<Paper className={styles.default.userContainer} elevation={3}>
						<Avatar
							alt={username + ' avatar'}
							src={avatar_url}
							sx={{ width: 24, height: 24 }}
						/>
						<Typography style={{ marginLeft: 5 }}>{username}</Typography>
					</Paper>
					<Paper className={styles.default.reposContainer} elevation={2}>
						{repos.map((repo) => {
							return (
								<Paper
									className={styles.default.repo}
									elevation={1}
									onClick={() => handleClick(repo)}
								>
									<Typography>{repo}</Typography>
								</Paper>
							);
						})}
					</Paper>
					<Typography style={{ cursor: 'pointer' }} onClick={goBack}>
						Go back
					</Typography>
				</div>
			)}
		</div>
	);
};

export default UserPage;
