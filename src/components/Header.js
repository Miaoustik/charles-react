import React, { useState } from "react";
import styled from "styled-components/macro";
import { Link, useLocation } from "react-router-dom";
import logo from "../img/Logo.png";
import logot from "../img/Logo-transparent.png";

const Header = ({ links }) => {
  const url = useLocation();
  const [showBurger, setShowBurger] = useState(false);

  const [active, setActive] = useState({
    galerie: false,
    tarifs: false,
    contact: false,
  });
  const handleClick = (numb) => {
    if (numb === 0) {
      setActive({
        galerie: true,
        tarifs: false,
        contact: false,
      });
    } else if (numb === 1) {
      setActive({
        galerie: false,
        tarifs: true,
        contact: false,
      });
    } else if (numb === 2) {
      setActive({
        galerie: false,
        tarifs: false,
        contact: true,
      });
    } else if (numb === 3) {
      setActive({
        galerie: false,
        tarifs: false,
        contact: false,
      });
    }
    setShowBurger(false)
  };
  const content = (
    <>
      <Link to="/" className="logo-link" onClick={() => handleClick(3)}>
        <div className="logo" />
      </Link>
      <div className="container">
        <Link
          to="/galerie"
          className={active.galerie ? "link active" : "link"}
          onClick={() => handleClick(0)}
        >
          Galerie
        </Link>
        <Link
          to="/tarifs"
          className={active.tarifs ? "link active" : "link"}
          onClick={() => handleClick(1)}
        >
          Tarifs et prestations
        </Link>
        <Link
          to="/contact"
          className={active.contact ? "link active" : "link"}
          onClick={() => handleClick(2)}
        >
          Contact
        </Link>
        <a href={links.facebook} className="fb">
          <svg
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
          >
            <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z" />
          </svg>
        </a>
        <a href={links.insta} className="insta">
          <svg
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path d="M 16.5 5 C 10.16639 5 5 10.16639 5 16.5 L 5 31.5 C 5 37.832757 10.166209 43 16.5 43 L 31.5 43 C 37.832938 43 43 37.832938 43 31.5 L 43 16.5 C 43 10.166209 37.832757 5 31.5 5 L 16.5 5 z M 16.5 8 L 31.5 8 C 36.211243 8 40 11.787791 40 16.5 L 40 31.5 C 40 36.211062 36.211062 40 31.5 40 L 16.5 40 C 11.787791 40 8 36.211243 8 31.5 L 8 16.5 C 8 11.78761 11.78761 8 16.5 8 z M 34 12 C 32.895 12 32 12.895 32 14 C 32 15.105 32.895 16 34 16 C 35.105 16 36 15.105 36 14 C 36 12.895 35.105 12 34 12 z M 24 14 C 18.495178 14 14 18.495178 14 24 C 14 29.504822 18.495178 34 24 34 C 29.504822 34 34 29.504822 34 24 C 34 18.495178 29.504822 14 24 14 z M 24 17 C 27.883178 17 31 20.116822 31 24 C 31 27.883178 27.883178 31 24 31 C 20.116822 31 17 27.883178 17 24 C 17 20.116822 20.116822 17 24 17 z" />
          </svg>
        </a>
      </div>
      <button
        className={`burger-btn`}
        type="button"
        onClick={() => setShowBurger(!showBurger)}
      >
        <span className={`span${showBurger ? " open" : ""}`}></span>
      </button>
    </>
  );

  return (
    <>
      {url.pathname === "/" ? (
        <HeaderStyledHome showBurger={showBurger}>{content}</HeaderStyledHome>
      ) : (
        <HeaderStyled showBurger={showBurger}>{content}</HeaderStyled>
      )}
    </>
  );
};

const HeaderStyled = styled.header`
  height: ${(props) => (props.leaving ? 0 : "97px")};
  width: 100%;
  background-color: #47555e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-shadow: 0px 4px 4px 0px #00000060;
  max-height: 20%;
  min-height: 15%;
  @media screen and (min-width: 700px) {
    .burger-btn {
      display: none;
    }
    .link {
      margin-right: 7vw;
      font-size: 1.6vw;
    }
    .insta {
      margin-right: 50px;
      margin-left: 18px;
    }
    .insta,
    .fb {
      display: flex;
      align-items: center;
      height: 100%;
      width: auto;
      
    }
    .insta svg,
    .fb svg {
      height: 100%;
      width: 100%;
      max-height: 2vw;
    }
    .container {
      display: flex;
      align-items: center;
    }
    .logo-link {
      width: 30%;
      height: auto;
    }
  }
  @media screen and (min-width: 700px) and (max-width: 1000px) {
    .link {
      font-size: 1.9vw;
    }
    .fb svg, .insta svg {
      max-height: 3vw;
    }
  }
  @media screen and (max-width: 700px) {
    
    .open {
      transform: translateX(-28px);
      background: transparent;
      
      

    }
    .open::before {
      transform: rotate(45deg) translate(20px, -20px);
      
    }
    .open::after {
      transform: rotate(-45deg) translate(20px, 20px);
    }
    .span {
      transition: all 0.5s ease-in-out;
      padding: 0;
      margin: 0;

    }
    .burger-btn {
      z-index: 6;
      background-color: transparent;
      top: 1 vh;
      right: 30px;
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 40px;
      
      cursor: pointer;
      
      border: none;
    }
    .span:not(.open)::before {
     transform: translateY(9px);
    }
    .span:not(.open)::after {
      transform: translateY(-9px);
    }
    .span::before,
    .span::after {
      content: '';
      background-color: #fff;
    }
    .span::before,
    .span::after,
    .span {
      transition: all 0.5s ease-in-out;
      display: block;
      position: absolute;
      width: 30px;
      height: 3px;

      border-radius: 5px;
    }
    .span:not(.open) {
      background-color: #fff;
    }
    .insta,
    .fb {
      height: 20%;
     
      width: auto;
      
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .insta svg,
    .fb svg {
      
      height: 6vh;
      width: 6vh;
    }
    .link {
      width: 100%;
      font-size: 5vh;
      text-align: center;
      margin: 0;  
      line-height: 100%;
      height: 20%;    
    }
    .container {
      

     
      display: flex;
      z-index: 6;
      position: fixed;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      
      top: 0;
      right: 0;
      bottom: 0;
      background-color: #00000050;
      backdrop-filter: blur(10px);
      width: 100vw;
      transform: translateX(${props => props.showBurger ? 0 : "100vw"});
      transition: ${props => props.showBurger ? "all 1s ease-in-out" : ""};

    }

    .link,
    .fb,
    .insta {
      display: flex;
      justify-content: center;
      align-items: center;
     
      
    }

    .link,
    .fb {
      position: relative;
    }
  }

  animation: headerwidth 1s 1 forwards;
  @keyframes headerwidth {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
  .active {
    color: white;
    text-decoration: underline;
    
  }
  .logo-link {
    display: block;
    height: 100%;
    width: auto;
    aspect-ratio: calc(1200/500);
  }

  .link {
    transition: 300ms ease;
    &:hover {
      transform: scale(150%);
      text-decoration: underline;
    }
  }
  .insta,
  .fb {
    transition: 300ms ease;
    &:hover {
      transform: scale(150%);
    }
  }
  .logo {
    height: 100%;
    width: 100%;
    background: no-repeat center center / contain url(${logo});
  }

  .link:not(.active) {
    color: white;
    text-decoration: none;
  }
`;

const HeaderStyledHome = styled(HeaderStyled)`
  position: absolute;
  z-index: 2;
  @media screen and (max-width: 700px) {
    .container {
      background-color: transparent;
      backdrop-filter: blur(3px);
    }
  }
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.295313) 28.13%,
    rgba(0, 0, 0, 0) 100%
  );
  box-shadow: none;
  animation: animateHeader 5s 1 cubic-bezier(0.85, 0.1, 0.9, 0.76); 
  @keyframes animateHeader {
    from {
      height: 0px;
    }
    50% {
      height: 0px;
    }
    100% {
      height: 97px;
    }
  }
  @keyframes animateLink {
    from {
      transform: scale(0);
    }
    50% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  .bg {
    background-color: transparent;
  }
  .link,
  .logo,
  .fb,
  .insta {
    animation: animateLink 4s 1 cubic-bezier(0.85, 0.1, 0.9, 0.76);
  }
  .logo {
    height: 100%;
    width: 100%;
    background: no-repeat center center / contain url(${logot});
  }
`;

export default Header;
