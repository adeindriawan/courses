import { ReactElement } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Container,
  CssBaseline
} from '@mui/material';
import { Provider } from 'react-redux'
import store from '../stores'
import Header from './Header';
import Footer from './Footer';

const theme = createTheme();

export default function Layout({ children }: { children: ReactElement }) {
  const sections = [
    { title: 'Home', url: '/' },
    { title: 'Catalog', url: '/catalog' },
    { title: 'About', url: '/about' },
  ];
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Header title="Courses" sections={sections} />
          <main>{children}</main>
          <Footer
            title="Courses By ITS Tekno Sains"
            description="A collection of trainings & bootcamps by ITS Tekno Sains"
          />
        </Container>
      </ThemeProvider>
    </Provider>
  )
}