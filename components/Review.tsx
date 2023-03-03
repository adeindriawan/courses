import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { RootState } from '../stores';

export default function Review() {
  const cart = useSelector((state: RootState) => state.cart)
  const cartTotal = useSelector((state: RootState) => state.app.cartTotal)
  const user = useSelector((state: RootState) => state.app.user)
  const bank = useSelector((state: RootState) => state.app.bank)

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Rincian order
      </Typography>
      <List disablePadding>
        {cart.map((item) => (
          <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={item.name} secondary={item.shortDetail} />
            <Typography variant="body2">{`Rp${Object.values(item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {`Rp${cartTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Info akun
          </Typography>
          <Typography gutterBottom>{`${user.fname} ${user.lname}`}</Typography>
          <Typography gutterBottom>{`${user.email}`}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Rincian pembayaran
          </Typography>
          <Grid container>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>Bank</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{bank}</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}