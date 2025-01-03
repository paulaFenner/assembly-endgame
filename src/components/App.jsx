import { useState } from 'react';
import Header from './Header';
import Status from './Status';
import Languages from './Languages';

export default function App() {
  return (
    <main>
      <Header />
      <Status />
      <Languages />
    </main>
  );
}
