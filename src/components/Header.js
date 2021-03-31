import React from 'react'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import styled from 'styled-components'

function Header() {
  return (
    <Container>
      <Main>
        <AccessTimeIcon />
        <SearchContainer>
          <Search>
            <input type="text" placeholder="Search.." />
          </Search>
        </SearchContainer>
        <HelpOutlineIcon />
      </Main>
      <User>
        <Name>
          Onur Çoban
        </Name>
        <Avatar>
          <img src="https://www.w3schools.com/howto/img_avatar.png" alt="UserAvatar" />
        </Avatar>
      </User>
    </Container>
  )
}

export default Header


const Container = styled.div`
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  background: #350d36;
  color: #FFFFFF;
  box-shadow: 0 1px 0 0 rgb(255 255 255 / 10%);
  width:100%;
  z-index:10;
`

const Main = styled.div`
  display:flex;
  align-items:center;
  justify-content: flex-end;
  padding-left: 16px;
  padding-right: 16px;
  flex: 2;
`

const User = styled.div`
  display:flex;
  align-items:center;
  justify-content:flex-end;
  flex: 1;
  min-width: 128px;
  padding-right: 16px;
  padding-left: 32px;
  position: relative;
`

const SearchContainer = styled.div`
  position: relative;
  flex: 2;
  min-width: 0;
  max-width: 500px;
  display: flex;
`

const Search = styled.div`
    display: flex;
    align-items: center;
    flex: 5;
    height: 24px;
    min-width: 0;
    max-width: 500px;
    margin: 0 16px;
    border-radius: 6px;

    input{
      width:100%;
      border-radius: 6px;
      height:100%;
      padding:8px;
      background: rgb(67,30,68);
      box-shadow: inset 0 0 0 1px rgb(104 74 104);
      color: #FFFFFF;
      border:none;
      font-size: 13px;
      line-height: 1.38463;
      font-weight: 400;
    }

    input:focus{
      outline:none;
    }
`

const Name = styled.div`
  padding-right: 8px;
  font-size:14px;
`

const Avatar = styled.div`
  height:30px;
  width:30px;
img{
  border-radius: 4px;
  width:100%;
  object-fit:contain;
}
`