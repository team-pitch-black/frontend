import React, { useEffect } from 'react'

import sprite from './dawnblocker_ortho.png'

export default function Dungeon() {
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
        const canvas = document.getElementById('dungeon-canvas')
        const ctx = canvas.getContext('2d')
        const img = document.getElementById('sprite-img')

        ctx.fillStyle = '#000000'
        img.onload = () => {
            // Loop over map
            for (let c = 0; c < map.cols; c++) {
                for (let r = 0; r < map.rows; r++) {
                    let tile = map.getTile(c, r);
                    if (tile !== 0) { // 0 => empty tile
                        ctx.drawImage(
                            img, // image
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
    })
    return (
        <div class="dungeon-container">
            <canvas id="dungeon-canvas" width="300" height="300"></canvas>
            <img id="sprite-img" src={sprite} alt="dungeon sprite" style={{ display: "none" }} />
        </div>
    )
}