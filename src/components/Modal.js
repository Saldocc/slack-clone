import React, { useEffect } from 'react'
import styled from 'styled-components'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

function Modal({ handleClose, show, children, title }) {

  const showHideClassName = show ? "display-block" : "display-none";


  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        handleClose()
      }
    }
    window.addEventListener('keydown', close)
  }, [])

  return (
    <Container className={showHideClassName}>
      <Main>
        <ModalHeader>
          <h2>{title}</h2>
          <button onClick={handleClose} >
            <CloseRoundedIcon />
          </button>
        </ModalHeader>
        <ModalMain>
          {children}
        </ModalMain>
      </Main>
    </Container>
  )
}

export default Modal


const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index:10;
`

const Main = styled.div`
  position:fixed; 
  border-radius:6px;
  background: white;
  color:black;
  height: auto;
  max-width: 520px;
  width: 100%;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  box-shadow: 0 0 0 1px rgb(36 35 36 / 13%), 0 18px 48px 0 rgb(0 0 0 / 35%);
`

const ModalHeader = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  border-radius:6px 6px 0 0;
  padding: 20px 28px;
  color:#1d1c1d;
  h2{
    font-size: 28px;
    line-height: 1.2143;
    font-weight:900;
  }
  button{
    background:transparent;
    align-items: center;
    border-radius: 4px;
    display: inline-flex;
    justify-content: center;
    border:none;
    height:36px;
    width:36px;
    cursor:pointer;

    &:hover{
      background: #f6f6f6;
    }

    svg{
      width: 20px;
      height: 20px;
    }
  }
`

const ModalMain = styled.div`
  padding: 0 28px;
`
