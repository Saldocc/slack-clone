import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import Details from './Details'
import db from '../firebase'
import firebase from 'firebase'
import { useParams } from 'react-router-dom'

function Chat({ user }) {

  const messagesEndRef = useRef(null)

  let { channelId } = useParams();
  const [users, setUsers] = useState([])
  const [channel, setChannel] = useState()
  const [messages, setMessages] = useState([])
  const [detailShow, setDetailShow] = useState(false)

  const getMessages = () => {
    db.collection('rooms')
      .doc(channelId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        let messages = snapshot.docs.map((doc) => doc.data())
        setMessages(messages)
        setUsers([])
      })
  }

  const getChannel = () => {
    db.collection('rooms')
      .doc(channelId)
      .onSnapshot((snapshot) => {
        setChannel(snapshot.data())
      })
  }

  const sendMessage = (text) => {
    let remText = text.replace(/ /g, "");
    if (channelId && remText.length) {
      let messagePack = {
        text: text,
        user: user.name,
        userMail: user.email,
        userImage: user.photo,
        timestamp: firebase.firestore.Timestamp.now()
      }
      db.collection("rooms").doc(channelId).collection("messages").add(messagePack);
      scrollToBottom()
    }
  }

  const scrollToBottom = () => {
    setTimeout(function () {
      messagesEndRef.current.scrollTo(0, messagesEndRef.current.scrollHeight);
    }, 100);
  }

  const detailToggle = () => {
    setDetailShow(!detailShow)
    chatMembersFind()
  }

  const chatMembers = (data, key) => {
    return [
      ...new Map(data.map(item => [key(item), item])).values()
    ]
  }

  const chatMembersFind = () => {
    let obj = JSON.stringify(chatMembers(messages, message => message.userImage))

    try {
      setUsers(JSON.parse(obj));
    } catch (ex) {
      console.error(ex);
    }
  }

  useEffect(() => {
    getChannel()
    getMessages()
    scrollToBottom()
  }, [channelId])

  return (
    <Container detailShow={detailShow}>
      <ChatContainer>
        <ChatHeader>
          <Channel>
            <ChannelName>
              # {channel && channel.name}
            </ChannelName>
            <ChannelDescription>
              {(channel && channel.description) ? channel.description : <AddTopic>Add Description</AddTopic>}
            </ChannelDescription>
          </Channel>
          <ChannelDetails onClick={detailToggle}>
            <InfoOutlinedIcon />
          </ChannelDetails>
        </ChatHeader>
        <ChatMessagesContainer ref={messagesEndRef}>
          <ChatMessages>
            {
              messages.length > 0 && messages.map((data, index) => (
                <ChatMessage key={index}
                  text={data.text}
                  name={data.user}
                  image={data.userImage}
                  timestamp={data.timestamp}
                />
              ))
            }
          </ChatMessages>
        </ChatMessagesContainer>
        <ChatInput sendMessage={sendMessage} />
      </ChatContainer>
      {
        detailShow && < Details channel={channel} users={users} />
      }
    </Container>
  )
}

export default Chat


const Container = styled.div`
 display:grid;
 grid-template-columns:  ${props => props.detailShow ? "auto 400px" : "auto"}
`

const ChatContainer = styled.div`
  display:grid;
  grid-template-rows: 64px auto min-content;
  min-height:0;
  border-right: 1px solid ${props => props.theme.chatBorderColor};
`

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content:space-between;
  padding: 0 20px;
  border-bottom: 1px solid ${props => props.theme.chatBorderColor};
`

const Channel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const ChannelName = styled.div`
  font-weight: 900;
  color:${props => props.theme.chatHeaderDarkFontColor};
`

const ChannelDescription = styled.div`
  font-size: 13px;
  color:${props => props.theme.chatHeaderLightFontColor};
`

const AddTopic = styled.div`
  cursor: pointer;
  font-size: 13px;
  color:${props => props.theme.chatHeaderLightFontColor};
`

const ChannelDetails = styled.div`
  display: flex;
  align-items: center;
  color:${props => props.theme.chatHeaderLightFontColor};
  font-weight:600;
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
`

const ChatMessagesContainer = styled.div`
  display:flex;
  overflow-y: auto;
  scroll-behavior: smooth;


::-webkit-scrollbar {
    width: 0.85em;
}
 
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}
 
::-webkit-scrollbar-thumb {
  background-color: #B6B5B5;
  border-radius:5px;
}
`

const ChatMessages = styled.div`
  margin-top:auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; 
  width: 100%;
  padding-bottom:10px;
`








