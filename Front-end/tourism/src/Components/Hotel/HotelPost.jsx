import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  TextField,
  Paper,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const styles = {
  container: {
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    marginTop: '20px',
    padding: '16px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputField: {
    marginBottom: '10px',
    width: '100%',
  },
  submitButton: {
    marginTop: '10px',
    width: '100%',
  },
  card: {
    maxWidth: 300,
    marginBottom: 16,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
  },
  cardMedia: {
    height: 200,
  },
  starContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFDF00',
    padding: '2px',
    borderRadius: '4px',
    marginBottom: '8px',
  },
  starIcon: {
    fontSize: '1rem',
    color: '#FFDF00',
  },
  price: {
    fontWeight: 'bold',
  },
};

const HotelComponent = () => {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({
    hotelName: '',
    hotelRating: 0,
    hotelPrice: 0,
    hotelImage: null,
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  async function fetchHotels() {
    try {
      const response = await axios.get('https://localhost:7228/api/Hotel');
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  }

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const remainingStars = 5 - filledStars;
  
    const stars = [];
  
    for (let i = 1; i <= filledStars; i++) {
      stars.push(
        <StarIcon key={i} className={styles.starIcon} />,
      );
    }
  
    for (let i = 1; i <= remainingStars; i++) {
      stars.push(
        <StarOutlineIcon key={filledStars + i} className={styles.starIcon} />,
      );
    }

    return (
      <div className={styles.starContainer}>
        {stars}
      </div>
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHotel((prevHotel) => ({
      ...prevHotel,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setNewHotel((prevHotel) => ({
      ...prevHotel,
      hotelImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('hotelName', newHotel.hotelName);
      formData.append('hotelRating', newHotel.hotelRating);
      formData.append('hotelPrice', newHotel.hotelPrice);
      formData.append('hotelImage', newHotel.hotelImage);

      await axios.post('https://localhost:7228/api/Hotel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setNewHotel({
        hotelName: '',
        hotelRating: 0,
        hotelPrice: 0,
        hotelImage: null,
      });
      fetchHotels();
    } catch (error) {
      console.error('Error submitting hotel:', error);
    }
  };

  const handleDelete = async (hotelId) => {
    try {
      await axios.delete(`https://localhost:7228/api/Hotel/${hotelId}`);
      fetchHotels();
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  return (
    <div style={styles.container}>
     
      
      <Paper elevation={3} style={styles.form}>
        <h2>Add New Hotel</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            name="hotelName"
            label="Hotel Name"
            value={newHotel.hotelName}
            onChange={handleInputChange}
            fullWidth
            style={styles.inputField}
          />
          <TextField
            name="hotelRating"
            type="number"
            label="Hotel Rating"
            value={newHotel.hotelRating}
            onChange={handleInputChange}
            fullWidth
            style={styles.inputField}
          />
          <TextField
            name="hotelPrice"
            type="number"
            label="Hotel Price"
            value={newHotel.hotelPrice}
            onChange={handleInputChange}
            fullWidth
            style={styles.inputField}
          />
          <input
            type="file"
            accept="image/*"
            name="hotelImage"
            onChange={handleImageChange}
            style={styles.inputField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={styles.submitButton}
          >
            Add Hotel
          </Button>
        </form>
      </Paper>
      
      <h1 style={styles.header}>Hotel List</h1>
      <Grid container spacing={2} justifyContent="center">
        {hotels.map((hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel.hotelId}>
            <Card style={styles.card}>
              <CardMedia
                style={styles.cardMedia}
                image={`data:image/png;base64,${hotel.hotelsImage}`}
              />
              <CardContent>
                <Typography variant="h6">{hotel.hotelName}</Typography>
                <Typography>
                  {renderStars(hotel.hotelRating)}
                </Typography>
                <Typography className={styles.price}>
                  Price: ${hotel.hotelPrice}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(hotel.hotelId)}
                  style={{ marginTop: '10px' }}
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
};

export default HotelComponent;
