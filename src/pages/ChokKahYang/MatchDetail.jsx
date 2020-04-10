import React, { useState, useEffect } from "react";
import BasePage from "../basePage/basePage";
import PlayerList from "./PlayerList";
import callApi from "../DotaAPI/FetchFunction";

const MatchDetail = props => {
  const { id } = props.match.params;
  const { heros, itemsID, items } = props.location.state;

  const [matchDetails, setMatchDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const matchDetail = await callApi(`/matches/${id}`);
      setMatchDetails(matchDetail);
      setLoading(false);
    };
    fetchDetails();
  }, []);


  const {
    radiant_win,
    radiant_score,
    dire_score,
    duration,
    players
  } = matchDetails;
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;
  const formattedSeconds = ("0" + seconds).slice(-2);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <BasePage title={`Match ${id}`}>
      <div className="base-page">
        <span>
          <button
            onClick={props.history.goBack}
            className="float-right btn btn-dark"
          >
            Back
          </button>
        </span>
        <div className="text-center mt-3 m-2">
          <div
            className={`font-weight-bold h1 ${
              radiant_win ? "text-success" : "text-danger"
            }`}
          >
            {radiant_win ? "Radiant Victory" : "Dire Victory"}
          </div>
          <div className="score">
            <span className="text-success h2 m-3">{radiant_score}</span>
            <span className="h4">
              {minutes}:{formattedSeconds}
            </span>
            <span className="text-danger h2 m-3">{dire_score}</span>
          </div>
        </div>

        <div className="mt-2 mx-5">
          <span className="m-4 text-success font-weight-bold">THE RADIANT</span>
          <div className="silk flex text-center font-weight-bold m-3">
            <div className="w-25">Heros</div>
            <div className="w-50">Players</div>
            <div className="w-25">Kills</div>
            <div className="w-25">Deaths</div>
            <div className="w-25">Assists</div>
            <div className="w-25">LH / DN</div>
            <div className="w-25">GPM / XPM</div>
            <div className="w-75 text-left">Items</div>
          </div>
          {players.slice(0, 5).map(player => (
            <PlayerList
              key={player.player_slot}
              player={player}
              heros={heros}
              items={items}
              itemsID={itemsID}
            />
          ))}
        </div>
        <div className="mt-3 mx-5">
          <span className="pt-2 m-4 text-danger font-weight-bold">
            THE DIRE
          </span>
          <div className="silk flex text-center  font-weight-bold m-3">
            <div className="w-25">Heros</div>
            <div className="w-50">Players</div>
            <div className="w-25">Kills</div>
            <div className="w-25">Deaths</div>
            <div className="w-25">Assists</div>
            <div className="w-25">LH / DN</div>
            <div className="w-25">GPM / XPM</div>
            <div className="w-75 text-left">Items</div>
          </div>
          {players.slice(5, 10).map(player => (
            <PlayerList
              key={player.player_slot}
              player={player}
              heros={heros}
              items={items}
              itemsID={itemsID}
            />
          ))}
        </div>
      </div>
    </BasePage>
  );
};

export default MatchDetail;
