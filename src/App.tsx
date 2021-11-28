import React from 'react';
import { Container } from 'react-bootstrap';

import Provider from "./Providers";

export default function App() {
  return (
    <div
      style={{
        backgroundColor: 'black'
      }}
    >
      <header>
        <Container fluid>
          <Provider />
        </Container>
      </header>
    </div>
  );
}
