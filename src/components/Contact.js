import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";

import { useForm, ValidationError } from "@formspree/react";
import Loading from "./Loading";

const Contact = ({ contactState, loaded }) => {
  const [state, handleSubmit, reset] = useForm("moqrogpo");
  const [showSuccess, setShowSuccess] = useState(false);
  const [fade, setFade] = useState(true);
  const [inputs, setInputs] = useState({
    nameInput: "",
    emailInput: "",
    messageInput: "",
  });

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
      reset();
      for (let key in inputs) {
        inputs[key] = "";
      }
    }
  }, [state, reset, inputs]);

  useEffect(() => {
    if (showSuccess) {
      setFade(false);
      const timer = setTimeout(() => {
        setFade(true);
        const timer2 = setTimeout(() => {
          setShowSuccess(false);
          return clearTimeout(timer2);
        }, 3000);
        return clearTimeout(timer);
      }, 3000);
    }
  }, [showSuccess]);
  return (
    <>
      {loaded ? (
        <ContactStyled showSuccess={showSuccess} fade={fade}>
          <div className="left-container">
            <h2 className="title">{contactState.text}</h2>
            <img src={contactState.img} alt="img" className="img" />
          </div>

          <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
              <label className="label" htmlFor="name">
                Nom :
              </label>
              <input
                className="input"
                type="text"
                placeholder="Votre nom..."
                name="name"
                id="name"
                onChange={(e) =>
                  setInputs({ ...inputs, nameInput: e.target.value })
                }
                value={inputs.nameInput}
                required
              />
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
              />

              <label className="label" htmlFor="email">
                E-mail :
              </label>
              <input
                className="input"
                type="text"
                placeholder="Votre e-mail..."
                name="email"
                id="email"
                onChange={(e) =>
                  setInputs({ ...inputs, emailInput: e.target.value })
                }
                value={inputs.emailInput}
                required
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />

              <label className="label" htmlFor="message">
                Message :
              </label>
              <textarea
                className="input message"
                type="text"
                placeholder="Votre message..."
                name="message"
                id="message"
                onChange={(e) =>
                  setInputs({ ...inputs, messageInput: e.target.value })
                }
                value={inputs.messageInput}
                required
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />

              <button className="button">Envoyer</button>
            </form>
            {showSuccess && (
              <div className="success">
                <div className="success-div">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg"
                    version="1.1"
                    width="156"
                    height="156"
                    viewBox="0 0 256 256"
                  >
                    <g transform="translate(128 128) scale(0.5 0.5)">
                      <g
                        style={{
                          stroke: "none",
                          strokeWidth: 0,
                          strokeDasharray: "none",
                          strokeLinecap: "butt",
                          strokeLinejoin: "miter",
                          strokeMiterlimit: 10,
                          fill: "none",
                          fillRule: "nonzero",
                          opacity: 1,
                        }}
                        transform="translate(-255.15 -255.15000000000006) scale(5.67 5.67)"
                      >
                        <path
                          d="M 89.328 2.625 L 89.328 2.625 c -1.701 -2.859 -5.728 -3.151 -7.824 -0.568 L 46.532 45.173 c -0.856 1.055 -2.483 0.997 -3.262 -0.115 l -8.382 -11.97 c -2.852 -4.073 -8.789 -4.335 -11.989 -0.531 l 0 0 c -2.207 2.624 -2.374 6.403 -0.408 9.211 l 17.157 24.502 c 2.088 2.982 6.507 2.977 8.588 -0.011 l 4.925 -7.07 L 89.135 7.813 C 90.214 6.272 90.289 4.242 89.328 2.625 z"
                          style={{
                            stroke: "none",
                            strokeWidth: 1,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "#FFF",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform=" matrix(1 0 0 1 0 0) "
                          strokeLinecap="round"
                        />
                        <path
                          d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 6.072 0 11.967 1.19 17.518 3.538 c 2.034 0.861 2.986 3.208 2.125 5.242 c -0.859 2.035 -3.207 2.987 -5.242 2.126 C 54.842 8.978 49.996 8 45 8 C 24.598 8 8 24.598 8 45 c 0 20.402 16.598 37 37 37 c 20.402 0 37 -16.598 37 -37 c 0 -3.248 -0.42 -6.469 -1.249 -9.573 c -0.57 -2.134 0.698 -4.327 2.832 -4.897 c 2.133 -0.571 4.326 0.698 4.896 2.833 C 89.488 37.14 90 41.055 90 45 C 90 69.813 69.813 90 45 90 z"
                          style={{
                            stroke: "none",
                            strokeWidth: 1,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "#FFF",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform=" matrix(1 0 0 1 0 0) "
                          strokeLinecap="round"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <p className="success-p">
                  Message envoyé, merci de nous avoir contacté
                </p>
              </div>
            )}
          </div>
        </ContactStyled>
      ) : (
        <Loading />
      )}
    </>
  );
};

const ContactStyled = styled.main`
  display: flex;
  height: calc(100vh - 15%);
  
  
  @media screen and (min-width: 1300px) {
    overflow-x: hidden;
    justify-content: center;
    align-items: flex-start;

  }
  @media screen and (max-width: 1300px) {
    flex-direction: column;
    overflow: scroll;
    padding-top: 10px;

    .left-container {
      display: none;
    }
    .form-container {
      width: 100%;
      display: flex;
      margin-bottom: 20px;

      height: calc(100vh - 20%);

      align-items: stretch;
      justify-content: center;
    }
    .form {
      max-width: 585.99px;
    }
  }
  @media screen and (min-width: 1300px) {
    
    .form-container {
      width: 586px;
      position: relative;
      margin: 50px 50px 50px 50px;
    }
  }
  @media screen and (max-width: 700px) {
    .form-container {
      width: 100vw;
      
    }
    .form {
      width: 100vw;
    }
  }

  @media screen and (max-width: 600px) {
    .input {
      margin: 0 auto;
    }
    .label {
      margin-left: 8%;
    }
  }
  @media screen and (min-width: 600px) {
    .input,
  .label {
    margin-left: 46px;
  }
  }


  .svg {
    color: white;
  }
  .success-div {
    width: 100%;
    height: 50%;
    background-color: #00b386;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .message {
    padding-top: 15px;
    height: 250px;
  }
  .button {
    background-color: white;
    color: #47555e;
    height: 40px;
    width: 40%;
    margin: 20px 0;
    margin-left: 46px;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;
  }
  .form {
    background-color: #47555e;
    z-index: ${(props) => (props.showSuccess ? 1 : 5)};
    position: relative;
  }
  .form-container {
    min-height: 718px;
  }
  .form,
  .success {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  .success {
    background: #fff;
    color: black;
    justify-content: flex-start;
    align-items: center;
    border: #47555e 1px solid;
    position: absolute;
    z-index: ${(props) => (props.showSuccess ? 5 : 1)};
    top: 0;
    opacity: ${(props) => (props.fade ? 0 : 1)};
    transition: opacity 1s;
  }
  .success-p {
    padding-top: 20px;
    width: 90%;
    font-size: 22px;
    color: #47555e;
    font-weight: 500;
  }
  .img,
  .form,
  .success {
    box-shadow: 4px 4px 4px 0px #00000060;
  }
  
  .label {
    color: white;
    margin-top: 52px;
    margin-bottom: 10px;
  }
  .input {
    width: 85%;
    min-height: 68px;
    border-radius: 10px;
    font-size: 22px;
    padding-left: 10px;
    &::placeholder {
      font-size: 22px;
    }
  }
  .img {
    width: 620px;
  }
  .title {
    font-size: 35px;
    font-weight: 400;
    margin-bottom: 110px;
    margin-top: 130px;
    width: 80%;
    text-decoration: underline;
  }
  .left-container {
    width: 670px;
    padding-left: 50px;
  }
`;

export default Contact;
