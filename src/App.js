import React, { useState } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ArrowKeysReact from 'arrow-keys-react';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import './App.css'
import bg from './8-bit-cave-background-2.jpg'
import Menu from './components/navigation'
import Dungeon from './components/Dungeon/Dungeon'
import UserLogin from './components/Login'
import SignUp from './components/SignUp'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1d181e",
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
      main: "#0D8226"
    }
  },
})

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false)
  
  // SnackBar popup
  const [open, setOpen] = useState(false)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false)
  }

  const [playerLocation, setPlayerLocation] = useState({
    x: 0,
    y: 0
  })

  const [map, setmap] = useState({
    cols: 25,
    rows: 25,
    tileWidth: 30,
    tileHeight: 30,
    tiles: [
      1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3,
      0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 3, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 2, 1, 0, 1, 4, 3, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 2, 1, 1, 1, 3, 1, 1, 3, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 3, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 0, 1, 0, 0, 0, 5, 0, 1, 1, 3, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3,
      1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 3
    ],
    getTile: function (col, row) {
      return this.tiles[row * map.cols + col]
    }
  })

  document.onkeydown = checkKey;

  function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
      // up arrow
      console.log('up')
      moveHandler('up')
    }
    else if (e.keyCode == '40') {
      // down arrow
      console.log('down')
      moveHandler('down')
    }
    else if (e.keyCode == '37') {
      // left arrow
      console.log('left')
      moveHandler('left')
    }
    else if (e.keyCode == '39') {
      // right arrow
      console.log('right')
      moveHandler('right')
    }

  }

  const moveHandler = (direction) => {

    if (direction === 'up') {
      if (map.getTile(playerLocation.x, playerLocation.y - 1) === 0 || map.getTile(playerLocation.x, playerLocation.y - 1) === undefined) {
        // console.log(map.getTile(playerLocation.x, playerLocation.y -1))
        // console.log(playerLocation.x, playerLocation.y -1)
      } else {
        console.log(map.getTile(playerLocation.x, playerLocation.y - 1))
        console.log(playerLocation.x, playerLocation.y - 1)
        setPlayerLocation({ ...playerLocation, y: playerLocation.y - 1 })
      }
    } else if (direction === 'down') {
      if (map.getTile(playerLocation.x, playerLocation.y + 1) === 0 || map.getTile(playerLocation.x, playerLocation.y + 1) === undefined) {

      } else {
        setPlayerLocation({ ...playerLocation, y: playerLocation.y + 1 })
      }

    } else if (direction === 'left') {
      if (map.getTile(playerLocation.x - 1, playerLocation.y) === 0 || playerLocation.x - 1 < 0) {

      } else {
        setPlayerLocation({ ...playerLocation, x: playerLocation.x - 1 })
      }

    } else if (direction === 'right') {
      if (map.getTile(playerLocation.x + 1, playerLocation.y) === 0 || playerLocation.x + 1 > 24) {

      } else {
        setPlayerLocation({ ...playerLocation, x: playerLocation.x + 1 })
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ backgroundImage: `url(${bg})`, backgroundPosition: 'center top', backgroundSize: 'cover' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={handleClose} severity="success">
              Thanks for signing up, have fun!
          </Alert>
        </Snackbar>
        <Router>
          <Menu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Route path="/login" render={(props) => <UserLogin {...props} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" render={(props) => <SignUp {...props} setIsLoggedIn={setIsLoggedIn} setOpen={setOpen} />} />
          <Route exact path="/" render={() => {
            if (isLoggedIn) {
              return (
                <Container id="main">
                  <Grid container justify="center" spacing={8}>
                    <Grid item>
                      <div className="ui-item">
                        <Dungeon map={map} playerLocation={playerLocation} />
                        <h2>Current Room:</h2>
                        <p>Pathway</p>
                      </div>
                    </Grid>
                    <Grid item style={{ minHeight: "100%" }}>
                      <Grid container direction="column" alignItems="center" spacing={3}>
                        <Grid item>
                          <div className="ui-item">
                            <h3>Controls</h3>
                            <Grid item>
                              <ArrowUpwardOutlinedIcon onClick={() => moveHandler('up')} style={{ color: 'white' }} />
                            </Grid>
                            <Grid item>
                              <ArrowBackOutlinedIcon onClick={() => moveHandler('left')} style={{ color: 'white' }} />
                              <ArrowDownwardOutlinedIcon onClick={() => moveHandler('down')} style={{ color: 'white' }} />
                              <ArrowForwardOutlinedIcon onClick={() => moveHandler('right')} style={{ color: 'white' }} />
                            </Grid>
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
