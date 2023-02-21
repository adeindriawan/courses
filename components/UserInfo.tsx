import * as React from 'react';
import {
  Grid,
  Typography,
  TextField
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../stores';

export default function UserInfo() {
  const user = useSelector((state: RootState) => state.app.user)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Info akun
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            id="firstName"
            name="firstName"
            label="Nama depan"
            value={user.fname}
            fullWidth
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            id="lastName"
            name="lastName"
            label="Nama belakang"
            value={user.lname}
            fullWidth
            autoComplete="family-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            id="email"
            name="email"
            label="Email"
            value={user.email}
            fullWidth
            autoComplete="email"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="phone"
            value={user.phone}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}