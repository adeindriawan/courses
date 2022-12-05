import * as React from 'react';
import styled from '@emotion/styled';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

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

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small">install</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton href="/checkout">
          <ShoppingCartIcon />
        </IconButton>
        <Button variant="outlined" size="small">
          <Link href="/signup">
            Sign up
          </Link>
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