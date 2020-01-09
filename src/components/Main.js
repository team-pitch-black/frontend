import React, { useEffect } from 'react'
import axios from 'axios'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';

import Dungeon from './Dungeon/Dungeon'
import { Button } from '@material-ui/core'


export default function Main({ map, setMap, playerLocation, setPlayerLocation, isLoggedIn }) {

    useEffect(() => {
        axios
            .get('https://pitch-black-mud.herokuapp.com/api/adv/map')
            .then(res => {
                const rooms = res.data
                let tileIdx
                let newTiles = [...map.tiles]
                for (const room of rooms) {
                    tileIdx = room.grid_y * map.cols + room.grid_x
                    // console.log(room.grid_x, room.grid_y, tileIdx)
                    newTiles[tileIdx] = parseInt(room.room_type)
                }
                console.log('newTiles: ', newTiles)
                setMap(prevState => {
                    return {
                        ...prevState,
                        tiles: newTiles
                    }
                })
            })
            .catch(err => console.log(err))
    }, [])

    const moveHandler = (direction) => {

        if (direction === 'up') {
            if (map.getTile(playerLocation.x, playerLocation.y - 1) === 0 || map.getTile(playerLocation.x, playerLocation.y - 1) === undefined) {
                // console.log(map.getTile(playerLocation.x, playerLocation.y -1))
                // console.log(playerLocation.x, playerLocation.y -1)
            } else {
                // console.log(map.getTile(playerLocation.x, playerLocation.y - 1))
                // console.log(playerLocation.x, playerLocation.y - 1)
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

    // Event Listeners for arrow movement with keys
    document.onkeydown = (e) => {
        e = e || window.event;
        checkKey(e)
    };

    function checkKey(e) {
        e = e || window.event;

        if (e.key === 'ArrowUp') {
            // up arrow
            console.log('up')
            moveHandler('up')
        }
        else if (e.key === 'ArrowDown') {
            // down arrow
            console.log('down')
            moveHandler('down')
        }
        else if (e.key === 'ArrowLeft') {
            // left arrow
            console.log('left')
            moveHandler('left')
        }
        else if (e.key === 'ArrowRight') {
            // right arrow
            console.log('right')
            moveHandler('right')
        }
    }

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
                                    <Grid item style={{ fontSize: "50px" }}>
                                        <ArrowUpwardOutlinedIcon onClick={() => moveHandler('up')} style={{ color: 'white' }} fontSize='inherit' />
                                    </Grid>
                                    <Grid item style={{ fontSize: "50px" }}>
                                        <ArrowBackOutlinedIcon fontSize="inherit" onClick={() => moveHandler('left')} style={{ color: 'white' }} />
                                        <ArrowDownwardOutlinedIcon fontSize="inherit" onClick={() => moveHandler('down')} style={{ color: 'white' }} />
                                        <ArrowForwardOutlinedIcon fontSize="inherit" onClick={() => moveHandler('right')} style={{ color: 'white' }} />
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item>
                                <div className="ui-item">
                                    <h3>Players in Room</h3>
                                    <Button onClick={console.log(map.tiles)}>Log</Button>
                                </div>
                            </Grid>
                            <Grid item>
                                <div className="ui-item">
                                    <h3>Chat</h3>
                                    <div className='chat-box' style={{ display: 'flex', padding: 10, borderRadius: 5, height: 300, width: 300, backgroundColor: 'grey' }}>
                                        {
                                            //loop through messages
                                        }
                                    </div>
                                    <input placeholder='type here' style={{ width: 314, borderRadius: 5 }} />
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
}