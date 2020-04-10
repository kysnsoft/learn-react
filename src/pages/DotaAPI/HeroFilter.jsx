import React from "react";
import "./HeroApi.scss";
import { Link } from "react-router-dom";

export default class HeroFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { heroInfo, heroAtt } = this.props;
    const add = "http://cdn.dota2.com/";
    return (
      <div className={`hero-container`}>
        {heroInfo
          .filter(hero => hero.primary_attr === heroAtt)
          .map(item => (
            <div key={item.id}>
              <span className="tooltip-text">
                {item.localized_name} | {item.attack_type}
              </span>
              <Link
                to={{
                  pathname: `../DotaAPI/HeroProfile/${item.localized_name}`,
                  state: {
                    heroInfo: heroInfo
                  }
                }}
              >
                <img className={`hero-img`} src={add + item.img} />
              </Link>
            </div>
          ))}
      </div>
    );
  }
}
