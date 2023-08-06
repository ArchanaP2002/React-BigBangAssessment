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
  CardMedia,
  CardContent,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useParams } from 'react-router-dom';
import Tour2 from '../../Images/Image1.jpeg';

const timeSuggestions = [
  'Morning',
  'Afternoon',
  'Evening',
  'Full Day',
  'Half Day',
  // Add more time suggestions as needed
];

function ItineraryManagement() {
  const { packageId } = useParams();
  const [itineraryDetails, setItineraryDetails] = useState([]);
  const [formData, setFormData] = useState({
    dayNumber: '',
    activities: '',
    time: '',
    itineraryPlace: '',
    itineraryImage: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      itineraryImage: event.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('time', formData.time); // Move this line here

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      formDataToSend.append('packageId', packageId);
      await axios.post('https://localhost:7228/api/Itinerary', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData({
        dayNumber: '',
        activities: '',
        time: '',
        itineraryPlace: '',
        itineraryImage: '',
      });
      alert('Itinerary detail added successfully');
      fetchItineraryDetails();
    } catch (error) {
      console.error('Error adding itinerary detail:', error);
    }
  };

  const validateForm = () => {
    if (
      formData.dayNumber.trim() === '' ||
      formData.activities.trim() === '' ||
      formData.time.trim() === '' ||
      formData.itineraryPlace.trim() === '' ||
      formData.itineraryImage === null
    ) {
      return false;
    }
    return true;
  };

  const handleDelete = async (itineraryId) => {
    try {
      await axios.delete(`https://localhost:7228/api/Itinerary/${itineraryId}`);
      fetchItineraryDetails();
    } catch (error) {
      console.error('Error deleting itinerary:', error);
    }
  };

  return (
    <div>
      <Box>
        <img
          src={Tour2}
          alt="Header Image"
          style={{ width: '100%', height: '800px', objectFit: 'cover', marginTop: '0px' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            padding: '2rem',
            marginTop: 0,
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
            Itinerary Management
          </Typography>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  label="Day Number"
                  name="dayNumber"
                  variant="outlined"
                  fullWidth
                  value={formData.dayNumber}
                  onChange={handleInputChange}
                  sx={{ marginBottom: 2, width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}  >
                <TextField
                  label="Activities"
                  name="activities"
                  variant="outlined"
                  fullWidth

                  rows={4}
                  value={formData.activities}
                  onChange={handleInputChange}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
              <Grid item xs={12}  >
                <Autocomplete
                  options={timeSuggestions}
                  freeSolo
                  value={formData.time}
                  onChange={(event, newValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      time: newValue,
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Time"
                      name="time"
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                  )}
                />

              </Grid>
              <Grid item xs={12}  >
                <TextField
                  label="Itinerary Place"
                  name="itineraryPlace"
                  variant="outlined"
                  fullWidth
                  value={formData.itineraryPlace}
                  onChange={handleInputChange}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  name="itineraryImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, width: '100%' }}>
              Add Itinerary Detail
            </Button>
          </form>
        </Container>
      </Box>

      <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '2rem', color: 'white' }}>
        Itinerary List
      </Typography>
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
                <Typography variant="h6" sx={{ marginBottom: 1 }}>{itinerary.itineraryPlace}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Day: {itinerary.dayNumber}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Activities: {itinerary.activities}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Time: {itinerary.time}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(itinerary.itineraryId)}
                  sx={{ marginTop: 1 }}
                >
                  Delete
                </Button>
                {/* Add more details here */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ItineraryManagement;
