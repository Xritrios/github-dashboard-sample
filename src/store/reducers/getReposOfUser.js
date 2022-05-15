import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	username: '',
	avatar_url: '',
	repos: [],
	loaded: false,
	loading: false,
	error: '',
};

const getReposOfUserSlice = createSlice({
	name: 'getReposOfUser',
	initialState,
	reducers: {
		getReposOfUserRequestInit(state) {
			state.error = '';
			state.loading = true;
			state.loaded = false;
		},
		getReposOfUserSuccess(state, { payload }) {
			state.username = payload[0].owner.login;
			state.avatar_url = payload[0].owner.avatar_url;
			state.repos = payload.map((repo) => repo.name);
			state.loaded = true;
			state.loading = false;
		},
		getReposOfUserFailure(state, { payload }) {
			state.error = payload.error;
			state.loaded = false;
			state.loading = false;
		},
	},
});

const {
	getReposOfUserRequestInit,
	getReposOfUserSuccess,
	getReposOfUserFailure,
} = getReposOfUserSlice.actions;

export const getReposOfUserRequest = (username) => async (dispatch) => {
	dispatch(getReposOfUserRequestInit());
	try {
		const { data } = await axios.get(
			'https://api.github.com/users/' + username + '/repos'
		);
		dispatch(getReposOfUserSuccess(data));
	} catch (error) {
		dispatch(getReposOfUserFailure(error.response.message));
	}
};

export const { reducer: getReposOfUserReducer } = getReposOfUserSlice;
