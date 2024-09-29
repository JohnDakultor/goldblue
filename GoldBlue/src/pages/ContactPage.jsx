import React from 'react';
import Header from '../components/Header';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Contact() {
    return (
        <div>
            <Header />
            <Container sx={{ mt: 5 }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Contact Us
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                    We'd love to hear from you!
                </Typography>
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="body1" paragraph>
                        If you have any questions, feedback, or inquiries, feel free to reach out to us through any of the platforms below:
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            href="https://www.facebook.com/yourpage"
                            target="_blank"
                            sx={{ mx: 1 }}
                        >
                            Facebook
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            href="mailto:youremail@gmail.com"
                            target="_blank"
                            sx={{ mx: 1 }}
                        >
                            Email
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            href="https://twitter.com/yourhandle"
                            target="_blank"
                            sx={{ mx: 1 }}
                        >
                            Twitter
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            href="https://www.instagram.com/yourhandle"
                            target="_blank"
                            sx={{ mx: 1 }}
                        >
                            Instagram
                        </Button>
                    </Box>
                    <Typography variant="body1" sx={{ mt: 4 }}>
                        We're here to assist you, and we aim to respond as quickly as possible!
                    </Typography>
                </Box>
            </Container>
        </div>
    );
}
