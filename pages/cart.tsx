import * as React from 'react';
import { 
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
 } from '@mui/material';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../stores';
import { NextPageWithLayout } from './_app';
import Layout from '../components/Layout';

const types = ["Online", "Offline", "Livestream"];

const Cart: NextPageWithLayout = () => {
  const cart = useSelector((state: RootState) => state.cart);
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nama Kursus/Pelatihan</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Instruktur&nbsp;</TableCell>
                <TableCell align="right">Tanggal&nbsp;</TableCell>
                <TableCell align="right">Tipe&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.id}</TableCell>
                  <TableCell align="right">{item.instructor}</TableCell>
                  <TableCell align="right">{item.startDate}</TableCell>
                  <TableCell align="right">{types[item.type]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button sx={{ marginTop: 5, marginRight: 1 }} variant="outlined" size="small">
          <Link href="/catalog">
            Back
          </Link>
        </Button>
        <Button sx={{ marginTop: 5 }} variant="contained" size="small">
          <Link href="/checkout">
            Checkout
          </Link>
        </Button>
      </Grid>
    </Container>
  );
};

Cart.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default Cart;
