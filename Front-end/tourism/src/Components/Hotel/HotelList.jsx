import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Paper,
  Container,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const styles = {
  container: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  card: {
    maxWidth: 300,
    marginBottom: 16,
  },
  cardMedia: {
    height: 200,
  },
  starContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFDF00', // Golden color for stars
    padding: '4px 8px',
    borderRadius: 4,
  },
  starIcon: {
    fontSize: '1rem',
    color: '#FFDF00', // Golden color for stars
  },
};

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

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
      stars.push(<StarIcon key={i} className={styles.starIcon} />);
    }

    for (let i = 1; i <= remainingStars; i++) {
      stars.push(<StarOutlineIcon key={filledStars + i} className={styles.starIcon} />);
    }

    return <div className={styles.starContainer}>{stars}</div>;
  };

  return (
    <div style={styles.container}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Explore Our Hotels
        </Typography>
        <Grid container spacing={2}>
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
                    <strong>Rating:</strong> {renderStars(hotel.hotelRating)}
                  </Typography>
                  <Typography>
                    <strong>Price:</strong> ${hotel.hotelPrice}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default HotelList;
