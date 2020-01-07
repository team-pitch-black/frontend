import React, { useEffect } from 'react'
import sprite from './dawnblocker_ortho.png'
// import sprite from './dungeon_tiles.png'

export default function Dungeon() {
    let map = {
        cols: 8,
        rows: 8,
        tsize: 64,
        tiles: [
            1, 3, 3, 3, 1, 1, 3, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 2, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 2, 1, 1, 1, 1,
            1, 1, 1, 1, 2, 1, 1, 1,
            1, 1, 1, 1, 2, 1, 1, 1,
            1, 1, 1, 0, 0, 1, 1, 1
        ],
        getTile: function (col, row) {
            return this.tiles[row * map.cols + col]
        }
    }

    useEffect(() => {
        const canvas = document.getElementById('dungeon-canvas')
        const ctx = canvas.getContext('2d')
        const img = document.getElementById('sprite-img')

        img.onload = () => {
            // Loop over map
            for (let c = 0; c < map.cols; c++) {
                for (let r = 0; r < map.rows; r++) {
                    let tile = map.getTile(c, r);
                    if (tile !== 0) { // 0 => empty tile
                        ctx.drawImage(
                            img, // image
                            (tile - 1) * map.tsize, // source x
                            0, // source y
                            map.tsize, // source width
                            map.tsize, // source height
                            c * map.tsize, // target x
                            r * map.tsize, // target y
                            map.tsize, // target width
                            map.tsize // target height
                        );
                    }
                }
            }
        }

        // ctx.drawImage(img, 0, 0)

    })
    return (
        <>
            <canvas id="dungeon-canvas" width="1000" height="1000"></canvas>
            <img id="sprite-img" src={sprite} alt="dungeon sprite" style={{ display: "none" }} />
        </>
    )
}