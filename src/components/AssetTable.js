import React from 'react';

import AssetTableRow from './AssetTableRow';

import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const assetTable = (props) => {
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
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
              ? props.rows.map(([key, row]) => <AssetTableRow key={key} id={key} row={row} />)
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default assetTable;
