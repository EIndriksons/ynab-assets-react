import React from 'react';
import * as ynab from 'ynab';

import AssetTableRow from './AssetTableRow';
import InputForm from './InputForm';

import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const AssetTable = (props) => {
  const [openInput, setOpenInput] = React.useState({
    open: false,
    id: null,
  });

  const handleClickOpen = (id) => {
    setOpenInput({
      open: true,
      id: id,
    });
  };

  const handleClose = () => {
    setOpenInput({
      open: false,
      id: null,
    });
  };

  const createTransaction = (assetId, assetEvent, date, memo, amount) => {
    const accessToken = process.env.REACT_APP_API_KEY;
    const ynabAPI = new ynab.API(accessToken);
    const data = {
      transaction: {
        account_id: process.env.REACT_APP_ASSET_ID,
        date: '2020-10-19',
        amount: amount * 1000,
        payee_id: null,
        payee_name: null,
        category_id: null,
        memo: `${memo} {${assetId},${assetEvent}}`,
        cleared: 'cleared',
        approved: true,
        flag_color: null,
        import_id: null,
        subtransactions: null,
      },
    };

    ynabAPI.transactions
      .createTransaction(process.env.REACT_APP_BUDGET_ID, data)
      .then((res) => {
        props.updateHandler(res, assetId, assetEvent);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenInput({
      open: false,
      id: null,
    });
  };

  return (
    <Box m={2}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Memo</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
              ? props.rows.map(([key, row]) => (
                  <AssetTableRow key={key} id={key} row={row} inputOpen={handleClickOpen} />
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <InputForm
        ifOpen={openInput}
        closeHandler={handleClose}
        assetId={openInput.id}
        createTransaction={createTransaction}
      />
    </Box>
  );
};

export default AssetTable;
