import React from 'react';
import Header from '../components/Header';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function About() {
    return (
        <div>
            <Header />
            <Container sx={{ mt: 5 }}>
                <Typography variant="h3" align="center" gutterBottom>
                    About GoldBlue
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                    Your Trusted Gold Payment Platform
                </Typography>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="body1" paragraph>
                        GoldBlue is an innovative gold payment platform designed to simplify your transaction experiences. 
                        We understand that in today’s fast-paced world, convenience and security are paramount. That's why GoldBlue offers a seamless, secure way to make payments, allowing you to easily manage your transactions in one centralized location. 
                        With our user-friendly interface, you can quickly send and receive payments, ensuring that your financial dealings are as efficient as possible.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        One of the standout features of GoldBlue is our unique referral system. By inviting friends and family to join our platform, you can earn a percentage of their transactions. This not only benefits you but also helps grow our community, creating a network of users who can enjoy the benefits of GoldBlue together. 
                        This innovative approach means that your earning potential is not limited to just your transactions; the more people you refer, the more you can earn, making it a fantastic opportunity for passive income.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Security is at the forefront of our mission. GoldBlue employs advanced encryption and security measures to protect your financial information. We ensure that your transactions are not only easy but also safe, giving you peace of mind as you navigate your financial needs.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        In addition to secure transactions and a rewarding referral program, GoldBlue provides a simple and efficient withdrawal process. You can easily access your earnings whenever you need them, ensuring that your money is always within reach. 
                        Whether you’re using GoldBlue for personal transactions or business purposes, we strive to deliver a seamless experience tailored to your needs.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        At GoldBlue, our goal is to revolutionize how individuals and businesses handle their transactions. We believe that everyone should have access to efficient, secure payment solutions that empower them to take control of their financial futures. 
                        We are committed to continuous improvement and innovation, ensuring that we stay at the forefront of the payment platform industry.
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 4 }} gutterBottom>
                        Our Vision
                    </Typography>
                    <Typography variant="body1" paragraph>
                        To be the leading gold payment platform that empowers individuals and businesses to engage in secure, seamless transactions, while fostering a community of growth and shared success.
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 4 }} gutterBottom>
                        Our Mission
                    </Typography>
                    <Typography variant="body1" paragraph>
                        To provide a user-friendly, secure payment solution that simplifies financial transactions for everyone. We aim to create a rewarding ecosystem through our referral program, ensuring that our users can earn while helping others benefit from our services. Through innovation and commitment to security, we strive to redefine the payment landscape and enhance the financial well-being of our users.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Join us today and experience a new way to handle your payments. With GoldBlue, you can transact with confidence, maximize your earnings through our referral program, and enjoy the benefits of being part of a vibrant, growing community. 
                        Together, we can redefine the payment landscape, making it more accessible, rewarding, and secure for everyone.
                    </Typography>
                </Box>
            </Container>
        </div>
    );
}
