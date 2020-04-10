import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function PlayerList({ player, heros, items, itemsID }) {

    const { hero_id, level, personaname, isRadiant } = player
    const { kills, deaths, assists, last_hits, denies, gold_per_min, xp_per_min } = player
    const { item_0, item_1, item_2, item_3, item_4, item_5 } = player
    const playerItems = []
    playerItems.push(item_0, item_1, item_2, item_3, item_4, item_5)

    playerItems.forEach(
        (element, index, array) => {
            array[index] = itemsID[element]
        }
    )

    playerItems.forEach(
        (element, index, array) => {
            if (element !== undefined) {
                //console.log(items[element].attrib)
                array[index] = {
                    img: items[element].img,
                    text: element
                }
            }
        }
    );
    //console.log(player)

    const imgAdd = "http://cdn.dota2.com/"
    const hero = heros.filter(hero => hero.id === hero_id)[0]

    return (
        <div className="flex text-center mb-2" id="none">
            <div className="w-25">
                <Link to={{
                    pathname: `../HeroProfile/${hero.localized_name}`,
                    state: {
                        heroInfo: heros
                    }
                }}>
                    <img src={imgAdd + hero.img} width='60' title={hero.localized_name} />

                    <span className="position-absolute small-level">{level}</span>
                </Link>
            </div>
            <div className="w-50 text-truncate text-left ml-3">
                {personaname && <a href="" className={`card-link ${isRadiant ? 'text-success' : 'text-danger'}`}
                >{personaname}</a>}
                {!personaname && <span>Anonymous</span>}
            </div>
            <div className="w-25">{kills ? kills : "-"}</div>
            <div className="w-25">{deaths ? deaths : "-"}</div>
            <div className="w-25">{assists ? assists : "-"}</div>
            <div className="w-25">{last_hits} / {denies}</div>
            <div className="w-25">{gold_per_min} / {xp_per_min}</div>
            <div className="w-75 text-left">
                {
                    playerItems.map((element, index) => (
                        element && <Link to={`../../Dota2/${element.text}`} key={index}>
                            <img key={index} src={imgAdd + element.img} width='50' />
                        </Link>)
                    )
                }
            </div>
        </div>
    )
}

export default PlayerList
