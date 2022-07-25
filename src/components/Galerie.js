import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";

const Galerie = ({ listImg, catState, categories, setCatState, loaded }) => {
  const [finalList, setFinalList] = useState([]);
  const listRef = useRef([]);
  const [listIncrement, setListIncrement] = useState(1);

  const imgContainer = useRef();
  const [maxList, setMaxList] = useState(0);
  const leftButton = useRef();
  const rightButton = useRef();
  const [disableBtn, setDisableBtn] = useState(false);

  const [showCat, setShowCat] = useState(false)

  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState()
  const [scrollLeft, setScrollLeft] = useState()
  
  const imgRef = useRef()
  const [imgRefHeight, setImgRefHeight] = useState(false)

  const handleImg = () => {
    setImgRefHeight(imgRef.current.clientHeight)
  }
  
  useEffect(() => {
    handleImg()
    window.addEventListener('resize', handleImg)
  }, [imgContainer])

  useLayoutEffect(() => {
    return () => {
      window.removeEventListener('resize', handleImg);
    }
  }, [])
  
  useEffect(() => {
    if (catState !== {} && listImg !== []) {
      let final = [];
      let check = false;
      const list = Object.entries(catState);

      list.forEach((el) => {
        if (el[1]) {
          check = true;
          listImg.forEach((img) => {
            for (let cat in img.categories) {
              if (cat === el[0]) {
                final.push(...img.imagesUrl);
              }
            }
          });
        }
      });
      if (!check) {
        for (let urls in listImg) {
          final.push(...listImg[urls].imagesUrl);
        }
      }
      setFinalList(final);
      setMaxList(final.length);
      setListIncrement(1);
    }
  }, [catState, listImg]);

  useEffect(() => {
    if (loaded) {
      imgContainer.current.scroll(0, 0);
    }
  }, [maxList, loaded]);

  
  const scrollFunct = (numb, listRef, imgContainer, listIncrement ) => {
    if (numb === 1) {
      //Monter
      if (listIncrement === 1) {
        imgContainer.current.scrollBy(
          listRef.current[listIncrement - 1].width - 135,
          0
        );
      } else {
        imgContainer.current.scrollBy(
          listRef.current[listIncrement - 1].width + 15,
          0
        );
      }
      setListIncrement(listIncrement + 1);
    } else {
      if (listIncrement === maxList) {
        imgContainer.current.scrollBy(
          -listRef.current[listIncrement - 1].width + 135,
          0
        );
      } else {
        imgContainer.current.scrollBy(
          -listRef.current[listIncrement - 1].width - 15,
          0
        );
      }

      setListIncrement(listIncrement - 1);
    }
  };
  const handleSlider = (direction, listRef, imgContainer, listIncrement) => {
    if (!disableBtn) {
      setDisableBtn(true);

      setTimeout(() => {
        setDisableBtn(false);
      }, 700);

      if (direction === 0) {
        scrollFunct(0, listRef, imgContainer, listIncrement);
      } else {
        scrollFunct(1, listRef, imgContainer, listIncrement);
      }
    }
  };
  
  
  const handleMousedown = (e , imgContainer) => {
    console.log(imgContainer.current.scrollTop)
    const dimensions = imgContainer.current.getBoundingClientRect()
    setIsDown(true)
    setStartX(e.pageY - dimensions.top)
    setScrollLeft(imgContainer.current.scrollTop)

  }
  const handleMousemove = (e, imgContainer) => {
    if (!isDown) return ;
    const dimensions = imgContainer.current.getBoundingClientRect()
    e.preventDefault()
    const x = e.pageY - dimensions.top
    const walk = (x - startX) * 2;
    imgContainer.current.scrollTop = scrollLeft - walk
  }
  return (
    <>
      {loaded && categories && finalList ? (
        <GalerieStyled listIncrement={listIncrement} maxRef={maxList} showCat={showCat} imgRefHeight={imgRefHeight}>
          <div className="container">
            <div className="sidebar">
              <button type='button' 
              onClick={() => setShowCat(!showCat)}
              className='arrow-btn'><span className="arrow"></span></button>
              <h2 className="categories">Catégories</h2>

              <ul className="list">
                {categories.map((cat, i = 0) => {
                  return (
                    <li key={i}>
                      <button
                        className={
                          catState[cat] ? "categorie scale" : "categorie"
                        }
                        type="button"
                        key={i}
                        onClick={() => {
                          setCatState({ ...catState, [cat]: !catState[cat] });
                        }}
                      >
                        {cat}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="img-container"  ref={imgRef}>
              {<button
                type="button"
                className="left-button"
                ref={leftButton}
                onClick={() => handleSlider(0, listRef, imgContainer, listIncrement)}
              >
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
              </button>}
              <div className="scroll-img"  ref={imgContainer}  onMouseDown={e => handleMousedown(e, imgContainer)} onMouseUp={() => setIsDown(false)} onMouseMove={(e) => handleMousemove(e, imgContainer)} onMouseLeave={() => setIsDown(false)}>
                {finalList.map((img, i = 0) => {
                  return (
                    <div className="child" key={i}>
                      <div className="child-container" key={i}>
                        <img
                          className="child-img"
                          src={img}
                          alt="img"
                          key={i}
                          ref={(el) => (listRef.current[i] = el)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              {<button
                type="button"
                className="right-button"
                ref={rightButton}
                onClick={() => {
                  handleSlider(1, listRef, imgContainer, listIncrement);
                }}
              >
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </button>}
            </div>
          </div>
        </GalerieStyled>
      ) : (
        <Loading />
      )}
    </>
  );
};                                                          

const GalerieStyled = styled.main`
 
  @media screen and (max-width: 1000px) {
    
    .child-img, .child-container, .img-container {
      max-width: calc(100vw - 70px);
    }
    .left-button , .right-button {
      display: none;
    }
    .sidebar {
      transition: all 1s ease;
      width: 23px;
      width: ${props => props.showCat ? '400px' : '23px'};
      overflow: hidden;
      position: absolute;
      z-index: 2;
      height: ${props => props.imgRef !== false ? `${props.imgRefHeight}px` : '100%' };
      max-width: 400px;
    }
    .list {
      overflow: hidden;
    }
    .arrow , .arrow-btn {
     
    }
    .arrow {
      transform: scale(200%);
      position: relative;
      right: 20px;
      top: -40vh;
    }
    .arrow-btn {
      position: absolute;
      background-color: transparent;
      cursor: pointer;
      transform: rotate(${props => props.showCat ? "180deg" : 0}) scale(200%);
      padding: ${props => props.imgRef !== false ? `${props.imgRefHeight}px` : '100%' } 30px;
      top: ${props => props.showCat ? "-119vh" : "40vh"} ;
      right: ${props => props.showCat ? "90%" : ""};
      z-index: 2;
    }
    .arrow::before {
      animation: arrow1 2s linear infinite;
    }
    .arrow::after {
      animation: arrow2 2s linear infinite;
    }
    @keyframes arrow1 {
      from {
        transform: translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      70% {
        opacity: 1;
      }
      to {
        opacity: 0;
        transform: translateX(27px);
      }
    }
    @keyframes arrow2 {
      from {
        opacity: 0;
        transform: rotate(225deg) translateX(0);
      }
      10% {
        opacity: 1;
      }
      70% {
        opacity: 1;
      }
      to {
        opacity: 0;
        transform: rotate(225deg) translate(-20px, 20px);
      }
    }
    .arrow::before {
      content:'';
      display: block;
      background-color: white;
      height: 2px;
      width: 12px;
      position: relative;
      top: 5.2px;
      right: 2px;
      /* left: 20px; */
      background: white;
    }
    .arrow::after {
      content: '';
      position: relative;
      display: block;
      border: 2px solid white;
      border-top: none;
      border-right: none;
      height: 7px;
      width: 7px;
      background: transparent;
      /* top: calc(50vh - 60px); */
      /* left: 22px; */
      transform: rotate(225deg);
    }
    
    .img-container {
      width: 90vw;
    }
    .categories {
      
      font-size: 5vh;
      
    }
    
    
  }
  @media screen and (min-width: 1000px) {
    .child {
      margin-right: 20px;
    }
    .img-container {
      width: 100%;
      margin: 0 1vw 0 1vw;
      
    }
    .sidebar {
      width: 100%;
      height: 100%;
      max-width: 240px;
    }
    
    .categories {
      font-size: 3vw;
    }
    .list {
      overflow: auto;
    }
    .child-img, .child-container, .img-container {
      max-width: calc(100vw - 370px);
    }
  }
  @media screen and (min-width: 1300px) {
    .categories {
      font-size: 1.5vw;
    }
    .scroll-img {
      overflow-y: hidden;
      cursor: auto;
      scroll-behavior: smooth;
    }
  }
  @media screen and (max-width: 1300px) {
    .left-button, .right-button {
      display: none;
    }
    .scroll-img {
      flex-direction: column;
      cursor: grab;
    }

  }
  @media screen and (max-width: 1750px) {
    .img-container {
      width: 100%;
      margin: 0 50px 0 40px;
    }
    
    
    
    .child {
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 801px) {
    .left-button, .right-button {
      display: none;
    }
  }
  @media screen and (min-width: 1800px) {
    .child {
      margin-right: 20px;
    }
    .img-container {
      max-width: calc(100vw - 500px); 
    }
    .sidebar {
      max-width: 400px;
    }
  }
  @media screen and (min-width: 2700px) {
    .child {
      margin-right: 20px;
    }
    .sidebar {
      max-width: 400px; 
    }
    .img-container {
      max-width: calc(100vw - 500px); 
    }
  }
  @media screen and (min-width: 3000px) {
    .child {
      margin-right: 20px;
    }
    .img-container {
      max-width: calc(100vw - 550px); 
    }
    .sidebar {
      max-width: 400px;
    }
  }
  
  height: calc(100vh - 20%);
  
  .img-container {
    overflow: hidden;
  }
  .scale {
    transform: scale(150%);
  }
  .right-button,
  .left-button {
    position: absolute;
    z-index: 1;
    color: white;
    height: 100%;
    cursor: pointer;
  }
  .right-button svg,
  .left-button svg {
    height: 50px;
    transition: 300ms ease;
    opacity: 60%;
    &:hover {
      transform: scale(200%);
      opacity: 90%;
    }
  }
  .left-button {
    left: 50px;
    display: ${(props) => (props.listIncrement === 1 ? "none" : "")};
  }
  .right-button {
    right: 50px;
    display: ${(props) => (props.listIncrement === props.maxRef ? "none" : "")};
  }
  .sidebar,
  .child-img
  {
    box-shadow: 4px 4px 4px 0px #00000060;
  }
  .child-container, .child {
    background-color: transparent;
  }
  .child {
    position: relative;
    scrollbar-width: none;
    height: 100%;
    width: auto;
  }
  .child-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    max-width: 100vw;
    display: flex;
    justify-content: center;
  }
  .scroll-img::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0;
    display: none;
    transform: translate3d(0,0,0);
    
  }
  .child-img {
    
    max-width: 100vw;
    height: 100%;
    width: auto;
    object-fit: contain;
    display: block;
    position: relative;
    transition: 300ms ease;
    overflow: hidden;
    &:hover {
      transform: scale(110%);
      overflow: hidden;
    }
  }
  .scroll-img {
    height: 100%;
    display: flex;
    transform: translate3d(0, 0, 0);  //fix lags on scroll
    overflow-x: scroll;
    
    
    
    position: relative;
    
    width: 100%;
  }
  .img-container {
    float: left;
    height: 100%;
    display: flex;
    
    position: relative;
    padding-right: 5px;
  }

  .container {
    position: relative;
    padding: 20px 0 20px 20px;
    height: calc(100vh - 20%);
   
  }
  .sidebar {
    float: left;
    background-color: #47555e;
    
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    
    margin-right: 20px;
  }
  .categories {
    display: flex;
    flex-wrap: nowrap;
    
    text-decoration: underline;
    margin: 0 0 0 24px;
    padding-top: 6vh;
  }
  .categorie {
    font-size: 3vh;
    margin-top: 2vh;
    margin-left: 50px;
    transition: 300ms ease;
    &:hover {
      text-decoration: underline;
      transform: scale(150%);
    }
  }
  .list li {
    
    line-height: 3%;
  }
  .categories,
  .categorie {
    color: white;
  }

  .list {
    
    list-style: none;
    padding: 0;
    margin: 4vh 0;
  }
  button {
    border: none;
    background-color: transparent;
  }
`;
export default Galerie;
