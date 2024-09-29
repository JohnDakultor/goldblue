import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

const withUserData = (WrappedComponent) => {
  return (props) => {
    const [userData, setUserData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');

    const tokenLoggedOut = async () => {
      try {
        const token = window.localStorage.getItem('jwt');
        console.log('Token being sent:', token);

        const response = await axios.post(
          'http://localhost:3001/api/userData',
          { token },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );

        const data = response.data;
        console.log(data, 'userData');

        if (response.status === 401 || (data.status === 'error' && data.data === 'Token expired')) {
          setModalTitle('Token Expired');
          setModalContent('Your session has expired. You will be redirected to the login page.');
          setModalOpen(true);
          window.localStorage.clear();
        } else {
          setUserData(data.data);
        }
      } catch (error) {
        console.error('Error during API call:', error);
        if (error.response && error.response.status === 401) {
          setModalTitle('Token Expired');
          setModalContent('Your session has expired. You will be redirected to the login page.');
          setModalOpen(true);
          window.localStorage.clear();
        } else {
          setModalTitle('Error');
          setModalContent('An error occurred. Please try again.');
          setModalOpen(true);
        }
      }
    };

    useEffect(() => {
      tokenLoggedOut();
    }, []);

    const handleModalClose = () => {
      setModalOpen(false);
      window.location.replace('/login'); // Redirect after closing modal
    };

    return (
      <>
        <WrappedComponent userData={userData} {...props} />
        <Modal
          open={modalOpen}
          handleClose={handleModalClose}
          title={modalTitle}
          content={modalContent}
          onConfirm={handleModalClose}
        />
      </>
    );
  };
};

export default withUserData;
