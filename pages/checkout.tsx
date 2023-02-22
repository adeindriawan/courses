import * as React from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography
} from '@mui/material';
import Link from 'next/link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserInfo from '../components/UserInfo';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/Review';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../stores';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        TSA Courses
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Info akun', 'Rincian pembayaran', 'Detail order'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <UserInfo />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const sections = [
    { title: 'Home', url: '/' },
    { title: 'Courses', url: '/catalog' },
    { title: 'About', url: '/about' },
  ];
  const app = useSelector((state: RootState) => state.app)

  const handleNext = () => {
    setActiveStep(activeStep + 1);

    if (activeStep === steps.length - 1) {
      console.log(createVA());
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const createVA = async () => {
    const url = 'https://academy.itsteknosains.co.id/api/test/order/create'
    const data = {
      "courses": [{"id":1,"name":"Training 100","instructor":"Instructor 1","prices":[{"0":100000},{"1":75000},{"2":125000}],"startDate":"2021-11-25 09:00:00","endDate":"2021-11-27 17:00:00","type":1,"image":"training.jpeg"},{"id":2,"name":"Training 2","instructor":"Instructor 2","prices":[],"startDate":"2021-12-01 08:00:00","endDate":null,"type":0,"image":"training.jpeg"}],
      "amount": 100,
      "userId": 1,
      "email": app.user.email,
      "name": app.user.fname + " " + app.user.lname,
      "apiKey": "xnd_development_mW4GIVnkX6JFUeANIQRU5yn7YRr4Vnyrg0PEMuwX00BF8yfnX4CbAbHBc0ok4uig",
      "bankCode": app.bank
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic eG5kX2RldmVsb3BtZW50X21XNEdJVm5rWDZKRlVlQU5JUVJVNXluN1lScjRWbnlyZzBQRU11d1gwMEJGOHlmblg0Q2JBYkhCYzBvazR1aWc6'
      },
      body: JSON.stringify(data)
    });

    return response.json()
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Header title="TSA Courses" sections={sections} />
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Kembali
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Buat order' : 'Lanjut'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}