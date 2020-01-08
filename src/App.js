import React, {useState} from 'react';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

// import logo from './logo.svg';
import './App.css';
import Menu from './components/navigation'
import Dungeon from './components/Dungeon/Dungeon'
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';

function App() {

  const [playerLocation, setPlayerLocation] = useState({
    x: 0,
    y: 0
})

  const moveHandler = (direction) => {
    if(direction === 'up') {
      setPlayerLocation({...playerLocation, y: playerLocation.y - 30})
    } else if (direction === 'down') {
      setPlayerLocation({...playerLocation, y: playerLocation.y + 30})
    } else if (direction === 'left') {
      setPlayerLocation({...playerLocation, x: playerLocation.x - 30})
    } else if (direction === 'right') {
      setPlayerLocation({...playerLocation, x: playerLocation.x + 30})
    }
    // console.log(playerLocation)
  }

  return (
    <div className="App">
      <Menu />
      <Container style={{minHeight: "100%"}} id="main">
        <Grid container justify="center" spacing={8}>
          <Grid item>
            <Dungeon playerLocation={playerLocation} />
            <h2>Current Room:</h2>
            <p>Pathway</p>
          </Grid>
          <Grid item style={{minHeight: "100%"}}>
            <Grid container direction="column" alignItems="center" spacing={3}>
              <Grid item>
                <h3>Controls</h3>
                <Grid item>
                  <ArrowUpwardOutlinedIcon onClick={() => moveHandler('up')} style={{color: 'white'}} />
                </Grid>
                <Grid item>
                  <ArrowBackOutlinedIcon onClick={() => moveHandler('left')} style={{color: 'white'}} />
                  <ArrowDownwardOutlinedIcon onClick={() => moveHandler('down')} style={{color: 'white'}} />
                  <ArrowForwardOutlinedIcon onClick={() => moveHandler('right')} style={{color: 'white'}} />
                </Grid>
              </Grid>
              <Grid item>
                <h3>Players in Room</h3>
              </Grid>
              <Grid item>
                <h3>Chat</h3>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
