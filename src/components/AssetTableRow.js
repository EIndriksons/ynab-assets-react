import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const AssetTableRow = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  let prevAmount = 0;

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.id}
        </TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell align="right">{(row.amount / 1000).toFixed(2)}</TableCell>
        <TableCell align="right">
          <Fab
            color="default"
            aria-label="add"
            size="small"
            align="right"
            onClick={() => props.inputOpen(props.id)}
          >
            <AddIcon />
          </Fab>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Event</TableCell>
                    <TableCell>Memo</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Acc. Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.transactions.map((transaction) => {
                    let chipColor;
                    switch (transaction.asset_event) {
                      case 'new':
                        chipColor = '#4caf50';
                        break;
                      case 'add':
                        chipColor = '#8bc34a';
                        break;
                      case 'depreciation':
                        chipColor = '#ff5722';
                        break;
                      case 'sold':
                        chipColor = '#2196f3';
                        break;
                      default:
                    }
                    prevAmount = prevAmount + transaction.amount;
                    return (
                      <TableRow key={transaction.id}>
                        <TableCell component="th" scope="row">
                          {transaction.date}
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={transaction.asset_event}
                            style={{ backgroundColor: chipColor }}
                          />
                        </TableCell>
                        <TableCell>{transaction.memo}</TableCell>
                        <TableCell align="right">
                          {(transaction.amount / 1000).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">{(prevAmount / 1000).toFixed(2)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default AssetTableRow;
