import defiLogo from "../../assets/defiPe_logo.webp";
import "./Header.css";
import { Bars3Icon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Header() {
  const [toggle, setToggle] = useState(false);

  return (
    <header className="navbar">
      <img src={defiLogo} alt="DefiPe" className="logo" />
      <nav className="desktop-menu">
        <ul id="menuList">
          <li>
            <a href="http://defipe.io/" className="nav-icon-div">
              <p>Home</p>
            </a>
          </li>
          <li>
            <a href="http://app.defipe.io/">Trade</a>
          </li>
          <li>
            <a href="" style={{ cursor: "auto" }}>
              Buy Crypto
            </a>
          </li>
        </ul>
      </nav>
      <ConnectButton />
      {toggle ? (
        <nav className="mobile-menu">
          <ul id="menuList">
            <li>
              <a href="http://defipe.io/">Home</a>
            </li>
            <li>
              <a href="http://app.defipe.io/">Trade</a>
            </li>
            <li>
              <a href="">Buy Crypto</a>
            </li>
          </ul>
        </nav>
      ) : (
        <></>
      )}
      <Bars3Icon className="menu-icon" onClick={() => setToggle(!toggle)} />
    </header>
  );
}

export default Header;
