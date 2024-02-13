import { useDispatch, useSelector } from 'react-redux';
import '../styles/SessionTime.scss';
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa';
import {
	sessionLengthDecrement,
	sessionLengthIncrement,
} from '../features/TimeManagement/timeManagementSlice';

export default function SessionTime() {
	const sessionLength = useSelector(
		(state) => state.timeManagement.sessionLength
	);
	const dispatch = useDispatch();

	const incrementHandler = () => {
		dispatch(sessionLengthIncrement());
	};

	const decrementHandler = () => {
		dispatch(sessionLengthDecrement());
	};

	return (
		<div id="session-time">
			<div id="session-label">Session Length</div>
			<div className="session-time__controls">
				<button id="session-increment" onClick={incrementHandler}>
					<FaArrowAltCircleUp />
				</button>
				<div id="session-time__value">{sessionLength}</div>
				<button id="session-decrement" onClick={decrementHandler}>
					<FaArrowAltCircleDown />
				</button>
			</div>
		</div>
	);
}
