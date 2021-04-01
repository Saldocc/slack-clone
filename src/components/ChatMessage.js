import React from 'react'
import styled from 'styled-components'

function ChatMessage({ text, name, image, timestamp }) {
  return (
    <Container>
      <UserAvatar>
        <img src={image ? image : "https://www.w3schools.com/howto/img_avatar.png"} />
      </UserAvatar>
      <MessageContent>
        <MessageInfo>
          <Name>
            {name}
          </Name>
          <DateSpan>
            <span>{new Date(timestamp.toDate()).toUTCString()}</span>
          </DateSpan>
        </MessageInfo>
        <Text>
          {text}
        </Text>
      </MessageContent>
    </Container>
  )
}

export default ChatMessage


const Container = styled.div`
  display:flex;
  align-items: flex-start;
  padding: 8px 20px;

  &:hover{
    background: #f0f0f0;
  }
`

const UserAvatar = styled.div`
  display:flex;
  width:36px;
  height:36px;
  margin-right:8px;
  margin-top:4px;

  img{
    border-radius:2px;
    width:36px;
    height:36px;
    object-fit:cover;
  }
`

const MessageContent = styled.div`
  display:flex;
  flex-direction: column;
`

const MessageInfo = styled.div`
`

const Name = styled.span`
  font-weight:900;
  display:inline-block;
  margin-right:8px;
`

const DateSpan = styled.span`
  font-size: 12px;
  color:#616061;
`

const Text = styled.span`
`