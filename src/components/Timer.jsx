import { useDispatch, useSelector } from 'react-redux';
import '../styles/Timer.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { formatTime } from '../utils/formatDate';
import {
	setBreakTime,
	setTime,
	setTotalSeconds,
} from '../features/TimeManagement/timeManagementSlice';

export default function Timer() {
	const breakLength = useSelector((state) => state.timeManagement.breakLength);
	const sessionLength = useSelector(
		(state) => state.timeManagement.sessionLength
	);
	const play = useSelector((state) => state.timeManagement.play);
	const time = useSelector((state) => state.timeManagement.time);
	const totalSeconds = useSelector(
		(state) => state.timeManagement.totalSeconds
	);
	const breakTime = useSelector((state) => state.timeManagement.breakTime);

	const dispatch = useDispatch();

	const intervalRef = React.useRef();

	React.useEffect(() => {
		let remainingTime = totalSeconds;

		intervalRef.current = setInterval(function () {
			if (play) {
				const displayMinutes = Math.floor(remainingTime / 60);
				const displaySeconds = remainingTime % 60;

				const minutes = String(displayMinutes).padStart(2, '0');
				const seconds = String(displaySeconds).padStart(2, '0');

				dispatch(setTime(formatTime(minutes, seconds)));

				if (remainingTime <= 0) {
					clearInterval(intervalRef.current);
					// console.log('Time is up!');
					if (breakTime) {
						dispatch(setBreakTime(false));
						dispatch(setTotalSeconds(sessionLength * 60));
					} else {
						dispatch(setBreakTime(true));
						dispatch(setTotalSeconds(breakLength * 60));
					}
				} else {
					dispatch(setTotalSeconds(remainingTime--));
					// totalSeconds--;
				}
			}
		}, 1000);

		return () => {
			clearInterval(intervalRef.current);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [play, breakTime]);

	React.useEffect(() => {
		dispatch(
			setTotalSeconds(breakTime ? breakLength * 60 : sessionLength * 60)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [breakLength, sessionLength]);

	return (
		<div id="timer" className={breakTime && play ? 'break' : play && !breakTime ? 'play' : ''}>
			<div id="timer-label">{breakTime ? 'Break' : 'Session'}</div>
			<div id="time-left">{time}</div>
		</div>
	);
}

Timer.propTypes = {
	time: PropTypes.string,
};
