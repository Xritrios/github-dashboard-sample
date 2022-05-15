import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CircularProgress,
	Chip,
	Collapse,
	Link,
	Rating,
	Typography,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { getRepoRequest } from '../store/reducers/getRepo';
import { Header } from '../components';
import * as styles from '../styles/pages/RepositoryPage.module.css';

const RepositoryPage = () => {
	const nav = useNavigate();
	const dispatch = useDispatch();
	const [name] = React.useState(window.location.pathname.split('/')[2]);
	const [repo] = React.useState(window.location.pathname.split('/')[4]);

	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const {
		username,
		avatar_url,
		reponame,
		language,
		stars,
		description,
		created_at,
		updated_at,
		url,
		loaded,
		loading,
		error,
	} = useSelector((state) => state.getRepo);

	React.useEffect(() => {
		dispatch(getRepoRequest(name, repo));
	}, []);

	const goBack = () => {
		nav('/user/' + name);
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
					<Card className={styles.default.cardContainer} sx={{ width: 500 }}>
						<CardHeader
							avatar={
								<Avatar
									alt={username + ' avatar'}
									src={avatar_url}
									sx={{ width: 24, height: 24 }}
								/>
							}
							title={<Link href={url}>{reponame}</Link>}
							subheader={
								'Created at : ' + created_at + ', Updated at : ' + updated_at
							}
						/>
						<CardActions
							className={styles.default.cardActionsContainer}
							disableSpacing
						>
							<div className={styles.default.infoContainer}>
								<Chip style={{ marginRight: 10 }} label={language} />
								<Rating name='read-only' value={stars} readOnly />
							</div>
							{expanded ? (
								<ExpandLess
									style={{ cursor: 'pointer' }}
									onClick={handleExpandClick}
								/>
							) : (
								<ExpandMore
									style={{ cursor: 'pointer' }}
									onClick={handleExpandClick}
								/>
							)}
						</CardActions>
						<Collapse in={expanded} timeout='auto' unmountOnExit>
							<CardContent>
								<Typography variant='h5'>Description:</Typography>
								<Typography variant='body1'>{description}</Typography>
							</CardContent>
						</Collapse>
					</Card>
					<Typography style={{ cursor: 'pointer' }} onClick={goBack}>
						Go back
					</Typography>
				</div>
			)}
		</div>
	);
};

export default RepositoryPage;
