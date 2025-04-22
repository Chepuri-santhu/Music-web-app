import React from 'react';
import styled, { keyframes } from 'styled-components';
const animateBg = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const NavbarContainer = styled.nav`
  width: 100%;
  padding: 1.2rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  color: white;

  /* Green and Black gradient animation */
  background: linear-gradient(-45deg, #0a0a0a, #1db954, #0f0f0f, #1db954);
  background-size: 400% 400%;
  animation: ${animateBg} 10s ease infinite;

  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(29, 185, 84, 0.3);
  border-bottom: 2px solid #1db954;  /* Optional: Adds a sleek border at the bottom */
`;





const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px #8e2de2, 0 0 5px #4a00e0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>🎵 DetoxiFy</Logo>
    </NavbarContainer>
  );
};
