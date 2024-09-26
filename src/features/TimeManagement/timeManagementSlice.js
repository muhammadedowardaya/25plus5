import { createSlice } from '@reduxjs/toolkit';
import { formatTime } from '../../utils/formatDate';

const initialState = {
	breakLength: localStorage.getItem('breakLength')
		? localStorage.getItem('breakLength')
		: 5,
	sessionLength: localStorage.getItem('sessionLength')
		? localStorage.getItem('sessionLength')
		: 25,
	play: false,
	time: localStorage.getItem('time')
		? localStorage.getItem('time')
		: formatTime(25),
	totalSeconds: localStorage.getItem('totalSeconds')
		? localStorage.getItem('totalSeconds')
		: '',
	breakTime: localStorage.getItem('breakTime')
		? localStorage.getItem('breakTime')
		: false,
    audioBreakUrl: localStorage.getItem('audioBreakUrl') ? localStorage.getItem('audioBreakUrl') : null,
    audioSessionUrl: localStorage.getItem('audioSessionUrl') ? localStorage.getItem('audioSessionUrl') : null,
    imageBreakUrl: localStorage.getItem('imageBreakUrl') ? localStorage.getItem('imageBreakUrl') : null,
    imageSessionUrl: localStorage.getItem('imageSessionUrl') ? localStorage.getItem('imageSessionUrl') : null
};

export const timeManagementSlice = createSlice({
	name: 'timeManagement',
	initialState,
	reducers: {
		breakLengthIncrement: (state) => {
			if (!state.play) {
				if (state.breakLength < 60) {
					state.breakLength += 1;
				}
				localStorage.setItem('breakLength', state.breakLength);
			}
		},
		breakLengthDecrement: (state) => {
			if (!state.play) {
				if (state.breakLength > 1) {
					state.breakLength -= 1;
				}
				localStorage.setItem('breakLength', state.breakLength);
			}
		},
		sessionLengthIncrement: (state) => {
			if (!state.play) {
				if (state.sessionLength < 60) {
					state.sessionLength += 1;

					if (!state.breakTime) {
						state.time = formatTime(state.sessionLength);
						localStorage.setItem('time', formatTime(state.sessionLength));
					}
					localStorage.setItem('sessionLength', state.sessionLength);
				}
			}
		},
		sessionLengthDecrement: (state) => {
			if (!state.play) {
				if (state.sessionLength > 1) {
					state.sessionLength -= 1;

					if (!state.breakTime) {
						state.time = formatTime(state.sessionLength);
						localStorage.setItem('time', formatTime(state.sessionLength));
					}
					localStorage.setItem('sessionLength', state.sessionLength);
				}
			}
		},
		togglePlayTime: (state) => {
			state.play = !state.play;
		},
		resetTimeManagement: (state) => {
			state.breakLength = 5;
			state.sessionLength = 25;
			state.time = formatTime(25);
			state.play = false;
			state.breakTime = false;

			localStorage.clear();
		},
		setTime: (state, action) => {
			state.time = action.payload;
			localStorage.setItem('time', action.payload);
		},
		setTotalSeconds: (state, action) => {
			state.totalSeconds = action.payload;
			localStorage.setItem('totalSeconds', action.payload);
		},
		setBreakTime: (state, action) => {
			state.breakTime = action.payload;
			localStorage.setItem('breakTime', action.payload);
		},
		setAudioBreakUrl: (state, action) => {
			state.audioBreakUrl = action.payload;
			localStorage.setItem('audioBreakUrl', action.payload);
		},
		setAudioSessionUrl: (state, action) => {
			state.audioSessionUrl = action.payload;
			localStorage.setItem('audioSessionUrl', action.payload);
		},
		setImageBreakUrl: (state, action) => {
			state.imageBreakUrl = action.payload;
			localStorage.setItem('imageBreakUrl', action.payload);
		},
		setImageSessionUrl: (state, action) => {
			state.imageSessionUrl = action.payload;
			localStorage.setItem('imageSessionUrl', action.payload);
		},
	},
});

export const {
	breakLengthIncrement,
	breakLengthDecrement,
	sessionLengthIncrement,
	sessionLengthDecrement,
	togglePlayTime,
	setBreakTime,
	resetTimeManagement,
	setTime,
	setTotalSeconds,
    setAudioBreakUrl,
    setAudioSessionUrl,
    setImageBreakUrl,
    setImageSessionUrl
} = timeManagementSlice.actions;

export default timeManagementSlice.reducer;
