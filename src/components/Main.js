import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';

import Dungeon from './Dungeon/Dungeon'
import { axiosWithAuth } from '../axiosWithAuth'


export default function Main({ map, setMap, playerLocation, setPlayerLocation, isLoggedIn }) {
    const [playersInRoom, setPlayersInRoom] = useState([])
    const [itemsInRoom, setItemsInRoom] = useState([])
    const [personalItems, setPersonalItems] = useState([])
    const [isLoaded, setIsLoaded ] = useState(false)
    useEffect(() => {
        axiosWithAuth()
            .get('https://pitch-black.herokuapp.com/api/adv/map/')
            .then(res => {
                const rooms = res.data.rooms
                let tileIdx
                let newTiles = [...map.tiles]
                for (const room of rooms) {
                    tileIdx = room.grid_y * map.cols + room.grid_x
                    newTiles[tileIdx] = parseInt(room.room_type)
                }
                setMap(prevState => {
                    return {
                        ...prevState,
                        tiles: newTiles
                    }
                })
                setIsLoaded(true)
            })
            .catch(err => console.log(err))
            updatePlayerLocation()
    }, [])

    const updatePlayerLocation = () => {
        axiosWithAuth()
        .get("https://pitch-black.herokuapp.com/api/adv/init/")
        .then(res => {
            setPlayerLocation({x: res.data.grid_x, y: res.data.grid_y,})
            setPlayersInRoom(res.data.players)
            setPersonalItems(res.data.player_items)
        })
        .catch(err => {console.log(err)})
    }

    const movementHandler = (direction) => {
        axiosWithAuth()
            .post("https://pitch-black.herokuapp.com/api/adv/move/", {'direction': direction})
            .then(res => {
                console.log(res)
                setPlayerLocation({x: res.data.grid_x, y: res.data.grid_y,})
                setPlayersInRoom(res.data.players)
                setItemsInRoom(res.data.room_items)
            })
            .catch(err => {console.log(err)})

    }

    const moveHandler = (direction) => {

        if (direction === 'up') {
            if (map.getTile(playerLocation.x, playerLocation.y - 1) === 0 || map.getTile(playerLocation.x, playerLocation.y - 1) === undefined) {

            } else {
                movementHandler('d')
            }
        } else if (direction === 'down') {
            if (map.getTile(playerLocation.x, playerLocation.y + 1) === 0 || map.getTile(playerLocation.x, playerLocation.y + 1) === undefined) {

            } else {
                movementHandler('u')
            }

        } else if (direction === 'left') {
            if (map.getTile(playerLocation.x - 1, playerLocation.y) === 0 || playerLocation.x - 1 < 0) {

            } else {
                movementHandler('l')
            }

        } else if (direction === 'right') {
            if (map.getTile(playerLocation.x + 1, playerLocation.y) === 0 || playerLocation.x + 1 > 24) {

            } else {
                movementHandler('r')
            }
        }
    }

    const grabItem = (itemName) => {
        axiosWithAuth()
            .post('https://pitch-black.herokuapp.com/api/adv/get-item/', {'item': itemName})
            .then(res => {
                console.log(res)
                setItemsInRoom(res.data.room_items)
                setPersonalItems(res.data.player_items)
            })
            .catch(err => {console.log(err)})

    }

    const dropItem = (itemName) => {
        axiosWithAuth()
        .post('https://pitch-black.herokuapp.com/api/adv/drop-item/', {'item': itemName})
        .then(res => {
            console.log(res)
            setItemsInRoom(res.data.room_items)
            setPersonalItems(res.data.player_items)
        })
        .catch(err => {console.log(err)})

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
                            {isLoaded ? (
                                <Dungeon map={map} setIsLoaded={setIsLoaded} playerLocation={playerLocation} />
                            ) : (
                                <p>Loading...</p>
                            )}
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
                                    <button onClick={() => movementHandler()}>move test</button>
                                </div>
                            </Grid>
                            <Grid item>
                                <div className="ui-item">
                                    <h3>Players in Room</h3>
                                    <ul>
                                    {playersInRoom.map((player)=> {
                                        return <li key="player">{player}</li>
                                    })}
                                    </ul>
                                </div>
                            </Grid>
                            <Grid item>
                                <div className="ui-item">
                                    <h3>Items in Room</h3>
                                    <ul>
                                    {itemsInRoom.map((item)=> {
                                        return <button onClick={() => grabItem(item)}>{item}</button>
                                    })}
                                    </ul>
                                </div>
                            </Grid>
                            <Grid item>
                                <div className="ui-item">
                                    <h3>Personal Items</h3>
                                    <ul>
                                    {personalItems.map((item)=> {
                                        return <button onClick={() => dropItem(item)}>{item}</button>
                                    })}
                                    </ul>
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