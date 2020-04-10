import React from 'react'
import './proteam.scss'
import { Link } from 'react-router-dom'
import callApi from '../DotaAPI/FetchFunction'

const teamIknow = [
  'OG',
  'TNC Predator',
  'Vici Gaming',
  'Team Secret',
  'Invictus Gaming',
  'Fnatic',
]
export default class proTeam extends React.Component {
  /**
   * constructor
   *
   * @object  @props  parent props
   * @object  @state  component state
   */
  constructor(props) {
    super(props)

    this.state = {
      teams: [],
      isLoaded: false,
    }
  }

  /**
   * componentDidMount
   *
   * Fetch json array of objects from given url and update state.
   */
  async componentDidMount() {
    this.setState({
      teams: await callApi('/teams'),
      isLoaded: true,
    })
  }

  /**
   * render
   *
   * Render UI
   */
  render() {
    const { isLoaded, teams } = this.state
    let filteredTeam = []
    for (const i in teams) {
      for (const j in teamIknow) {
        if (teams[i].name.toLowerCase() === teamIknow[j].toLowerCase()) {
          filteredTeam.push(teams[i])
        }
      }
    }

    if (!isLoaded) return <div>Loading...</div>

    return (
      <div className="slideshow">
        <h3>Top Teams</h3>
        <div className="slideshow-container">
          <ul>
            <div className="slideshow-slide">
              {filteredTeam.map(team => (
                <Link to={`/team/${team.team_id}/players`} key={team.team_id}>
                  <div className="teamProfile">
                    <li key={team.team_id}>
                      <div className="slideshow-img">
                        <img src={team.logo_url} alt="" />
                      </div>
                      <div className="teamDetail">
                        <div className="teamName">{team.name}</div>
                        <div className="result-container">
                          <div className="result win">Win: {team.wins}</div>
                          <div className="result lose">Lose: {team.losses}</div>
                        </div>
                      </div>
                    </li>
                  </div>
                </Link>
              ))}
            </div>
          </ul>
        </div>
      </div>
    )
  }
}
