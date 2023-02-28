import * as React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores';
import { setBank } from '../stores/app';

export default function PaymentForm() {
  const bank = useSelector((state: RootState) => state.app.bank)
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    setValue(bank)
  }, [bank]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const bank = (event.target as HTMLInputElement).value;
    setValue(bank);
    dispatch(setBank(bank));
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Metode pembayaran
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Bank</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value="BRI" control={<Radio />} label="Bank Rakyat Indonesia (BRI)" />
              <FormControlLabel value="BNI" control={<Radio />} label="Bank Negara Indonesia (BNI)" />
              <FormControlLabel value="MANDIRI" control={<Radio />} label="Bank Mandiri" />
              <FormControlLabel value="PERMATA" control={<Radio />} label="Bank Permata" />
              <FormControlLabel value="BSI" control={<Radio />} label="Bank Syariah Indonesia (BSI)" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}