import React from 'react'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import styled from 'styled-components'

function Header(props) {

  return (
    <Container>
      <ToggleSwitch>
        <input onChange={props.toggleTheme} type="checkbox" id="switch" />
        <label for="switch">Toggle</label>
      </ToggleSwitch>
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
          {props.user.name}
        </Name>
        <Avatar onClick={props.signOut}>
          <img src={props.user.photo ? props.user.photo : "https://www.w3schools.com/howto/img_avatar.png"} />
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
  background: ${props => props.theme.headerBgColor};
  color: ${props => props.theme.headerFontColor};
  box-shadow: ${props => props.theme.headerContainerBShadow};
  width:100%;
  z-index:10;
`

const ToggleSwitch = styled.div`

display:flex;
padding-left:16px;

input[type=checkbox]{
	height: 0;
	width: 0;
	visibility: hidden;
}

label {
	cursor: pointer;
	text-indent: -9999px;
	width: 40px;
	height: 22px;
	background: grey;
	display: block;
	border-radius: 100px;
	position: relative;
}

label:after {
	content: '';
	position: absolute;
	top: 3px;
	left: 3px;
	width: 16px;
	height: 16px;
	background: #fff;
	border-radius: 90px;
	transition: 0.3s;
}

input:checked + label {
	background: #431e44;
}

input:checked + label:after {
	left: calc(100% - 5px);
	transform: translateX(-100%);
}

label:active:after {
	width: 20px;
}

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
      background: ${props => props.theme.searchInputBgColor};
      box-shadow: ${props => props.theme.searchInputBShadow};
      color: ${props => props.theme.searchInputFontColor};
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
  cursor: pointer;
img{
  border-radius: 4px;
  width:100%;
  object-fit:contain;
}
`