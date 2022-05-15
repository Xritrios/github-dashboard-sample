import React from 'react';
import { Typography } from '@mui/material';
import * as styles from '../styles/components/Header.module.css';

const Header = () => {
	return (
		<Typography className={styles.default.header} variant='h4'>
			GitHub Dashboard Sample
		</Typography>
	);
};

export default Header;
