import React from 'react'
import styled from 'styled-components/macro'

const Footer = () => {
  return (
    <FooterStyled>
        <span className='span'>&copy; Charles Cantin 2022</span>
    </FooterStyled>
  )
}

const FooterStyled = styled.footer`
    background-color: #47555e;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    width: 100vw;
    min-width: 100vw;
    .span {
        color: white;
        font-size: 19px;
    }
    

`

export default Footer