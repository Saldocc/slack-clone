import React from 'react'
import styled from 'styled-components'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

function Details({ channel, users }) {
  return (
    <Container>
      <DetailHeader>
        <DetailHeaderText>
          <span>Detail</span>
          <DetailChannelName>
            # {channel && channel.name}
          </DetailChannelName>
        </DetailHeaderText>
        <button>
          <CloseRoundedIcon />
        </button>
      </DetailHeader>
      <DetailTab>
        <TabItem>
          <input type="checkbox" id="detailRadio1" name="detailRadio" />
          <label className="tab-label" htmlFor="detailRadio1">About <ArrowForwardIosRoundedIcon /></label>
          <div className="tab-content">
            <AboutCard>
              <h5>Description</h5>
              <span>
                {(channel && channel.description) ? channel.description : "Describe what this channel is so people can find it."}
              </span>
              <button>Edit</button>
            </AboutCard>
            <CreatorCard>
              <img src={channel.creatorImage} alt="avatar" />
              Created on {channel && new Date(channel.timestamp.toDate()).toDateString()}
            </CreatorCard>
          </div>
        </TabItem>
        <TabItem>
          <input type="checkbox" id="detailRadio2" name="detailRadio" />
          <label className="tab-label" htmlFor="detailRadio2">Members <div className="display-center"><span>{users.length}</span><ArrowForwardIosRoundedIcon /></div></label>
          <div className="tab-content user-tab-content">
            <UserList>
              {
                users.length > 0 && users.map((data, index) => (
                  <UserItem key={index}> <img src={data.userImage} /> {data.user} </UserItem>
                ))
              }
            </UserList>
          </div>
        </TabItem>
        <TabItem>
          <input type="checkbox" id="detailRadio3" name="detailRadio" />
          <label className="tab-label" htmlFor="detailRadio3">Shortcuts <div className="display-center"><span>0</span><ArrowForwardIosRoundedIcon /></div></label>
          <div className="tab-content">

          </div>
        </TabItem>

        <TabItem>
          <input type="checkbox" id="detailRadio4" name="detailRadio" />
          <label className="tab-label" htmlFor="detailRadio4">Pinned <div className="display-center"><span>0</span><ArrowForwardIosRoundedIcon /></div></label>
          <div className="tab-content">
            No items have been pinned yet! Open the context menu on important messages or files and choose Pin to # {channel.name} to stick them here.
          </div>
        </TabItem>

        <TabItem>
          <input type="checkbox" id="detailRadio5" name="detailRadio" />
          <label className="tab-label" htmlFor="detailRadio5">Files <ArrowForwardIosRoundedIcon /></label>
          <div className="tab-content">
            There are no files to see here right now! But there could be — drag and drop any file into the message pane to add it to this conversation.
          </div>
        </TabItem>
      </DetailTab>
    </Container>
  )
}

export default Details


const Container = styled.div`
  display:grid;
  grid-template-rows: 64px auto;
  min-height:0;
`


const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content:space-between;
  padding: 0 12px 0 16px;
  border-bottom: 1px solid ${props => props.theme.chatBorderColor};
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
      color:${props => props.theme.chatHeaderDarkFontColor};
    }
  }
`

const DetailHeaderText = styled.div`
  span{
    font-weight: 900;
    color:${props => props.theme.chatHeaderDarkFontColor};
  }
`

const DetailChannelName = styled.div`
  font-size: 13px;
  color:${props => props.theme.chatHeaderLightFontColor};
`

const DetailTab = styled.div`
  overflow: hidden;
`

const TabItem = styled.div`
  width: 100%;
  color: white;
  overflow: hidden;

  input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }


  input:checked {
    +.tab-label {
      background: darken(#2c3e50, 10%);
      svg{
      transform:rotate(90deg)
      }
    }
    ~.tab-content {
      max-height: 100vh;
      padding-bottom: 16px;
    }
  }

  .tab-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px;
    padding: 12px;
    cursor: pointer;   
    font-weight: 700;
    color:${props => props.theme.chatHeaderDarkFontColor};
    user-select: none;
    span{
      font-weight:400;
      font-size: 13px;
    }
    svg{
      transition: all .35s ;
      font-size:16px;
      margin-left:8px;
    }
  }
  
  .tab-content {
    display:flex;
    flex-direction:column;
    max-height: 0;
    padding: 0 16px ;
    color:${props => props.theme.chatHeaderDarkFontColor};
    transition: all .35s;
    border-bottom: 1px solid ${props => props.theme.chatBorderColor};
  }

  .user-tab-content{
    padding: 0;
  }
`



const AboutCard = styled.div`
  display:flex;
  flex-direction: column;
  margin-top:1px;
  padding: 12px 16px;
  background-color: #f6f6f6;
  word-break: break-word;
  border-radius: 4px 4px 0 0;
  color:${props => props.theme.chatHeaderLightFontColor};
  h5{
    font-size: 13px;
    font-weight: 700;
  }
  button{
    display: block;
    margin-top: 4px;
    font-size: 13px;
    background: none;
    border: 0;
    color:#548ebb;
    line-height: inherit;
    overflow: initial;
    padding: 0;
    text-align: initial;
    cursor: pointer;
  }
`

const CreatorCard = styled.div`
   display:flex;
   align-items: center;
   margin-top:1px;
   padding: 12px 16px;
   word-break: break-word;
   background-color: #f6f6f6;
   border-radius: 0 0 4px 4px;
   font-size: 13px;
   line-height: 1.38463;
   color:${props => props.theme.chatHeaderLightFontColor};
   img{
    height: 22px;
    width: 22px;
    background-size: 100%;
    background-repeat: no-repeat;
    display: inline-block;
    background-color: #f6f6f6;
    position: relative;
    border-radius: 4px;
    margin-right: 8px;
   }
`

const UserList = styled.div`

`

const UserItem = styled.div`
  padding: 6px 16px ;
  align-items: center;
  display: flex;
  width: 100%;
  font-weight: 700;
  cursor: pointer;
  img{
    height: 20px;
    width: 20px;
    margin-right: 8px;
    background-size: 100%;
    background-repeat: no-repeat;
    display: inline-block;
    background-color: #f6f6f6;
    position: relative;
    border-radius: 4px;
  }
  &:hover{
    color:#fff;
    background-color: #1264a3;
  }
`