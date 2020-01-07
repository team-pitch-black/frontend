import React from 'react';
import { useState, useEffect } from 'react'
import Tile from '../images/TilesDungeon/Tile.png'


function Map() {
    const [mapObject, setMapObject] = useState({
        height: 10,
        width: 10,
        tiles: [{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },
            {id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },
            {id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },
            {id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },
            {id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },
            {id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },
            {id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },
            {id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },
            {id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', },{id: '', type: 'path', }
        ]
    })


    const imagePicker = (type) => {
        if(type === 'path') {
            return Tile
        } else if (type === 'building') {
            return 'building url'
        }
    }



    return(
        <div style={{display: 'flex', height: 300, width: 300, flexWrap: 'wrap', alignContent: 'flex-Start', margin: 'auto', marginTop: 30}}>
            {
                mapObject.tiles.map((tile) => {
                    return <img style={{width: 30, height: 30}} src={imagePicker(tile.type)}></img>
                })
            }

            <div>number of tiles: {mapObject.tiles.length}</div>
        </div>
    )

}

export default Map;