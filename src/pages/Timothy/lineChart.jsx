import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import callAPI from '../DotaAPI/FetchFunction'

class LineChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matchData: [],
      lineData: {
        labels: ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '> 60'],
        datasets: [
          {
            // label: 'Games completed within the time',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            lineTension: 0,
            data: [],
          },
        ],
      },
      isLoaded: false,
    }
  }

  async componentDidMount() {
    this.setState({
      matchData: await callAPI('/publicMatches'),
      isLoaded: true,
    })
    this.matchTimeCount()
  }

  matchTimeCount() {
    var gp1 = 0,
      gp2 = 0,
      gp3 = 0,
      gp4 = 0,
      gp5 = 0,
      gp6 = 0,
      gp7 = 0
    const matches = this.state.matchData
    for (const i in matches) {
      if (Math.floor(matches[i].duration / 60) > 60) gp7++
      else if (
        Math.floor(matches[i].duration / 60) > 50 &&
        Math.floor(matches[i].duration) >= 60
      )
        gp6++
      else if (
        Math.floor(matches[i].duration / 60) > 40 &&
        Math.floor(matches[i].duration) >= 50
      )
        gp5++
      else if (
        Math.floor(matches[i].duration / 60) > 30 &&
        Math.floor(matches[i].duration) >= 40
      )
        gp4++
      else if (
        Math.floor(matches[i].duration / 60) > 20 &&
        Math.floor(matches[i].duration) >= 30
      )
        gp3++
      else if (
        Math.floor(matches[i].duration / 60) > 10 &&
        Math.floor(matches[i].duration) >= 20
      )
        gp2++
      else gp1++
    }
    this.setState({
      lineData: {
        datasets: [
          {
            data: [gp1, gp2, gp3, gp4, gp5, gp6, gp7],
          },
        ],
      },
    })
  }

  render() {
    return (
      <div>
        <h4 style={{ margin: 'auto' }}>
          Chart of total number of matches within time range
        </h4>
        <Line
          data={this.state.lineData}
          options={{
            legend: { display: false },
            scales: {
              yAxes: [
                {
                  ticks: { beginAtZero: true },
                  scaleLabel: {
                    display: true,
                    labelString: 'Count',
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Duration (mins)',
                  },
                },
              ],
            },
          }}
        />
      </div>
    )
  }
}

export default LineChart
