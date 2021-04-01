import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import db from '../firebase'
import firebase from 'firebase'
import { useParams } from 'react-router-dom'

function Chat({ user }) {

  const messagesEndRef = useRef(null)

  let { channelId } = useParams();
  const [channel, setChannel] = useState()
  const [messages, setMessages] = useState([])

  const getMessages = () => {
    db.collection('rooms')
      .doc(channelId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        let messages = snapshot.docs.map((doc) => doc.data())
        setMessages(messages)
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
    if (channelId) {
      let messagePack = {
        text: text,
        user: user.name,
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

  useEffect(() => {
    getChannel()
    getMessages()
    scrollToBottom()
  }, [channelId])

  return (
    <Container>
      <ChatHeader>
        <Channel>
          <ChannelName>
            # {channel && channel.name}
          </ChannelName>
          <ChannelDescription>
            About games in development
          </ChannelDescription>
        </Channel>
        <ChannelDetails>
          Details <InfoOutlinedIcon />
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
    </Container>
  )
}

export default Chat


const Container = styled.div`
  display:grid;
  grid-template-rows: 64px auto min-content;
  background-color:#f8f9fa;
  min-height:0;
`

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content:space-between;
  padding: 0 20px;
  border-bottom: 1px solid #e2e2e2;
`

const Channel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const ChannelName = styled.div`
  font-weight: 900;
  color:#4a4a4a;
`

const ChannelDescription = styled.div`
  font-size: 13px;
  color:#606060;
`

const ChannelDetails = styled.div`
  display: flex;
  align-items: center;
  color:#606060;
  font-weight:600;
  svg{
    margin-left:8px;
  }
`


const ChatMessagesContainer = styled.div`
  display:flex;
  overflow-y: scroll;
  scroll-behavior: smooth;
`

const ChatMessages = styled.div`
 margin-top:auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

