import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

function App() {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    packageId: '',
    numberOfPeople: '',
    dateOfTheTrip: '',
    totalAmount: '',
    dateOfBooking: '',
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('https://localhost:7228/api/Booking');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'dateOfTheTrip' || name === 'dateOfBooking') { // Handle both date fields
      const parsedDate = dayjs(value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: parsedDate.isValid() ? parsedDate.toDate() : null,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://localhost:7228/api/Booking', formData);
      setFormData({
        userId: '',
        packageId: '',
        numberOfPeople: '',
        dateOfTheTrip: '',
        totalAmount: '',
        dateOfBooking: '',
      });
      alert('Booking added successfully');
      fetchBookings();
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/Booking/${id}`);
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ marginBottom: 2 }}>Booking Management</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="User ID"
                  name="userId"
                  variant="outlined"
                  fullWidth
                  value={formData.userId}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Package ID"
                  name="packageId"
                  variant="outlined"
                  fullWidth
                  value={formData.packageId}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Number of People"
                  name="numberOfPeople"
                  variant="outlined"
                  fullWidth
                  value={formData.numberOfPeople}
                  onChange={handleInputChange}
                />
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Grid item xs={12} sm={6}>
    <DateCalendar
      label="Date of the Trip"
      name="dateOfTheTrip"
      value={formData.dateOfTheTrip ? dayjs(formData.dateOfTheTrip) : null}
      onChange={(newDate) =>
        setFormData((prevData) => ({
          ...prevData,
          dateOfTheTrip: newDate ? newDate.toDate() : null,
        }))
      }
      renderInput={(params) => <TextField fullWidth {...params} />}
    />
  </Grid>
</LocalizationProvider>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Total Amount"
                  name="totalAmount"
                  variant="outlined"
                  fullWidth
                  value={formData.totalAmount}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DateCalendar
      label="Booking Date"
      name="dateOfBooking"
      value={formData.dateOfBooking ? dayjs(formData.dateOfBooking) : null}
      onChange={(newDate) =>
        setFormData((prevData) => ({
          ...prevData,
          dateOfBooking: newDate ? newDate.toDate() : null,
        }))
      }
      renderInput={(params) => <TextField fullWidth {...params} />}
    />
  </LocalizationProvider>
</Grid>

            </Grid>
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Add Booking
            </Button>
          </form>
        </Container>
      </Box>

      <h2>Booking List</h2>
      <Grid container spacing={3}>
        {bookings.map((booking) => (
          <Grid item xs={12} sm={6} key={booking.bookingId}>
            <Card>
              <CardContent>
                <Typography variant="h6">Booking ID: {booking.bookingId}</Typography>
                <Typography>User ID: {booking.userId}</Typography>
                <Typography>Package ID: {booking.packageId}</Typography>
                <Typography>Number of People: {booking.numberOfPeople}</Typography>
                <Typography>Date of the Trip: {booking.dateOfTheTrip}</Typography>
                <Typography>Total Amount: {booking.totalAmount}</Typography>
                <Typography>Date of Booking: {booking.dateOfBooking}</Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(booking.bookingId)}
                  sx={{ marginTop: 2 }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
