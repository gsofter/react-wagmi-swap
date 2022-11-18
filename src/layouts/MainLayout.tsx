import React from 'react';
import { Container } from '@mui/material';
import Header from '../components/Header';

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => (
  <>
    <Header />
    <Container maxWidth="lg" sx={{ pt: 5, pb: 2 }}>
      {children}
    </Container>
  </>
);

export default MainLayout;
