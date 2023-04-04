import { useState, useEffect } from 'react';
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  Snackbar,
  TextField
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../stores/app';
import { RootState } from '../stores';
import { useUpdateUserProfileMutation } from '../stores/api';

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
  const [openFeedback, setOpenFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const user = useSelector((state: RootState) => state.app.user);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    id: user.id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    phone: user.phone,
    employment: user.employment,
    avatar_url: ''
  });

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value
    });
  };

  const [updateProfile, { isLoading, data }] = useUpdateUserProfileMutation();

  useEffect(() => {
    if (data) {
      setOpenFeedback(true);
      if (data.status == 'success') {
        setFeedbackMessage('Data akun berhasil diperbarui');
      } else {
        setFeedbackMessage('Data akun gagal diperbarui');
      }
    }
  }, [data]);

  const handleSaveButtonClick = () => {
    updateProfile(values);
    dispatch(updateUser(values));
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenFeedback(false);
  };

  const ButtonFeedback = ({ title }: { title: string}) => {
    return (
      <Snackbar
        open={openFeedback}
        autoHideDuration={3000}
        onClose={handleClose}
        message={title}
      />
    );
  }

  return (
    <>
      <form
        autoComplete="off"
        noValidate
        {...props}
      >
        <Card>
          <CardHeader
            subheader="Informasi di bawah ini dapat diedit"
            title="Profil"
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
                  name="fname"
                  onChange={handleChange}
                  required
                  value={values.fname}
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
                  name="lname"
                  onChange={handleChange}
                  required
                  value={values.lname}
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
                  type="text"
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
                  value={values.employment}
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
              onClick={handleSaveButtonClick}
            >
              Simpan
            </Button>
          </Box>
        </Card>
      </form>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ButtonFeedback title={feedbackMessage} />
    </>
  );
};