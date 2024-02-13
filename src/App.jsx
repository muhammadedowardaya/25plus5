import './styles/App.scss';
import BreakTime from './components/BreakTime';
import SessionTime from './components/SessionTime';
import TimerControls from './components/TimerControls';
import Timer from './components/Timer';

function App() {
	return (
		<div id="app">
			<h1 id="title">25 + 5 Clock</h1>
			<div className="time-management">
				<BreakTime />
				<SessionTime />
			</div>
			<Timer />
			<TimerControls />
		</div>
	);
}

export default App;
