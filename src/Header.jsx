import { useEffect } from 'react';

const Header = ({ wins }) => {

  return (
    <header className="header">
        <h2>Twin Tiles</h2>    
        <h3>{wins} wins</h3>
    </header>
  );
};

export default Header;