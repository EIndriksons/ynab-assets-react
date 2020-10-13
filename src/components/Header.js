import React from 'react';

function Header() {
  return (
    <React.Fragment>
      <div className="collapse navbar-collapse">
        <div className="navbar-nav">
          <a className="nav-item nav-link active">
            Home<span className="sr-only">(current)</span>
          </a>
          <a className="nav-item nav-link">Features</a>
          <a className="nav-item nav-link">Pricing</a>
          <a className="nav-item nav-link disabled">Disabled</a>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Header;
