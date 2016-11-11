import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { animals: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/animals')
    .then((response) => {
      this.setState({animals: response.data})
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleDestroy(e) {
    e.preventDefault();
    let id = parseInt(e.target.className, 10);
    axios({
      method: 'delete',
      url: 'http://localhost:3001/animals/' + id
    })
    .then((response) => {
      this.setState({animals: response.data})
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Denver Animal Shelter</h2>
        </div>
        <p className="App-intro">
          Open 24 hours!!! Just a kidding.
        </p>
        <div>
        <h3>Looking for a life time family.</h3>

          {this.state.animals.map((animal) =>
          <div className="Animal" key={animal.id}>
            <img src={animal.url} alt="waiting for you!"/><br />
            Name: {animal.name}<br />
            Age: {animal.age}<br />
            Gender: {animal.gender}<br />
            Description: {animal.description}
            <button className={animal.id} onClick={this.handleDestroy}>Delete</button>
          </div>)}
        </div>
      </div>
    );
  }
}

export default App;
