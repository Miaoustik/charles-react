import React from 'react'
import styled from 'styled-components/macro'

const Loading = () => {
    
    let spans = new Array(20).fill(0)
    
    
  return (
    <LoadingStyled>
        <div className='loader'>
            {spans.map((_span, i = 1) => {
                const style = {"--i": i}
                return (
                    <span style={style} key={i}></span>
                )
            })}        
        </div>
    </LoadingStyled>
  )
}

const LoadingStyled = styled.section`
    display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #042104;
        animation: loading 10s linear infinite;
        
    
    @keyframes loading {
        from {
            filter: hue-rotate(0deg)
        }
        to {
            filter: hue-rotate(360deg);
        }
    }
    .loader {
        position: relative;
        width: 120px;
        height: 120px;
    
    }
    span {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: rotate(calc(18deg * var(--i)));
    }
    span::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #00ff0a;
        box-shadow: 0 0 10px #00ff0a,
            0 0 20px #00ff0a,
            0 0 40px #00ff0a,
            0 0 60px #00ff0a,
            0 0 80px #00ff0a,
            0 0 100px #00ff0a;
        animation: loading2 2s linear infinite;
        animation-delay: calc(0.1s * var(--i));
    }
    @keyframes loading2 {
        from {
            transform: scale(1);
        }
        80%, to {
            transform: scale(0);
        }
    }
`

export default Loading