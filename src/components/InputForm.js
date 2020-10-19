import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Box from '@material-ui/core/Box';

const InputForm = (props) => {
  const [date, setDate] = React.useState(new Date());
  const [assetEvent, setAssetEvent] = React.useState('add');
  const [memo, setMemo] = React.useState(null);
  const [amount, setAmount] = React.useState(null);

  return (
    <div>
      <Dialog
        open={props.ifOpen.open}
        onClose={props.closeHandler}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Transaction</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={date}
                onChange={(date) => setDate(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>

            <TextField
              id="asset_event"
              select
              label="Transaction event"
              helperText="Please select the transaction event"
              defaultValue="add"
              margin="dense"
              onChange={(e) => setAssetEvent(e.target.value)}
            >
              <MenuItem value="add">Add</MenuItem>
              <MenuItem value="depreciation">Depreciation</MenuItem>
              <MenuItem value="sold">Sold</MenuItem>
            </TextField>

            <TextField
              autoFocus
              margin="dense"
              id="memo"
              label="Memo"
              type="email"
              fullWidth
              onChange={(e) => setMemo(e.target.value)}
            />
            <TextField
              id="amount"
              label="Transaction amount"
              margin="dense"
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start">€</InputAdornment> }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeHandler} color="secondary">
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => props.createTransaction(props.assetId, assetEvent, date, memo, amount)}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InputForm;
