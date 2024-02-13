import { useDispatch, useSelector } from 'react-redux';
import '../styles/BreakTime.scss';

import { FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa';
import {
	breakLengthDecrement,
	breakLengthIncrement,
} from '../features/TimeManagement/timeManagementSlice';

export default function BreakTime() {
	const breakLength = useSelector((state) => state.timeManagement.breakLength);
	const dispatch = useDispatch();

	const incrementHandler = () => {
		dispatch(breakLengthIncrement());
	};

	const decrementHandler = () => {
		dispatch(breakLengthDecrement());
	};

	return (
		<div id="break-time">
			<div id="break-label">Break Length</div>
			<div className="break-time__controls">
				<button id="break-increment" onClick={incrementHandler}>
					<FaArrowAltCircleUp />
				</button>
				<div id="break-time__value">{breakLength}</div>
				<button id="break-decrement" onClick={decrementHandler}>
					<FaArrowAltCircleDown />
				</button>
			</div>
		</div>
	);
}
