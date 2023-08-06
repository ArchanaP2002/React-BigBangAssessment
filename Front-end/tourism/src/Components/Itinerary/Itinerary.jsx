import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Button,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import './Itinerary.css';
import { useParams } from 'react-router-dom';
import Tour2 from '../../Images/tour8.jpg';

function Itinerary() {
  const { packageId } = useParams();
  const [itineraryDetails, setItineraryDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    numberOfPeople: '',
    dateOfTheTrip: '',
    totalAmount: '',
    dateOfBooking: '',
  });
  const [openModal, setOpenModal] = useState(false);

  const [formErrors, setFormErrors] = useState({
    userId: '',
    numberOfPeople: '',
    dateOfTheTrip: '',
    totalAmount: '',
    dateOfBooking: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'dateOfTheTrip' || name === 'dateOfBooking') {
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

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.userId) {
      errors.userId = 'User ID is required';
      isValid = false;
    }

    if (!formData.numberOfPeople) {
      errors.numberOfPeople = 'Number of People is required';
      isValid = false;
    } else if (!/^\d+$/.test(formData.numberOfPeople)) {
      errors.numberOfPeople = 'Number of People must be a valid number';
      isValid = false;
    }

    if (!formData.dateOfTheTrip) {
      errors.dateOfTheTrip = 'Date of the Trip is required';
      isValid = false;
    }

    if (!formData.totalAmount) {
      errors.totalAmount = 'Total Amount is required';
      isValid = false;
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.totalAmount)) {
      errors.totalAmount = 'Total Amount must be a valid number (up to 2 decimal places)';
      isValid = false;
    }

    if (!formData.dateOfBooking) {
      errors.dateOfBooking = 'Date of Booking is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        await axios.post('https://localhost:7228/api/Booking', {
          ...formData,
          packageId: packageId,
        });
        setFormData({
          userId: '',
          numberOfPeople: '',
          dateOfTheTrip: '',
          totalAmount: '',
          dateOfBooking: '',
        });
        alert('Booking added successfully');
      } catch (error) {
        console.error('Error adding booking:', error);
      }
    }
  };

  useEffect(() => {
    fetchItineraryDetails();
  }, [packageId]);

  const fetchItineraryDetails = async () => {
    try {
      const response = await axios.get(`https://localhost:7228/api/Itinerary/package/${packageId}`);
      console.log('Itinerary details response:', response.data);

      setItineraryDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching itinerary details:', error);
      setError('Error fetching itinerary details.');
      setLoading(false);
    }
  };

  return (
    <div>
      <Box>
        <section className="hero">
          <img
            src={Tour2}
            alt="Header"
            className="video-bg"
            style={{ width: '100%', height: '800px', objectFit: 'cover', marginTop: '0px' }}
          />
          <Container maxWidth="md">
            <div className="hero-content">
              <Typography variant="h3" gutterBottom>
                Welcome to Your Dream Vacation
              </Typography>
              <Typography variant="h5" paragraph>
                Explore the world with us and experience unforgettable adventures.
              </Typography>
              <Button variant="contained" size="large" className="explore-btn" onClick={handleModalOpen}>
                Book Your Trip
              </Button>
            </div>
          </Container>
        </section>
      </Box>

      <Grid container spacing={3} sx={{ padding: '2rem' }}>
        {itineraryDetails.map((itinerary) => (
          <Grid item xs={12} sm={4} key={itinerary.itineraryId}>
            <Card elevation={3} sx={{ border: '1px solid #ddd' }}>
              <CardMedia
                component="img"
                alt={itinerary.itineraryPlace}
                height="200"
                image={`data:image/jpeg;base64,${itinerary.itineraryImage}`}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 1 }}>
                  {itinerary.itineraryPlace}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Day: {itinerary.dayNumber}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Activities: {itinerary.activities}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Time: {itinerary.time}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={openModal}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              width: '50%',
              maxHeight: '80%',
              overflow: 'auto',
              borderRadius: 8,
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              Booking Details
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="User ID"
                    name="userId"
                    variant="outlined"
                    fullWidth
                    value={formData.userId}
                    onChange={handleInputChange}
                    error={!!formErrors.userId}
                    helperText={formErrors.userId}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Number of People"
                    name="numberOfPeople"
                    variant="outlined"
                    fullWidth
                    value={formData.numberOfPeople}
                    onChange={handleInputChange}
                    error={!!formErrors.numberOfPeople}
                    helperText={formErrors.numberOfPeople}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          error={!!formErrors.dateOfTheTrip}
                          helperText={formErrors.dateOfTheTrip}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Total Amount"
                    name="totalAmount"
                    variant="outlined"
                    fullWidth
                    value={formData.totalAmount}
                    onChange={handleInputChange}
                    error={!!formErrors.totalAmount}
                    helperText={formErrors.totalAmount}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      label="Date of Booking"
                      name="dateOfBooking"
                      value={formData.dateOfBooking ? dayjs(formData.dateOfBooking) : null}
                      onChange={(newDate) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          dateOfBooking: newDate ? newDate.toDate() : null,
                        }))
                      }
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          error={!!formErrors.dateOfBooking}
                          helperText={formErrors.dateOfBooking}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Book Now
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default Itinerary;
