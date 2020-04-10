import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MatchList({ match, heros, clusters, regions, itemsID, items }) {
  const {
    match_id,
    start_time,
    duration,
    radiant_win,
    radiant_team,
    dire_team,
    cluster
  } = match;
  const imgAdd = "http://cdn.dota2.com/";

  const splitRadiant = radiant_team.split(",").map(x => +x);
  const splitDire = dire_team.split(",").map(x => +x);

  //convert to UNIX TimeStamp
  const dateObj = new Date(start_time * 1000).toLocaleTimeString();

  //convert duration to MM:SS form
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;
  const formattedSeconds = ("0" + seconds).slice(-2);
  /* const hours = Math.floor(duration / 3600)
         duration = duration - hours *3600 */

  const radiantTeam = heros.filter(hero => splitRadiant.includes(hero.id));
  const direTeam = heros.filter(hero => splitDire.includes(hero.id));

  return (
    <div className="flex text-center">
      <div className="m-1 w-25">
        <Link
          to={{
            pathname: `/DotaAPI/match/${match_id}`,
            state: {
              heros,
              itemsID,
              items
            }
          }}
          className="text-decoration-none text-success"
        >
          {match_id}
        </Link>
      </div>
      <div className="m-1 w-25">{dateObj} </div>
      <div className="m-1 w-25 font-weight-bold">
        {minutes}:{formattedSeconds}
      </div>
      <div className="m-1 w-25 h-25 h5">
        <div style={{ color: radiant_win ? "green" : "red" }}>
          {radiant_win ? "Radiant" : "Dire"} Victory
        </div>
        <div className="h6">
          {regions[clusters[cluster]] ? regions[clusters[cluster]] : "CHINA"}
        </div>
      </div>
      <div className="m-1 w-50">
        {radiantTeam.map(radiantHero => (
          <span key={radiantHero.id}>
            <Link
              to={{
                pathname: `../DotaAPI/HeroProfile/${radiantHero.localized_name}`,
                state: {
                  heroInfo: heros
                }
              }}
            >
              <img
                src={imgAdd + radiantHero.img}
                width="45"
                title={radiantHero.localized_name}
              />
            </Link>
          </span>
        ))}
      </div>
      <div className="m-1 w-50">
        {direTeam.map(direHero => (
          <span key={direHero.id}>
            <Link to={`../DotaAPI/HeroProfile/${direHero.localized_name}`}>
              <img
                src={imgAdd + direHero.img}
                width="45"
                title={direHero.localized_name}
              />
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
}

export default MatchList;
