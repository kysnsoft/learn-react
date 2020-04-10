import React, { Component } from 'react'
import { HorizontalBar, Line, Pie } from 'react-chartjs-2'
import moment from 'moment'
import callApi from "../DotaAPI/FetchFunction"

export default class ItemChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            backgroundColor: [],
            labels: [],
            data: [],
            chartData: {},
            loading: true
        }
    }

    async componentDidMount() {
        const startDate = this.state.startDate.getTime() / 1000
        const endDate = this.state.endDate.getTime() / 1000

        const queryUrl = `/explorer?sql=SELECT%0A%20%20%20%20%20%20%20%20key0.key%20item_name%2C%0Asum(key0.value%3A%3Atext%3A%3Aint)%3A%3Anumeric%2Fcount(distinct%20matches.match_id)%20%22AVG%20Item%20Purchased%22%2C%0Acount(distinct%20matches.match_id)%20count%2C%0Asum(case%20when%20(player_matches.player_slot%20%3C%20128)%20%3D%20radiant_win%20then%201%20else%200%20end)%3A%3Afloat%2Fcount(1)%20winrate%2C%0A((sum(case%20when%20(player_matches.player_slot%20%3C%20128)%20%3D%20radiant_win%20then%201%20else%200%20end)%3A%3Afloat%2Fcount(1))%20%0A%2B%201.96%20*%201.96%20%2F%20(2%20*%20count(1))%20%0A-%201.96%20*%20sqrt((((sum(case%20when%20(player_matches.player_slot%20%3C%20128)%20%3D%20radiant_win%20then%201%20else%200%20end)%3A%3Afloat%2Fcount(1))%20*%20(1%20-%20(sum(case%20when%20(player_matches.player_slot%20%3C%20128)%20%3D%20radiant_win%20then%201%20else%200%20end)%3A%3Afloat%2Fcount(1)))%20%2B%201.96%20*%201.96%20%2F%20(4%20*%20count(1)))%20%2F%20count(1))))%0A%2F%20(1%20%2B%201.96%20*%201.96%20%2F%20count(1))%20winrate_wilson%2C%0Asum(key0.value%3A%3Atext%3A%3Aint)%20sum%2C%0Amin(key0.value%3A%3Atext%3A%3Aint)%20min%2C%0Amax(key0.value%3A%3Atext%3A%3Aint)%20max%2C%0Astddev(key0.value%3A%3Atext%3A%3Aint%3A%3Anumeric)%20stddev%0A%20%20%0AFROM%20matches%0AJOIN%20match_patch%20using(match_id)%0AJOIN%20leagues%20using(leagueid)%0AJOIN%20player_matches%20using(match_id)%0AJOIN%20heroes%20on%20heroes.id%20%3D%20player_matches.hero_id%0ALEFT%20JOIN%20notable_players%20ON%20notable_players.account_id%20%3D%20player_matches.account_id%0ALEFT%20JOIN%20teams%20using(team_id)%0A%2C%20json_each(player_matches.purchase)%20key0%0AWHERE%20TRUE%0AAND%20key0.key%20IS%20NOT%20NULL%20%0AAND%20matches.start_time%20%3E%3D%20${startDate}%0AAND%20matches.start_time%20%3C%3D%20${endDate}%0AGROUP%20BY%20key0.key%0AHAVING%20count(distinct%20matches.match_id)%20%3E%3D%201%0AORDER%20BY%20%22AVG%20Item%20Purchased%22%20DESC%2Ccount%20DESC%20NULLS%20LAST%0ALIMIT%20200`
        const data = await callApi(queryUrl)

        const { items } = this.props
        const { rows } = data

        const findItems = rows.map(row => ({
            items: items[row.item_name],
            totalPurchase: row.count
        }))

        const filteredItems = findItems.filter(
            findItem => {
                if ((findItem.items.attrib).find(item =>
                    item.footer === "Movement Speed"))
                    return findItem
            }
        )

        filteredItems.map(filteredItem => {
            let x = Math.floor(Math.random() * 256);
            let y = Math.floor(Math.random() * 256);
            let z = Math.floor(Math.random() * 256);
            let bgColor = "rgb(" + x + "," + y + "," + z + ")";
            this.setState({
                labels: [
                    ...this.state.labels,
                    filteredItem.items.dname
                ],
                data: [
                    ...this.state.data,
                    filteredItem.totalPurchase
                ],
                backgroundColor: [
                    ...this.state.backgroundColor,
                    bgColor
                ]
            })
        })

        this.setState({
            chartData: {
                labels: this.state.labels,
                datasets: [{
                    data: this.state.data,
                    label: 'Quantity',
                    backgroundColor: this.state.backgroundColor
                }]
            },
            startDate,
            endDate,
            loading: false
        })

    }


    render() {

        const { startDate, endDate, loading } = this.state

        if (loading) return <div>Loading</div>


        return (
            <div className="chart">
                <HorizontalBar
                    data={this.state.chartData}
                    width={450}
                    height={450}
                    options={{
                        maintainAspectRatio: false,
                        title: {
                            display: true,
                            text: ['Total items purchased (Bonus Movement Speed)',
                                `From ${moment(startDate * 1000).format("L")} to ${moment(endDate * 1000).format("L")}`],
                            fontSize: 22
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
        )
    }
}
