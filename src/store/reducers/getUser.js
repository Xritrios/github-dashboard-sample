import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	username: '',
	avatar_url: '',
	loaded: false,
	loading: false,
	error: '',
};

const getUserSlice = createSlice({
	name: 'getUser',
	initialState,
	reducers: {
		backToInitialState(state) {
			state.username = '';
			state.avatar_url = '';
			state.error = '';
			state.loading = false;
			state.loaded = false;
		},
		getUserRequestInit(state) {
			state.error = '';
			state.loading = true;
			state.loaded = false;
		},
		getUserSuccess(state, { payload }) {
			state.username = payload.login;
			state.avatar_url = payload.avatar_url;
			state.loaded = true;
			state.loading = false;
		},
		getUserFailure(state, { payload }) {
			state.error = payload;
			state.loaded = false;
			state.loading = false;
		},
	},
});

const {
	backToInitialState,
	getUserRequestInit,
	getUserSuccess,
	getUserFailure,
} = getUserSlice.actions;

export const initUserRequest = () => async (dispatch) => {
	dispatch(backToInitialState());
};

export const getUserRequest = (username) => async (dispatch) => {
	dispatch(getUserRequestInit());
	try {
		const { data } = await axios.get(
			'https://api.github.com/users/' + username
		);
		dispatch(getUserSuccess(data));
	} catch (error) {
		dispatch(getUserFailure(error.response.data.message));
	}
};

export const { reducer: getUserReducer } = getUserSlice;
