import React, { Component } from 'react';
import * as ynab from 'ynab';

import AppBar from './components/AppBar';
import AssetTable from './components/AssetTable';

class App extends Component {
  state = { assets: null };

  componentDidMount() {
    const accessToken = process.env.REACT_APP_API_KEY;
    const ynabAPI = new ynab.API(accessToken);

    ynabAPI.transactions
      .getTransactionsByAccount(process.env.REACT_APP_BUDGET_ID, process.env.REACT_APP_ASSET_ID)
      .then((res) => {
        const assets = {};
        res.data.transactions.forEach((transaction) => {
          let id = transaction.id;
          let date = transaction.date;
          let amount = transaction.amount;
          let memo = transaction.memo.includes('{')
            ? transaction.memo.match('^(.(?!{([^}]+)}))*')[0]
            : transaction.memo;
          let asset_id = transaction.memo.includes('{')
            ? transaction.memo.match('{([^}]+)}')[1].split(',')[0]
            : null;
          let asset_event = transaction.memo.includes('{')
            ? transaction.memo.match('{([^}]+)}')[1].split(',')[1]
            : null;

          let transactionObject = {
            id: id,
            date: date,
            amount: amount,
            memo: memo,
            asset_id: asset_id,
            asset_event: asset_event,
          };

          if (!assets[asset_id]) {
            assets[asset_id] = {
              transactions: [transactionObject],
              date: date,
              name: memo,
              amount: amount,
              active: true,
            };
          } else {
            assets[asset_id].transactions.push(transactionObject);
            if (asset_event === 'new') {
              assets[asset_id].date = date;
              assets[asset_id].name = memo;
            }
            const prevAmount = assets[asset_id].amount;
            assets[asset_id].amount = prevAmount + amount;
          }

          if (assets[asset_id].amount === 0) {
            assets[asset_id].active = false;
          }
        });

        this.setState({ assets: assets });
      });
  }

  render() {
    return (
      <React.Fragment>
        <AppBar />
        <AssetTable rows={this.state.assets ? Object.entries(this.state.assets) : null} />
      </React.Fragment>
    );
  }
}

export default App;
