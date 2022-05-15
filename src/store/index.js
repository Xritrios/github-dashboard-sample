import { configureStore } from '@reduxjs/toolkit';
import { getUserReducer } from './reducers/getUser';
import { getReposOfUserReducer } from './reducers/getReposOfUser';
import { getRepoReducer } from './reducers/getRepo';

const store = configureStore({
	reducer: {
		getUser: getUserReducer,
		getReposOfUser: getReposOfUserReducer,
		getRepo: getRepoReducer,
	},
});

export default store;
