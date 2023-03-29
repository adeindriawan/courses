import * as React from 'react';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import Link from 'next/link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRegisterMutation } from '../stores/api';
import { useRouter } from 'next/router';
import Copyright from '../components/Copyirght';

const theme = createTheme();

interface NewUser {
  firstName: string;
  lastName: string;
  phone: string;
  employment: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function SignUp() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [feedbackMessage, setFeedbackMessage] = React.useState('');
  const [register] = useRegisterMutation();
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const user = {
      fname: formData.get('firstName'),
      lname: formData.get('lastName'),
      phone: formData.get('phone'),
      employment: formData.get('employment'),
      email: formData.get('email'),
      password: formData.get('password'),
      password_confirmation: formData.get('password')
    }

    try {
      const response = await register(user).unwrap();

      if (response.status == 'success') {
        setIsLoading(false)
        setFeedbackMessage(`Registrasi berhasil, Anda akan diarahkan ke halaman Login`)
        setTimeout(() => {
          router.push('/signin')
        }, 3000);
      } else {
        setFeedbackMessage(response.description[0])
        setIsLoading(false)
      }
    } catch (error) {
      setFeedbackMessage(`Ada masalah pada saat registrasi. Coba beberapa saat lagi.`)
      setIsLoading(false)
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
                  label="Nama depan"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Nama belakang"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="No HP/WA"
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
                  label="Alamat email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Kata sandi"
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ButtonFeedback title={feedbackMessage} />
    </ThemeProvider>
  );
}