import './styles/App.scss';
import BreakTime from './components/BreakTime';
import SessionTime from './components/SessionTime';
import TimerControls from './components/TimerControls';
import Timer from './components/Timer';
import { ChooseAudioAndImage } from './components/ChooseAudioAndImage';
import { useSelector } from 'react-redux';

function App() {
    const play = useSelector((state) => state.timeManagement.play);
    const breakTime = useSelector((state) => state.timeManagement.breakTime);
    const imageBreak = useSelector((state) => state.timeManagement.imageBreakUrl);
    const imageSession = useSelector((state) => state.timeManagement.imageSessionUrl);

    return (
        <div id="app"
        >
            {play ? (
                <h1 id="title">25 + 5 Clock</h1>
            ) : (
                <div className='hidden xs:block w-52 h-52 bg-cover bg-center bg-white rounded-full mx-auto mt-10' style={{
                    backgroundImage: `url('/images/logo.png')`
                }}></div>
            )}
            <div className={`time-management ${play ? '!hidden' : ''}`}>
                <BreakTime />
                <SessionTime />
            </div>
            <div className={`${play && breakTime ? 'block' : 'hidden'}`}>
                <img src={imageBreak? imageBreak : '/images/squidward-break.gif'} alt='break time image' className='object-cover w-full h-[190px] sm:h-[350px] xs:w-[360px] sm:w-[500px] mx-auto pb-6 sm:pb-20 lg:pb-10 lg:mt-20' />
            </div>
            <div className={`${play && !breakTime ? 'block' : 'hidden'}`}>
                <img src={imageSession? imageSession : '/images/spongebob.gif'} alt='session time image' className='object-cover w-full h-[190px] sm:h-[350px] xs:w-[360px] sm:w-[500px] mx-auto pb-6 sm:pb-20 lg:pb-10 lg:mt-20' />
            </div>
            <Timer />
            <TimerControls />
            <ChooseAudioAndImage />
        </div>
    );
}

export default App;
