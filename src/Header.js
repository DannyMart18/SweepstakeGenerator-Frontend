import React from 'react';

const Header = () => (
  <header className="py-4 mb-4 border-bottom">
    <h2 className="text-center">Grand National Sweepstake Generator</h2>
  </header>
);

const Footer = () => (
  <footer className="py-4 mt-4 border-top">
    <p className="text-center text-muted">&copy; {new Date().getFullYear()} Grand National</p>
  </footer>
);

export { Header, Footer };
