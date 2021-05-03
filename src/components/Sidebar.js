import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { sidebarItems } from '../data/SidebarData'
import db from '../firebase';
import firebase from 'firebase'
import Modal from "./Modal"


function Sidebar({ user, rooms }) {

  const history = useHistory();
  let location = useLocation();

  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [addModal, setAddModal] = useState(false);


  const addChannel = (name, description) => {
    db.collection('rooms').add({
      name: name,
      description: description,
      creator: user.name,
      creatorMail: user.email,
      creatorImage: user.photo,
      timestamp: firebase.firestore.Timestamp.now()
    })
  }


  const deleteChannel = (id) => {
    if (window.confirm('You want to delette ?')) {
      db.collection("rooms").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
        history.push(`/room`)
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }
  }

  const goToChannel = (id) => {
    if (id) {
      history.push(`/room/${id}`)
    }
  }

  const showModal = () => {
    setAddModal(true)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (channelName) {
      addChannel(channelName, description)
      setAddModal(false);
      setChannelName("");
      setDescription("");
    } else {
      alert("Inputs cannot be empty");
      return false;
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
          <AddIcon onClick={showModal} />
        </NewChannel>
        <ChannelList>
          {
            rooms.map((item) => (
              <Channel className={`${item.id === location.pathname.split("/")[2] ? 'active' : ''}`} key={item.id} onClick={() => goToChannel(item.id)}>
                # {item.name}
                <DeleteOutlinedIcon onClick={() => deleteChannel(item.id)} />
              </Channel>
            ))
          }
        </ChannelList>
      </UserChannels>
      <Modal title={"Create a channel"} show={addModal} handleClose={() => {
        setAddModal(false)
      }}>
        <CreateChannelModal>
          <span className="description-text">
            Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.
          </span>
          <br />
          <form onSubmit={(e) => { handleSubmit(e) }}>
            <div className="form-content">
              <label>
                Name
              <input className="form-channel" placeholder="e.g. plan-budget" type="text" name="name" value={channelName} onChange={(e) => {
                  setChannelName(e.target.value);
                }} />
                <b>#</b>
              </label>
              <label>
                Description <span>(optinal)</span>
                <textarea type="text" name="description" value={description} onChange={(e) => {
                  setDescription(e.target.value)
                }} />
                <small>What’s this channel about?</small>
              </label>
            </div>
            <div className="form-footer">
              <div className="learn-more-link">
                <InfoOutlinedIcon />
                <a href="#">Learn more</a>
              </div>
              <button type="submit" value="Submit" disabled={(20 >= channelName.length && channelName.length >= 5) ? false : true}>
                Create
          </button>
            </div>
          </form>
        </CreateChannelModal>
      </Modal>
    </Container >
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
  .active{
    color: #fff;
    background:#1164A3;
    :hover{
      background: #1164A3;
    }
  }
`
const Channel = styled.div`
  color: ${props => props.theme.sidebarMenuItemFontColor};
  display: flex;
  align-items:center;
  justify-content:space-between;
  padding: 0 16px;
  height: 28px;
  line-height: 28px;
  width: 100%;
  cursor: pointer;
  user-select: none;
  svg{
        opacity:0;
      }
  :hover{
    background: ${props => props.theme.sidebarMenuItemHoverColor};
    svg{
      opacity:1;
    }
  }
`

const CreateChannelModal = styled.div`
display: flex;
flex-direction:column;
  .description-text{
    color:#685b5c;
  }
  label{
    position: relative;

    .form-channel{
      padding-left:36px;
    }

    span{
      display: inline-block;
      margin-left: 8px;
      color: #616061;
      font-weight:400;
    }

    b{
      position:absolute;
      top: 38px;
      left: 15px;
      font-size: 18px;
      color:#616061;
    }
  }
`
