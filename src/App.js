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
        const assets = {};
        res.data.transactions.forEach((transaction) => {
          let memo = transaction.memo;
          let asset_id = null;
          let asset_event = null;

          if (memo.includes('{')) {
            memo = memo.match('^(.(?!{([^}]+)}))*')[0];
            asset_id = transaction.memo.match('{([^}]+)}')[1].split(',')[0];
            asset_event = transaction.memo.match('{([^}]+)}')[1].split(',')[1];
          }

          let transactionObject = {
            id: transaction.id,
            date: transaction.date,
            amount: transaction.amount / 100,
            memo: memo,
            asset_id: asset_id,
            asset_event: asset_event,
          };

          if (!assets[asset_id]) {
            assets[asset_id] = {
              transactions: [],
              date: transaction.date,
              name: memo,
              amount: transaction.amount / 100,
            };
          }

          assets[asset_id].transactions.push(transactionObject);

          if (asset_event === 'new') {
            assets[asset_id].date = transaction.date;
            assets[asset_id].name = memo;
          }

          const prevAmount = assets[asset_id].amount;
          assets[asset_id].amount = prevAmount + transaction.amount / 100;
        });

        this.setState({ assets: assets });
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
