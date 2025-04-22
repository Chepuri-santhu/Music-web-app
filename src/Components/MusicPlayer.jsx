import React, { useRef, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle, faForward, faBackward, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

// Styled components and animations...

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const FixedBottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 96.5%;
  background: #282828;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  z-index: 100;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.3);
`;

const Artwork = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 1.5rem;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;

const SongInfo = styled.div`
  flex-grow: 1;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArtistName = styled.p`
  color: #b3b3b3;
  font-size: 0.8rem;
  margin-top: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  outline: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProgressBarContainer = styled.div`
  flex-grow: 1;
  margin: 0 1.5rem;
  display: flex;
  align-items: center;
`;

const ProgressBar = styled.input.attrs({ type: 'range' })`
  flex-grow: 1;
  appearance: none;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(
    90deg,
    #8e2de2 0%,
    #8e2de2 ${({ progressPercent }) => progressPercent}%,
    #444 ${({ progressPercent }) => progressPercent}%,
    #444 100%
  );
  cursor: pointer;
  transition: background 0.3s ease;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    background: radial-gradient(circle, #8e2de2, #4a00e0);
    border-radius: 50%;
    box-shadow: 0 0 8px #8e2de2;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    cursor: pointer;
    margin-top: -5px;

    &:hover {
      transform: scale(1.2);
      box-shadow: 0 0 12px #a25cff;
    }
  }

  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: radial-gradient(circle, #8e2de2, #4a00e0);
    border-radius: 50%;
    box-shadow: 0 0 8px #8e2de2;
    border: none;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
      box-shadow: 0 0 12px #a25cff;
    }
  }
`;


const TimeDisplay = styled.div`
  color: #b3b3b3;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

export const MusicPlayer = ({ song, title, artist,artwork }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);


  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setProgress(audio.currentTime);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    audio.currentTime = e.target.value;
    setProgress(e.target.value);
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const updateDuration = () => {
    const audio = audioRef.current;
    setDuration(audio.duration);
  };
  const skipForward = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.min(audio.currentTime + 10, duration);
      setProgress(audio.currentTime);
    }
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(audio.currentTime - 10, 0);
      setProgress(audio.currentTime);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !muted;
      setMuted(!muted);
    }
  };


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [song]);

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <FixedBottomBar>
      <audio
        ref={audioRef}
        src={song}
        onTimeUpdate={handleTimeUpdate}
      />
     <Artwork>
  {artwork ? <img src={artwork} alt="Artwork" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '🎵'}
</Artwork>

      <SongInfo>
        <Title>{title || "Your Song Title"}</Title>
        <ArtistName>{artist || "Artist Name"}</ArtistName>
      </SongInfo>
      <ProgressBarContainer>
        <ProgressBar
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={handleSeek}
          progressPercent={progressPercent}
        />
        <TimeDisplay>{formatTime(progress)} / {formatTime(duration)}</TimeDisplay>
      </ProgressBarContainer>
      <Controls>
        <ControlButton onClick={skipBackward}>
          <FontAwesomeIcon icon={faBackward} />
        </ControlButton>
        <ControlButton onClick={togglePlay}>
          <FontAwesomeIcon icon={isPlaying ? faPauseCircle : faPlayCircle} />
        </ControlButton>
        <ControlButton onClick={skipForward}>
          <FontAwesomeIcon icon={faForward} />
        </ControlButton>
        <ControlButton onClick={toggleMute} title={muted ? 'Unmute' : 'Mute'}>
  <FontAwesomeIcon icon={muted ? faVolumeMute : faVolumeUp} />
</ControlButton>

      </Controls>

    </FixedBottomBar>
  );
};
