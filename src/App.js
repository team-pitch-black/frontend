import React from 'react';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

// import logo from './logo.svg';
import './App.css';
import Menu from './components/Navigation'
import Dungeon from './components/Dungeon/Dungeon'

function App() {
  return (
    <div className="App">
      <Menu />
      <Container style={{minHeight: "100%"}} id="main">
        <Grid container justify="center" spacing={8}>
          <Grid item>
            <Dungeon />
            <h2>Current Room:</h2>
            <p>Pathway</p>
          </Grid>
          <Grid item style={{minHeight: "100%"}}>
            <Grid container direction="column" alignItems="center" spacing={3}>
              <Grid item>
                <h3>Controls</h3>
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
