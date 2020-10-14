import React, { Component } from 'react';
import * as ynab from 'ynab';

class App extends Component {
  state = {}

  componentDidMount() {
    const accessToken = process.env.REACT_APP_API_KEY;
    const ynabAPI = new ynab.API(accessToken);

    ynabAPI.budgets.getBudgets().then(res => {
      console.log(res);
    })
  }

  render() {
    return (
    <React.Fragment>
      <div>Hello World! This is {process.env.REACT_APP_API_KEY}</div>
    </React.Fragment>
    );
  }
}

export default App;