import { FunctionComponent } from "react";
import "./header.css";
import logo from './logo.svg';

const Logo = () => <img src={logo} alt="logo"/>;

const Header: FunctionComponent = () => {
  return (
    <header>
      <div className="container">
        <div className="section logo-section">
          <a
            aria-current="page"
            title="HeartBeat Logo"
            className="header-logo-link"
            href="https://heartbeat-med.com/solutions/#kfjt7ps3uyilekearf959"
          >
            <span className="styled-link-body">
              <Logo />
            </span>
          </a>
        </div>
        <div className="account-section">
          <div className="box">
            <div className="wrapper">
              <button className="button-wrapper">AM</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
