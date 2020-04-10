import React from 'react'
import HeroApi from '../DotaAPI/HeroApi'
import ItemApi from '../YC_Liew/Dota2'
import MatchAPI from '../ChokKahYang/MatchAPI'
import BasePage from '../basePage/basePage'
import DotaTeam from '../Timothy/proteams'
import callApi from '../DotaAPI/FetchFunction'

export default class DotaApi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      publicMatches: [],
      heroStats: [],
      clusters: [],
      items: [],
      itemsID: [],
      isLoaded: false,
    }
  }

  async componentDidMount() {
    this.setState({
      publicMatches: await callApi('/publicMatches'),
      heroStats: await callApi('/heroStats'),
      clusters: await callApi('/constants/cluster'),
      items: await callApi('/constants/items'),
      itemsID: await callApi(`/constants/item_ids`),
      isLoaded: true,
    })
  }

  render() {
    const {
      isLoaded,
      publicMatches,
      heroStats,
      clusters,
      items,
      itemsID,
    } = this.state
    if (!isLoaded) return <div>Loading...</div>
    
    return (
      <BasePage title="Dota 2">
        <h2 className="ml-5 mt-2 text-white font-weight-bold">
          {' '}
          Match (KY Chok)
        </h2>
        <MatchAPI
          publicMatches={publicMatches}
          heros={heroStats}
          clusters={clusters}
          items={items}
          itemsID={itemsID}
        />
        <h2 className="ml-5 mt-2 text-white font-weight-bold">
          {' '}
          Heroes (Chan Vin Sheng)
        </h2>
        <HeroApi items={heroStats} />
        <h2 className="ml-5 mt-2 text-white font-weight-bold"> Items (Liew Yih Chan)</h2>
        <ItemApi itemss={items} />
        <h2 className="ml-5 mt-2 text-white font-weight-bold"> Teams (Tim)</h2>
        <DotaTeam />
      </BasePage>
    )
  }
}
