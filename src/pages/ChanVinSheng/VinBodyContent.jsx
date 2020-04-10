import React from "react";
import "./style.scss";
import VinImage from "./1808274.jpg";

export default class VinBodyContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { info } = this.props;
    const items = ["Html", "Javascript", "CSS", "Java", "PHP", "C"];
    return (
      <div className={`container bodyContent`}>
        <h3>About Me</h3>
        <div className={`about-content`}>
          <div className={`about-text`}>
            <p>
              Hello! I'm {info.name}, a {info.occupation} based in {info.add},
              who enjoys coding. I am {info.age} year old , {info.gender}, i
              current undergoing my internship which will last for 6 month
            </p>
            <p>
              i will soon graduate from{" "}
              <a href="https://www.tarc.edu.my/">
                Tunku Abdul Rahman University College
              </a>{" "}
              with the Bachelor of Information Technology (Honours) in Software
              Systems Development
            </p>
            <p>Here is some of my basic skill </p>
            <ul className={`skillList`}>
              {items.map(item => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
          <div className={`about-image`}>
            <a>
              <img src={VinImage} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
