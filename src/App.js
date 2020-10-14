import React, { Component } from 'react';
import * as ynab from 'ynab';

class App extends Component {
  state = {};

  componentDidMount() {
    const accessToken = process.env.REACT_APP_API_KEY;
    const ynabAPI = new ynab.API(accessToken);

    ynabAPI.transactions
      .getTransactionsByAccount(process.env.REACT_APP_BUDGET_ID, process.env.REACT_APP_ASSET_ID)
      .then((res) => {
        const transactions = [];
        res.data.transactions.forEach((transaction) => {
          let memo = transaction.memo;
          let asset_id = null;
          let asset_memo = null;

          if (memo.includes('{')) {
            memo = memo.match('^(.(?!{([^}]+)}))*')[0];
            asset_id = transaction.memo.match('{([^}]+)}')[1].split(',')[0];
            asset_memo = transaction.memo.match('{([^}]+)}')[1].split(',')[1];
          }

          transactions.push({
            id: transaction.id,
            date: transaction.date,
            amount: transaction.amount / 100,
            memo: memo,
            asset_id: asset_id,
            asset_event: asset_memo,
          });
        });

        this.setState({ transactions: transactions });
      });
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
