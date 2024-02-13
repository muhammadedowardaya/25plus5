import { IoMdPause, IoMdPlay } from 'react-icons/io';
import { BsArrowRepeat } from 'react-icons/bs';
import '../styles/TimerControls.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
	resetTimeManagement,
	togglePlayTime,
} from '../features/TimeManagement/timeManagementSlice';

export default function TimerControls() {
	const play = useSelector((state) => state.timeManagement.play);

	const dispatch = useDispatch();

	const toggleHandler = () => {
		dispatch(togglePlayTime());
	};

	const resetHandler = (e) => {
		dispatch(resetTimeManagement());
		const reset = e.target.parentNode;
		if (reset) {
			if (!reset.classList.contains('active')) {
				reset.classList.add('active');
			}

			setTimeout(() => {
				if (reset.classList.contains('active')) {
					reset.classList.remove('active');
				}
			}, 1000);
		}
	};

	return (
		<div id="timer-controls">
			<div id="start_stop" onClick={toggleHandler}>
				{play ? <IoMdPause /> : <IoMdPlay />}
			</div>
			<div id="reset" onClick={resetHandler}>
				<BsArrowRepeat />
			</div>
		</div>
	);
}
