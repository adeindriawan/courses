import * as React from 'react';
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRegisterMutation } from '../stores/api';
import { useRouter } from 'next/router';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        TSA Courses
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [register, { isLoading, data, error }] = useRegisterMutation();
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    register({
      fname: data.get('firstName'),
      lname: data.get('lastName'),
      phone: data.get('phone'),
      employment: data.get('employment'),
      email: data.get('email'),
      password: data.get('password'),
      password_confirmation: data.get('password')
    });
    router.push('/signin');
  };

  const [value, setValue] = React.useState('');
  const employment = '';

  React.useEffect(() => {
    setValue(employment)
  }, [employment]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const employment = (event.target as HTMLInputElement).value;
    setValue(employment);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone number"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Status Karir</FormLabel>
                    <RadioGroup
                    aria-label="employment"
                    name="employment"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Pelajar/Mahasiswa"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="Karyawan"
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio />}
                      label="Freelancer/Self-employed"
                    />
                    <FormControlLabel
                      value="4"
                      control={<Radio />}
                      label="Tidak bekerja/Jobseeker"
                    />
                    <FormControlLabel
                      value="5"
                      control={<Radio />}
                      label="Guru/Dosen/Akademisi"
                    />
                    <FormControlLabel
                      value="6"
                      control={<Radio />}
                      label="Manajer/Direktur/Wirausaha"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}