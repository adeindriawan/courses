import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../stores';

const employmentStatuses = [
  {
    value: 1,
    label: 'Pelajar/Mahasiswa'
  },
  {
    value: 2,
    label: 'Karyawan'
  },
  {
    value: 3,
    label: 'Freelancer/Self-employed'
  },
  {
    value: 4,
    label: 'Tidak bekerja/Job seeker'
  },
  {
    value: 5,
    label: 'Guru/Dosen/Akademisi'
  },
  {
    value: 6,
    label: 'Manajer/Direktur/Wirausaha'
  }
];

export const AccountProfileDetails = (props: object) => {
  const user = useSelector((state: RootState) => state.app.user)
  const [values, setValues] = useState({
    firstName: user.fname,
    lastName: user.lname,
    email: user.email,
    phone: user.phone,
    employmentStatus: user.employment
  });

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Employment status"
                name="employment"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.employmentStatus}
                variant="outlined"
              >
                {employmentStatuses.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};