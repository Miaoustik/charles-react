import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import Footer from "./Footer";

const Tarifs = ({ tarif, loaded, tarifImg }) => {
  return (
    <TarifsStyled>
      <div className="main-container">
        <div className="tarif-container">
          <h2 className="title">Tarifs et prestations: </h2>
          <ul className="list">
            {loaded && tarif ? (
              tarif.map((tarif, i, j) => {
                return (
                  <li key={i} className="tarif-li">
                    <h3 key={i} className="tarif">
                      {tarif[0]}
                    </h3>
                    <p key={j} className="tarif">
                      {tarif[1]}
                    </p>
                  </li>
                );
              })
            ) : (
              <p>Chargement...</p>
            )}
          </ul>
        </div>
        <div className="right-container">
          <img src={tarifImg} alt="camera" className="img" />
          <Link to="/contact" className="button">
            Contactez Moi
          </Link>
        </div>
      </div>
      <Footer />
    </TarifsStyled>
  );
};

const TarifsStyled = styled.main`
  height: calc(100vh - 20%);
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }

  .main-container {
    overflow: auto;
    overflow-x: hidden;
    
    /* overflow-y: scroll; */
  box-sizing: content-box;
  display: flex;
    flex-wrap: nowrap;
  padding: 30px 0;
  padding-bottom: 10px;
  justify-content: stretch;
  }
  

  @media screen and (max-width: 1000px) {
    .main-container {
      flex-direction: column;
    justify-content: stretch;
    }
    
    .button {
      margin-left: 100px;
    }
    .img {
      display: none;
    }
    .right-container {
      margin-bottom: 100px;
    }
    .tarif-container {
      width: calc(100vw - 150px);
    }
  }

  @media screen and (min-width: 1000px) {
    .main-container {
      justify-content: center;

    }
    .button {
      margin: 90px 0 0 20px;
    }
    .button {
      margin-bottom: 100px;
    }
    .tarif-container {
      min-width: 700px;
      margin-right: 5%;
    }
    .list {
      max-width: 550px;
      padding-bottom: 30px;
    }
    .right-container {
      width: 100%;
    }
  }
  @media screen and (min-width: 700px) {
    .list {
      padding-left: 50px;
    }
    .list,
    .title {
      margin-left: 100px;
    }
    .tarif-li:last-child {
      padding-bottom: 30px;
    }
  }
  @media screen and (max-width: 700px) {
    .tarif-container {
      width: 100vw;
    }
    .title,
    .list {
      padding: 0 6vw 0 3vw;
    }
    .button {
      margin-left: 3vw;
    }
  }

  .right-container {
    width: 100%;
    max-width: 850px;
  }
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: white;
    background-color: black;
    width: 215px;
    height: 72px;
    text-transform: uppercase;
  }
  .img {
    width: 90%;
    margin: 100px 0 0 20px;
  }
  .img,
  .button {
    box-shadow: 4px 4px 4px 0px #00000060;
  }
  .tarif-container {
    padding-bottom: 30px;
    height: auto;
  }
  .tarif-li {
    margin-bottom: 30px;
  }
  .title {
    font-weight: 700;
    font-size: 25px;
    line-height: 1.68;
  }
  .list {
    list-style: none;
  }

  .tarif {
    font-weight: 400;
    font-size: 19px;
    margin: 0;
  }
`;

export default Tarifs;
