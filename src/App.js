import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Chat from './components/Chat'
import Login from './components/Login'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import styled, { ThemeProvider } from 'styled-components'
import db from './firebase'
import { auth, provider } from './firebase'

import './App.css';

function App() {

  const [rooms, setRooms] = useState([])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [theme, setTheme] = useState({})

  const getChannels = () => {
    db.collection('rooms').onSnapshot((snapshot) => {
      setRooms(snapshot.docs.map((doc) => {
        return { id: doc.id, name: doc.data().name }
      }))
    })
  }

  const signOut = () => {
    auth.signOut().then(() => {
      localStorage.removeItem('user')
      setUser(null)
    })
  }

  const themeSettings = () => {
    let themeName
    if (!JSON.parse(localStorage.getItem('theme'))) {
      localStorage.setItem('theme', JSON.stringify(lightTheme))
      setTheme(lightTheme)
    } else {
      themeName = JSON.parse(localStorage.getItem('theme'))
      setTheme(themeName)
    }
  }

  const toggleTheme = () => {
    if (theme.themeName === 'lightTheme') {
      localStorage.setItem('theme', JSON.stringify(darkTheme))
      setTheme(darkTheme)
    } else {
      localStorage.setItem('theme', JSON.stringify(lightTheme))
      setTheme(lightTheme)
    }
  }

  useEffect(() => {
    getChannels();
    themeSettings();
  }, [])


  const lightTheme = {
    themeName: "lightTheme",

    headerBgColor: '#350d36',
    headerFontColor: '#FFFFFF',
    headerContainerBShadow: '0 1px 0 0 rgb(255 255 255 / 10%)',

    searchInputBgColor: '#431e44',
    searchInputBShadow: 'inset 0 0 0 1px rgb(104 74 104)',
    searchInputFontColor: '#FFFFFF',

    sidebarBgColor: '#3F0E40',
    sidebarFontColor: '#FFFFFF',
    sidebarBorderColor: '#522653',
    sidebarNewMessageColor: '#3F0E40',
    sidebarNewMessageBgColor: '#FFFFFF',
    sidebarMenuItemFontColor: '#bcabbc',
    sidebarMenuItemHoverColor: '#350D36',

    chatBgColor: '#f8f9fa',
    chatBorderColor: '#e2e2e2',
    chatHeaderDarkFontColor: '#4a4a4a',
    chatHeaderLightFontColor: '#606060',
    chatMessageHoverColor: '#f0f0f0',
    chatMessagelightColor: '#616061',
    chatMessageMainColor: '#000000',
    chatInputBorderColor: '#8D8D8E'

  }

  const darkTheme = {

    themeName: "darkTheme",

    headerBgColor: '#252525',
    headerFontColor: '#FFFFFF',
    headerContainerBShadow: '0 1px 0 0 rgb(0 0 0  / 10%)',

    searchInputBgColor: '#333333',
    searchInputBShadow: 'inset 0 0 0 1px #333333',
    searchInputFontColor: '#FFFFFF',

    sidebarBgColor: '#333333',
    sidebarFontColor: '#FFFFFF',
    sidebarBorderColor: '#252525',
    sidebarNewMessageColor: '#3F0E40',
    sidebarNewMessageBgColor: '#EEEEEE',
    sidebarMenuItemFontColor: '#B6B5B5',
    sidebarMenuItemHoverColor: '#252525',

    chatBgColor: '#454545',
    chatBorderColor: '#898888',
    chatHeaderDarkFontColor: '#EEEEEE',
    chatHeaderLightFontColor: '#B6B5B5',
    chatMessageHoverColor: '#555555',
    chatMessagelightColor: '#B6B5B5',
    chatMessageMainColor: '#EEEEEE',
    chatInputBorderColor: '#333333'
  }


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          {!user ?
            <Login setUser={setUser} />
            :
            <Container>
              <Header signOut={signOut} toggleTheme={toggleTheme} user={user} />
              <Main>
                <Sidebar rooms={rooms} />
                <Switch>
                  <Route path="/room/:channelId">
                    <Chat user={user} />
                  </Route>
                  <Route path="/">
                    <CreateOrSelect>
                      Create or Select
                      <AddCircleOutlineRoundedIcon />
                    </CreateOrSelect>
                  </Route>
                </Switch>
              </Main>
            </Container>
          }
        </Router>
      </ThemeProvider>
    </div >
  );
}

export default App;


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display:grid;
  grid-template-rows: 38px minmax(0, 1fr);
`

const Main = styled.div`
  display:grid;
  grid-template-columns: 260px auto;
`
const CreateOrSelect = styled.div`
  display:flex;
`