import React from "react";
import VinHeaderContent from "./VinHeaderContent";
import VinBodyContent from "./VinBodyContent";
import VinRightSticky from "./VinRightSticky";

export default class VinLandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.myRefName = React.createRef();
    this.myRefAge = React.createRef();
    this.myRefOccupation = React.createRef();
    this.myRefAdd = React.createRef();

    this.state = {
      name: "Chan Vin Sheng",
      age: "22",
      gender: "Male",
      occupation: "Student",
      add: "KL",
      hobby: "",
      hide: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.ShowForm = this.ShowForm.bind(this);
  }

  ShowForm(e) {
    this.setState({ hide: !this.state.hide });
  }

  handleSubmit(event) {
    this.setState({ name: this.myRefName.current.value });
    this.setState({ age: this.myRefAge.current.value });
    this.setState({ occupation: this.myRefOccupation.current.value });
    this.setState({ add: this.myRefAdd.current.value });
  }

  render() {
    return (
      <div className={`content-vin`}>
        <div className={`container-button`}>
          <button onClick={this.ShowForm}>Edit</button>
        </div>
        <div style={{ visibility: this.state.hide ? "hidden" : "visible" }}>
          <div className={`detail-form detail-input`}>
            <label htmlFor="username">Enter username</label>
            <input
              name="name"
              placeholder={this.state.name}
              onChange={this.onChange}
              ref={this.myRefName}
              type="text"
            />
            <label htmlFor="username">Enter Age</label>
            <input
              name="age"
              placeholder={this.state.age}
              onChange={this.onChange}
              ref={this.myRefAge}
              type="text"
            />
            <label htmlFor="username">Enter Occupation</label>
            <input
              name="oocupation"
              placeholder={this.state.occupation}
              onChange={this.onChange}
              ref={this.myRefOccupation}
              type="text"
            />
            <label htmlFor="username">Enter Address</label>
            <input
              name="address"
              placeholder={this.state.add}
              onChange={this.onChange}
              ref={this.myRefAdd}
              type="text"
            />
          </div>
          <div className={`detail-button`}>
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>

        <VinRightSticky />
        <VinHeaderContent info={this.state} />
        <VinBodyContent info={this.state} />
      </div>
    );
  }
}
