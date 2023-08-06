import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  Rating,
} from '@mui/material';

import backgroundImage from '../../Images/Feedback.png'; // Replace with the actual path to your image

const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: 12,
   backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    maxWidth: 400,
    maxHeight: '700px'
  },
};

function FeedbackForm() {
  const [feedback, setFeedback] = useState({
    userId: 1,
    name: '',
    email: '',
    message: '',
    rating: '0', // Initialize as a string
    dateSubmitted: new Date(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert the rating to a string before sending
      const feedbackData = { ...feedback, rating: feedback.rating.toString() };

      await axios.post('https://localhost:7228/api/Feedback', feedbackData);
      alert('Feedback submitted successfully');
      setFeedback({
        userId: 1,
        name: '',
        email: '',
        message: '',
        rating: '0', // Reset to string '0'
        dateSubmitted: new Date(),
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleRatingChange = (newValue) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      rating: newValue,
    }));
  };

  return (
    <div style={styles.container}>
      <Container component={Paper} maxWidth="sm" sx={styles.paper}>
        <Typography variant="h5" gutterBottom>
          Submit Feedback
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={feedback.name}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={feedback.email}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              name="message"
              value={feedback.message}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
            <Grid item xs={12}>
              <Typography>Rating:</Typography>
              <Rating
                name="rating"
                value={parseFloat(feedback.rating)} // Convert string to number for displaying
                onChange={(event, newValue) => {
                  handleRatingChange(newValue);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" style={{  objectFit: 'cover', width: '100%' }}
>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
 
  
    </div>
  );
}

export default FeedbackForm;
