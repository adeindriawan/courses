import * as React from 'react';
import { 
  Avatar,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Snackbar,
  TextField,
  Typography
 } from '@mui/material';
import Link from 'next/link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useLoginMutation } from '../stores/api';
import { useRouter } from 'next/router';
import Copyright from '../components/Copyirght';
import { NextPageWithLayout } from './_app';
import Layout from '../components/Layout';

const SignIn: NextPageWithLayout = () => {
  const [feedbackMessage, setFeedbackMessage] = React.useState('');
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')
    const password = data.get('password')

    try {
      const response = await login({ email, password}).unwrap();

      if (response.status === 'success') {
        setFeedbackMessage(`Login berhasil, Anda akan diarahkan ke halaman Catalog.`);
        setTimeout(() => {
          router.push('/catalog');  
        }, 3000);
      } else {
        setFeedbackMessage(`${response.description[0]}`);
      }
    } catch (error) {
      setFeedbackMessage(`Ada masalah pada saat login. Cobalah beberapa saat lagi.`)
      console.log(error)
    }
  };

  const ButtonFeedback = ({ title }: { title: string}) => {
    return (
      <Snackbar
        open={feedbackMessage != ''}
        autoHideDuration={4000}
        onClose={() => { setFeedbackMessage('') }}
        message={feedbackMessage}
      />
    );
  }
  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Masuk
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Alamat email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Kata sandi"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#">
                Lupa kata sandi?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup">
                {"Belum punya akun? daftar"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ButtonFeedback title={feedbackMessage} />
    </>
  );
}

SignIn.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default SignIn;
