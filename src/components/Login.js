import React from 'react'
import styled from 'styled-components'
import { auth, provider } from '../firebase'

function Login(props) {

  const signIn = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          photo: result.user.photoURL,
          email: result.user.email
        }
        localStorage.setItem('user', JSON.stringify(newUser))
        props.setUser(newUser)
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <Container>
      <Content>
        <SlackLogo>
          <img src="/images/logo.png" alt="logo" />
        </SlackLogo>
        <SignInButton onClick={() => signIn()}>
          Sing in with Google
        </SignInButton>
      </Content>
    </Container>
  )
}

export default Login



const Container = styled.div`
  width:100%;
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#f8f9fa;
`

const Content = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  background:#fff;
  padding:100px;
  border-radius:10px;
  box-shadow:  9px 9px 20px #d5d5d5, 9px -9px 20px #ebebeb;
`

const SlackLogo = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;

  img{
    height:150px;
  }
`

const SignInButton = styled.button`
  margin-top:70px;
  background: #007a5a;
  color: #fff;
  border-radius: 4px;
  transition: opacity .2s,background-color .2s,color .2s;
  cursor: pointer;
  border:none;
  padding:12px 24px;
  font-size:18px;
  &:hover{
    background: #148567;
  }
  &:focus{
    outline: none;
  }
`