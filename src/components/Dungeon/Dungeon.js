import React, { useEffect, useRef } from 'react'

import sprite from './dawnblocker_ortho.png'
import player1 from './player1.png'
import player2 from './player2.png'
import player3 from './player3.png'
import player4 from './player4.png'
import player5 from './player5.png'

export default function Dungeon(props) {
    // const playerRef = useRef(null)
    const canvasRef = useRef(null)
    const spriteRef = useRef(null)

    const players = {
        1: {
            name: 'player1',
            sx: 205,
            sy: 181
        }
    }

    const tiles = {
        1: {
            type: "path",
            sx: 153,
            sy: 267,
        },
        2: {
            type: "Treasure Room",
            sx: 153,
            sy: 236,
        },
        3: {
            type: "Monster Room",
            sx: 170,
            sy: 236,
        },
        4: {
            type: "Key Room",
            sx: 170,
            sy: 267,
        },
        5: {
            type: "Lock Room",
            sx: 136,
            sy: 261,
        }
    }
    let map = {
        cols: 10,
        rows: 10,
        tileWidth: 30,
        tileHeight: 30,
        tiles: [
            1, 1, 0, 0, 0, 0, 1, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 0, 1, 0,
            1, 1, 1, 1, 1, 2, 1, 0, 1, 4,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 2, 1, 1, 1, 3, 1, 1,
            1, 1, 1, 1, 2, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 2, 1, 1, 1, 1, 1,
            1, 0, 1, 0, 0, 0, 1, 1, 1, 1,
            1, 0, 1, 0, 0, 0, 5, 0, 1, 1,
            1, 1, 1, 1, 1, 0, 0, 0, 1, 1
        ],
        getTile: function (col, row) {
            return this.tiles[row * map.cols + col]
        }
    }

    useEffect(() => {
        // const canvas = document.getElementById('dungeon-canvas')
        const ctx = canvasRef.current.getContext('2d')
        // const img = document.getElementById('sprite-img')

        // const player = document.getElementById('player-img')
        // const playerCtx = canvas.getContext('2d')
        // const playerCanvas = document.getElementById('dungeon-canvas')
        // playerCtx.drawImage(player, 213,181, 15, 15, 0, 0, 30, 30)

        ctx.fillStyle = '#000000'
        spriteRef.current.onload = () => {
            // Loop over map
            for (let c = 0; c < map.cols; c++) {
                for (let r = 0; r < map.rows; r++) {
                    let tile = map.getTile(c, r);
                    if (tile !== 0) { // 0 => empty tile
                        ctx.drawImage(
                            spriteRef.current, // image
                            tiles[tile].sx, // source x
                            tiles[tile].sy, // source y
                            15, // source width
                            15, // source height
                            c * map.tileWidth, // target x
                            r * map.tileHeight, // target y
                            map.tileWidth, // target width
                            map.tileHeight // target height
                        );
                    }
                }
                
            }
            
        }
        console.log('inside useEffect', props.playerLocation)
        // ctx.drawImage(playerRef.current, 205, 181, 20, 20, props.playerLocation.x, props.playerLocation.y, 30, 30)
    }, [props.playerLocation])
    
    return (
        <div class="dungeon-container">
            <div class='testing'>
            <canvas id="dungeon-canvas" ref={canvasRef} width="300" height="300"></canvas>
            <img src={player1} style={{position: 'relative', left: props.playerLocation.x + 8, top: props.playerLocation.y -5 }} />
            </div>
            <img id="sprite-img" src={sprite} alt="dungeon sprite" ref={spriteRef} style={{ display: "none" }} />
            {/* <img id='player-img' src={playersSprite} ref={playerRef} alt='player' style={{ display: "none" }} /> */}
            
            <img src={player2} />
            <img src={player3} />
            <img src={player4} />
            <img src={player5} />
        </div>
    )
}