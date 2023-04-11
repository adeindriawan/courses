import * as React from 'react';
import {
  Box,
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
import { useOrderHistoryQuery } from '../stores/api';
import { NextPageWithLayout } from './_app';
import Layout from '../components/Layout';

const History: NextPageWithLayout = () => {
  const { data } = useOrderHistoryQuery();
  return (
    <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Histori Pembelian
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Pelatihan/Bootcamp</TableCell>
                    <TableCell align="right">Instruktur</TableCell>
                    <TableCell align="right">Harga</TableCell>
                    <TableCell align="right">Tanggal</TableCell>
                    <TableCell align="right">Tipe</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data && data.data.map((row: any) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.instructor}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Container>
    </Box>
  );
}

History.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default History;
