import React from 'react'
import BasePage from '../basePage/basePage'
import './timothy.scss'

function stringifyFormData(fd) {
  const data = {}
  for (let key of fd.keys()) {
    data[key] = fd.get(key)
  }
  return JSON.stringify(data, null, 2)
}

function displayResult(data, field) {
  const toRender = JSON.parse(data)
  console.log(toRender[field])
  return toRender[field]
}

export default class Timothy extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      name: '',
      age: 0,
      place: '',
      occupation: '',
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)

    this.setState({
      res: stringifyFormData(data),
    })
  }

  displayResult(data, field) {
    const toRender = JSON.parse(data)
    console.log(toRender[field])
    return toRender[field]
  }

  render() {
    return (
      <BasePage>
        <div className="container box">
          <div className={'card-layout'}>
            <div className="user-input-field">
              <form onSubmit={this.handleSubmit}>
                <table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>
                        <input type="text" name="name" id="name" />
                      </td>
                    </tr>
                    <tr>
                      <th>Age</th>
                      <td>
                        <input type="number" name="age" id="age" />
                      </td>
                    </tr>
                    <tr>
                      <th>Birth place</th>
                      <td>
                        <input type="text" name="place" id="place" />
                      </td>
                    </tr>
                    <tr>
                      <th>Occupation</th>
                      <td>
                        <input type="text" name="occupation" id="occupation" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button type="submit">Save</button>
              </form>
            </div>

            {this.state.res && (
              <div className={'desc-panel res-block'}>
                <h6>Hi, I am</h6>
                <h3>{this.displayResult(this.state.res, 'name')}</h3>
                <p>
                  Currently {this.displayResult(this.state.res, 'age')}, bornt
                  in {this.displayResult(this.state.res, 'place')}
                </p>
                <h4>
                  Worked as a {this.displayResult(this.state.res, 'occupation')}
                </h4>
              </div>
            )}
          </div>
        </div>
      </BasePage>
    )
  }
}
