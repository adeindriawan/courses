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

export default function PaymentForm() {
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
              defaultValue="bni"
              name="radio-buttons-group"
            >
              <FormControlLabel value="bri" control={<Radio />} label="BRI" />
              <FormControlLabel value="bni" control={<Radio />} label="BNI" />
              <FormControlLabel value="mandiri" control={<Radio />} label="Mandiri" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}