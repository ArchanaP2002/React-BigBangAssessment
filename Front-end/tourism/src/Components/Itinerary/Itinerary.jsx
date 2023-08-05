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

function ItineraryManagement() {
    const { packageId } = useParams(); // Get packageId from URL
    const [itineraryDetails, setItineraryDetails] = useState([]);
    const [formData, setFormData] = useState({
        dayNumber: '',
        activities: '',
        time: '',
        itineraryPlace: '',
        itineraryImage: null,
    });

    const timeSuggestions = [
        'Morning',
        'Afternoon',
        'Evening',
        'Full Day',
        'Half Day',
        // Add more time suggestions as needed
    ];
    
    useEffect(() => {
        fetchItineraryDetails();
    }, []);
    const fetchItineraryDetails = async () => {
        try {
            const response = await axios.get(`https://localhost:7228/api/Itinerary`);
            if (Array.isArray(response.data)) {
                setItineraryDetails(response.data);
            } else {
                console.error('Invalid itinerary details response:', response.data);
            }
        } catch (error) {
            console.error('Error fetching itinerary details:', error);
        }
    }
    

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
            itineraryImage: event.target.files[0], // Update the image file
        }));
    };
    
    

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
    
        // Log FormData for debugging
        console.log(formDataToSend);
    
        try {
            formDataToSend.append('packageId', packageId);
            await axios.post('https://localhost:7228/api/Itinerary', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
                        setFormData({
                dayNumber: '',
                activities: '',
                time: '',
                itineraryPlace: '',
                itineraryImage: null,
            });
            alert('Itinerary detail added successfully');
            fetchItineraryDetails();
        } catch (error) {
            console.error('Error adding itinerary detail:', error);
        }
    };
    

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Container maxWidth="md">
                    <Typography variant="h4" sx={{ marginBottom: 2 }}>Itinerary Management</Typography>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Day Number"
                                    name="dayNumber"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.dayNumber}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Activities"
                                    name="activities"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={formData.activities}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    options={timeSuggestions}
                                    freeSolo
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Time"
                                            name="time"
                                            variant="outlined"
                                            fullWidth
                                            value={formData.time}
                                            onChange={handleInputChange}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Itinerary Place"
                                    name="itineraryPlace"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.itineraryPlace}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                    type="file"
                                    name="itineraryImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                            Add Itinerary Detail
                        </Button>
                    </form>
                </Container>
            </Box>

            <h2>Itinerary List</h2>
            <Grid container spacing={3}>
                {itineraryDetails.map((itinerary) => (
                    <Grid item xs={12} sm={6} key={itinerary.itineraryId}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={itinerary.itineraryPlace}
                                height="200"
                                image={`data:image/jpeg;base64,${itinerary.itineraryImage}`}
                            />
                            <CardContent>
                                <Typography variant="h6">{itinerary.itineraryPlace}</Typography>
                                <Typography>Day: {itinerary.dayNumber}</Typography>
                                <Typography>Activities: {itinerary.activities}</Typography>
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
