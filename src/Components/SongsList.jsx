import React from 'react';
import styled from 'styled-components';
import chuttamalle from '/assets/Chuttamalle.mp3';
import fein from '/assets/Travis-Scott-FE-N-(HipHopKit.com).mp3';
import Keems from '/assets/Nene Kani Nenai Undaga-SenSongsMp3.Co.mp3';
import ram from '/assets/Dillaku Dillaku-SenSongsMp3.Com.mp3';
import chuimg from '/assets/images/chuttamalle.jpeg';
import feimg from '/assets/images/fein.jpeg';
import neimg from '/assets/images/nene kani.jpeg';
import dilimg from '/assets/images/dillaku dillaku.jpeg';
import rabbar from '/assets/Rabbaru Gaajulu-SenSongsMp3.Co.mp3';
import raimg from '/assets/images/rabbar.jpeg';

const songs = [
  {
    title: 'Chuttamalle',
    artist: 'NTR',
    file: chuttamalle,
    artwork: chuimg,
  },
  {
    title: 'Fe!n',
    artist: 'Chapri',
    file: fein,
    artwork: feimg,
  },
  {
    title: 'Nene Kani Nenai',
    artist: 'Keems',
    file: Keems,
    artwork: neimg,
  },
  {
    title: 'Dillaku Dillaku',
    artist: 'Ramcharan',
    file: ram,
    artwork: dilimg,
  },{
    title: 'Rabbar Gajulu',
    artist: 'NTR',
    file: rabbar,
    artwork: raimg,

  },
];

const SongListContainer = styled.div`
  width:100%;
  padding: 1rem;
  max-width: 600px;
  margin: auto;
`;

const SongItem = styled.div`
  background: #1e1e1e;
  color: white;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #2e2e2e;
  }
`;

const SongImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const SongDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const SongTitle = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
`;

const Artist = styled.span`
  font-size: 0.9rem;
  color: #aaa;
`;

const PlayIcon = styled.span`
  font-size: 1.5rem;
  color: #1db954;
`;

export const SongsList = ({ onSelect }) => {
  return (
    <SongListContainer>
      {songs.map((song, index) => (
        <SongItem key={index} onClick={() => onSelect(song)}>
          <SongImage src={song.artwork} alt={`${song.title} artwork`} />
          <SongDetails>
            <SongTitle>{song.title}</SongTitle>
            <Artist>{song.artist}</Artist>
          </SongDetails>
          <PlayIcon>▶</PlayIcon>
        </SongItem>
      ))}
    </SongListContainer>
  );
};
