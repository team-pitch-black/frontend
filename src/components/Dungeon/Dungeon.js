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

    // const players = {
    //     1: {
    //         name: 'player1',
    //         sx: 205,
    //         sy: 181
    //     }
    // }

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

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d')

        ctx.fillStyle = '#000000'
        spriteRef.current.onload = () => {
            // Loop over map
            for (let c = 0; c < props.map.cols; c++) {
                for (let r = 0; r < props.map.rows; r++) {
                    let tile = props.map.getTile(c, r);
                    if (tile !== 0) { // 0 => empty tile
                        ctx.drawImage(
                            spriteRef.current, // image
                            tiles[tile].sx, // source x
                            tiles[tile].sy, // source y
                            15, // source width
                            15, // source height
                            c * props.map.tileWidth, // target x
                            r * props.map.tileHeight, // target y
                            props.map.tileWidth, // target width
                            props.map.tileHeight // target height
                        );
                    }
                }
                
            }
            
        }
        // console.log('inside useEffect', props.playerLocation)
        // ctx.drawImage(playerRef.current, 205, 181, 20, 20, props.playerLocation.x, props.playerLocation.y, 30, 30)
    })
    
    return (
        <div className="dungeon-container">
            <div className='testing' style={{position: 'relative'}}>
                <canvas id="dungeon-canvas" ref={canvasRef} width="750" height="750"></canvas>
                <img src={player1} style={{position: 'absolute', left: props.playerLocation.x * 30 +7, top: props.playerLocation.y * 30 +5 }} alt="player" />
            </div>
            <img id="sprite-img" src={sprite} alt="dungeon sprite" ref={spriteRef} style={{ display: "none" }} />
            {/* <img id='player-img' src={playersSprite} ref={playerRef} alt='player' style={{ display: "none" }} /> */}
            
            <img src={player2} alt="player 2"/>
            <img src={player3} alt="player 3"/>
            <img src={player4} alt="player 4"/>
            <img src={player5} alt="player 5"/>
        </div>
    )
}