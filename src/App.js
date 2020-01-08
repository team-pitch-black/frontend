import React, { useState } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css'
import bg from './8-bit-cave-background-2.jpg'
import Menu from './components/navigation'
import Dungeon from './components/Dungeon/Dungeon'
import UserLogin from './components/Login'
import SignUp from './components/SignUp'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1d181e"
    },
    secondary: {
      main: "#124B52"
    },
    error: {
      main: "#82260d"
    },
    warning: {
      main: '#82260d'
    },
    info: {
      main: "#130d0f"
    },
    success: {
      main: "#82260d"
    }
  },
})

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false)

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{backgroundImage: `url(${bg})`, backgroundPosition: 'center top', backgroundSize: 'cover'}}>
        <Router>
          <Menu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Route path="/login" render={ (props) => <UserLogin {...props} setIsLoggedIn={setIsLoggedIn} /> } />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/" render={() => {
            if (isLoggedIn) {
              return (
                <Container id="main">
                  <Grid container justify="center" spacing={8}>
                    <Grid item>
                      <div className="ui-item">
                        <Dungeon />
                        <h2>Current Room:</h2>
                        <p>Pathway</p>
                      </div>
                    </Grid>
                    <Grid item style={{ minHeight: "100%" }}>
                      <Grid container direction="column" alignItems="center" spacing={3}>
                        <Grid item>
                          <div className="ui-item">
                            <h3>Controls</h3>
                          </div>
                        </Grid>
                        <Grid item>
                          <div className="ui-item">
                            <h3>Players in Room</h3>
                          </div>
                        </Grid>
                        <Grid item>
                          <div className="ui-item">
                            <h3>Chat</h3>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Container>
              )
            } else {
              return (
                <>
                  <Typography variant="h1" color="error">Pitch Black</Typography>
                  <Typography variant="h4" color="error">Multi User Dungeon Experience</Typography>
                  <h3>Create an Account!</h3>
                </>
              )
            }
          }} />

        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
