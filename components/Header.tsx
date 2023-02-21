import * as React from 'react';
import styled from '@emotion/styled';
import {
  Badge,
  Button,
  Toolbar,
  IconButton,
  Typography
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../stores';

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

export default function Header(props: HeaderProps) {
  const { sections, title } = props;
  const CustomLink = styled.div`
    color: red;
    padding: 10px;
  `
  const cart = useSelector((state: RootState) => state.cart)
  const app = useSelector((state: RootState) => state.app)

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <Button size="small" sx={{ marginRight: 5 }}>install</Button>
        <IconButton sx={{ marginRight: 5 }}>
          <Link href="/cart">
            <Badge badgeContent={cart.length} color="primary" showZero>
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </IconButton>
        <Button variant="outlined" size="small">
          {
            (app.authenticated) ?
            <Link href="/account">
              Account
            </Link> :
            <Link href="/signup">
              Sign up
            </Link>
          }
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'center', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            key={section.title}
            href={section.url}
          >
            <CustomLink>{section.title}</CustomLink>
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}