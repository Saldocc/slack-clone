import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import AddIcon from '@material-ui/icons/Add';
import { sidebarItems } from '../data/SidebarData'
import db from '../firebase';


function Sidebar(props) {

  const history = useHistory();

  const addChannel = () => {
    const promptName = prompt("Enter channel name")
    if (promptName) {
      db.collection('rooms').add({
        name: promptName
      })
    }
  }

  const goToChannel = (id) => {
    if (id) {
      history.push(`/room/${id}`)
    }
  }


  return (
    <Container>
      <WorkspaceContainer>
        <Name>
          Saldoc Company
        </Name>
        <NewMessage>
          <ChatBubbleOutlineIcon />
        </NewMessage>
      </WorkspaceContainer>
      <MainChannels>
        {
          sidebarItems.map((item, index) => (
            <MainChannelItem key={index}>
              {item.icon}
              {item.text}
            </MainChannelItem>
          ))
        }
      </MainChannels>
      <UserChannels>
        <NewChannel>
          Channels
          <AddIcon onClick={addChannel} />
        </NewChannel>
        <ChannelList>
          {
            props.rooms.map((item) => (
              <Channel key={item.id} onClick={() => goToChannel(item.id)}>
                # {item.name}
              </Channel>
            ))
          }
        </ChannelList>

      </UserChannels>

    </Container>
  )
}

export default Sidebar



const Container = styled.div`
  background: ${props => props.theme.sidebarBgColor};
  color: ${props => props.theme.sidebarFontColor};
`

const WorkspaceContainer = styled.div`
 display:flex;
 align-items: center;
 justify-content:space-between;
 position: relative;
 height: 64px;
 border-bottom: 1px solid ${props => props.theme.sidebarBorderColor};
 padding:0 19px;
`

const Name = styled.div`
`

const NewMessage = styled.div`
    height: 36px;
    width: 36px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.sidebarNewMessageBgColor};
    color: ${props => props.theme.sidebarNewMessageColor};
    fill: ${props => props.theme.sidebarNewMessageColor};
    cursor: pointer;
    svg{
      height: 16px;
    }
`

const MainChannels = styled.div`
    margin-top:16px;
`

const MainChannelItem = styled.div`
    color: ${props => props.theme.sidebarMenuItemFontColor};
    padding: 0 16px;
    height: 28px;
    line-height: 28px;
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
    user-select: none;
    svg{
      font-size: 18px;
      width: 26px;
      margin-right:4px;
    }
    :hover{
      background: ${props => props.theme.sidebarMenuItemHoverColor};
    }
`

const UserChannels = styled.div`
  margin-top:16px;
`
const NewChannel = styled.div`
  color: ${props => props.theme.sidebarMenuItemFontColor};
  padding: 0 16px;
  height: 28px;
  display: flex;
  justify-content:space-between;
  align-items:center;
  svg{
    cursor:pointer;
  }
`
const ChannelList = styled.div`
`
const Channel = styled.div`
  color: ${props => props.theme.sidebarMenuItemFontColor};
  padding: 0 16px;
  height: 28px;
  line-height: 28px;
  width: 100%;
  cursor: pointer;
  user-select: none;
    :hover{
      background: ${props => props.theme.sidebarMenuItemHoverColor};
    }
`
