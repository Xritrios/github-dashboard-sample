import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	username: '',
	avatar_url: '',
	reponame: '',
	language: '',
	stars: 0,
	description: '',
	created_at: '',
	updated_at: '',
	url: '',
	loaded: false,
	loading: false,
	error: '',
};

const getRepoSlice = createSlice({
	name: 'getRepo',
	initialState,
	reducers: {
		getRepoRequestInit(state) {
			state.error = '';
			state.loading = true;
			state.loaded = false;
		},
		getRepoSuccess(state, { payload }) {
			state.username = payload.owner.login;
			state.avatar_url = payload.owner.avatar_url;
			state.reponame = payload.name;
			state.language = payload.language;
			state.stars = payload.stargazers_count;
			state.description = payload.description;
			state.created_at = payload.created_at.split('T')[0];
			state.updated_at = payload.updated_at.split('T')[0];
			state.url = payload.html_url;
			state.loaded = true;
			state.loading = false;
		},
		getRepoFailure(state, { payload }) {
			state.error = payload.error;
			state.loaded = false;
			state.loading = false;
		},
	},
});

const { getRepoRequestInit, getRepoSuccess, getRepoFailure } =
	getRepoSlice.actions;

export const getRepoRequest = (username, reponame) => async (dispatch) => {
	dispatch(getRepoRequestInit());
	try {
		const { data } = await axios.get(
			'https://api.github.com/repos/' + username + '/' + reponame
		);
		dispatch(getRepoSuccess(data));
	} catch (error) {
		dispatch(getRepoFailure(error.response.message));
	}
};

export const { reducer: getRepoReducer } = getRepoSlice;
