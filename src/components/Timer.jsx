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
    const audioBreakUrl = useSelector((state) => state.timeManagement.audioBreakUrl);
    const audioSessionUrl = useSelector((state) => state.timeManagement.audioSessionUrl);

    const breakLength = useSelector((state) => state.timeManagement.breakLength);
    const sessionLength = useSelector(
        (state) => state.timeManagement.sessionLength
    );
    const play = useSelector((state) => state.timeManagement.play);
    const breakTime = useSelector((state) => state.timeManagement.breakTime);
    const time = useSelector((state) => state.timeManagement.time);
    const totalSeconds = useSelector(
        (state) => state.timeManagement.totalSeconds
    );

    const dispatch = useDispatch();

    const intervalRef = React.useRef();

    React.useEffect(() => {
        const audioBreak = document.querySelector('audio.audio-break');
        const audioSession = document.querySelector('audio.audio-session');
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
                    if (breakTime) {
                        dispatch(setBreakTime(false));
                        audioBreak.pause();
                        audioBreak.currentTime = 0;

                        audioSession.play();
                        dispatch(setTotalSeconds(sessionLength * 60));
                    } else {
                        dispatch(setBreakTime(true));
                        audioSession.pause();
                        audioSession.currentTime = 0;

                        audioBreak.play();
                        dispatch(setTotalSeconds(breakLength * 60));
                    }
                } else {
                    dispatch(setTotalSeconds(remainingTime--));
                }
            }
        }, 1000);

        if (!audioBreak.paused && !play && breakTime) {
            audioBreak.pause();
        } else if (audioBreak.paused && play && breakTime) {
            if (!audioBreak.ended) {
                audioBreak.play();
            }
        }

        if (!audioSession.paused && !play && !breakTime) {
            audioSession.pause();
        } else if (audioSession.paused && play && !breakTime) {
            if (!audioSession.ended) {
                audioSession.play();
            }
        }

        return () => {
            clearInterval(intervalRef.current);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [play, breakTime]);

    React.useEffect(() => {
        dispatch(
            setTotalSeconds(breakTime ? breakLength * 60 : sessionLength * 60)
        );

        const audioBreak = document.querySelector('audio.audio-break');
        const audioSession = document.querySelector('audio.audio-session');

        if (audioBreak) {
            audioBreak.pause(); // Hentikan audio
            audioBreak.currentTime = 0; // Kembalikan ke awal
        }

        if (audioSession) {
            audioSession.pause(); // Hentikan audio
            audioSession.currentTime = 0; // Kembalikan ke awal
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [breakLength, sessionLength]);


    return (
        <div
            id="timer"
            className={breakTime && play ? 'break' : play && !breakTime ? 'play' : ''}
        >
            <div id="timer-label" className='select-none'>{breakTime ? 'Break' : 'Session'}</div>
            <div id="time-left" className='select-none'>{time}</div>
            <audio id='beep' className="audio-break" src={audioBreakUrl ? audioBreakUrl : '/audios/break.mp3'}></audio>
            <audio className="audio-session" src={audioSessionUrl ? audioSessionUrl : '/audios/session.mp3'}></audio>
        </div>
    );
}

Timer.propTypes = {
    time: PropTypes.string,
};
