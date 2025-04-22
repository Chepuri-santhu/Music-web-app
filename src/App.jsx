import React, { useState } from 'react';
import styled from 'styled-components';

import { Navbar } from './Components/Navbar';
import { SongsList } from './Components/SongsList';
import { MusicPlayer } from './Components/MusicPlayer';

const AppContainer = styled.div`
  background-color: #121212;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column; /* Important for vertical stacking */
  width: 100vw; /* Use full screen width */
  overflow-x: hidden; /* Avoid horizontal scroll */
  padding-bottom: 120px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 6rem 4rem 9rem; /* increased padding for better spacing */
  gap: 2rem;
`;

const CDContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column; /* Stacking content vertically */
  justify-content: center;
  align-items: center;
`;

const RotatingCDBox = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #1db954; /* Green border around the CD */
  border-radius: 50%;
  padding: 20px;
  background: #1a1a1a; /* Dark background for contrast */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
`;

const RotatingCD = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 8px solid #444;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  animation: rotate 10s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

const SongDetails = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: white;
`;

const SongTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.5rem 0;
  color: #1db954; /* Green color for the title */
`;

const SongArtist = styled.p`
  font-size: 1.2rem;
  color: #888; /* Lighter color for the artist */
`;

const Title = styled.h1`
  text-align: center;
  margin: 0 0 2rem;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, #8e2de2, #4a00e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 10px rgba(138, 43, 226, 0.3);
  letter-spacing: 1px;
`;

function App() {
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <AppContainer>
      <Navbar />
      <Content>
        <div style={{ flex: 1, maxWidth: '2000px' }}>
          <Title>My Songs</Title>
          <SongsList onSelect={setSelectedSong} />
        </div>

        <CDContainer>
          <RotatingCDBox>
            <RotatingCD
              src={selectedSong ? selectedSong.artwork : 'https://cdn-icons-png.flaticon.com/512/727/727218.png'}
              alt="Rotating CD"
            />
          </RotatingCDBox>

          {selectedSong && (
            <SongDetails>
              <SongTitle>{selectedSong.title}</SongTitle>
              <SongArtist>{selectedSong.artist}</SongArtist>
            </SongDetails>
          )}
        </CDContainer>
      </Content>

      {selectedSong && (
        <MusicPlayer
          song={selectedSong.file}
          title={selectedSong.title}
          artist={selectedSong.artist}
          artwork={selectedSong.artwork}
        />
      )}
    </AppContainer>
  );
}

export default App;
