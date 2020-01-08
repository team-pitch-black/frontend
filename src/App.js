import React, {useState} from 'react';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import ArrowKeysReact from 'arrow-keys-react';

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

  ArrowKeysReact.config({
    left: () => {
      console.log('left key detected.');
    },
    right: () => {
      console.log('right key detected.');
    },
    up: () => {
      console.log('up key detected.');
    },
    down: () => {
      console.log('down key detected.');
    }
  });


  const moveHandler = (direction) => {

    if(direction === 'up') {
       if (map.getTile(playerLocation.x, playerLocation.y - 1) === 0 || map.getTile(playerLocation.x, playerLocation.y - 1) === undefined){
        // console.log(map.getTile(playerLocation.x, playerLocation.y -1))
        // console.log(playerLocation.x, playerLocation.y -1)
       } else {
        console.log(map.getTile(playerLocation.x, playerLocation.y -1))
        console.log(playerLocation.x, playerLocation.y -1)
        setPlayerLocation({...playerLocation, y: playerLocation.y - 1})
       } 
    }
    else if (direction === 'down') {
      if (map.getTile(playerLocation.x, playerLocation.y + 1) === 0 || map.getTile(playerLocation.x, playerLocation.y + 1) === undefined) {

      } else {
        setPlayerLocation({...playerLocation, y: playerLocation.y + 1})
      }
      
    } else if (direction === 'left') {
      if (map.getTile(playerLocation.x - 1, playerLocation.y) === 0 || playerLocation.x -1 < 0){

      } else {
        setPlayerLocation({...playerLocation, x: playerLocation.x - 1})
      }
      
    } else if (direction === 'right') {
      if (map.getTile(playerLocation.x + 1, playerLocation.y) === 0 || playerLocation.x +1 > 24){

      } else {
      setPlayerLocation({...playerLocation, x: playerLocation.x + 1})
    }}
    // console.log(playerLocation)
  }

  return (
    <div {...ArrowKeysReact.events} className="App">
      <Menu />
      <Container style={{minHeight: "100%"}} id="main">
        <Grid container justify="center" spacing={8}>
          <Grid item>
            <Dungeon map={map} playerLocation={playerLocation} />
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
