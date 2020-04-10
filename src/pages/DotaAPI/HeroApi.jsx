import React from "react";
import "./HeroApi.scss";
import HeroFilter from "../DotaAPI/HeroFilter";
import callApi from "../DotaAPI/FetchFunction";

export default class HeroApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      isLoaded: true
    };
  }

  componentDidMount() {
    // fetch("https://api.opendota.com/api/heroStats")
    //   .then(res => res.json())
    //   .then(json => {
    //     this.setState({
    //       items: json,
    //       isLoaded: true
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // this.setState({
    //   items: await callApi("/heroStats"),
    //   isLoaded: true
    // });
  }

  render() {
    const { isLoaded, items } = this.state;
    if (!isLoaded) return <div>Loading...</div>;

    return (
      <div>
        <div className={`hero-container-list`}>
          <h3>Strength</h3>
          <HeroFilter heroInfo={items} heroAtt={"str"} />
          <h3>Agility</h3>
          <HeroFilter heroInfo={items} heroAtt={"agi"} />
          <h3>Intelligent</h3>
          <HeroFilter heroInfo={items} heroAtt={"int"} />
        </div>
      </div>
    );
  }
}
