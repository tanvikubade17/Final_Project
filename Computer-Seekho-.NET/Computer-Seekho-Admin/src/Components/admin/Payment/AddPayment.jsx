import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import './AddPayment.css';
import toast from 'react-hot-toast';

const AddPayment = () => {
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [formData, setFormData] = useState({
        studentId: '',
        amount: '',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentTypeId: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/paymentTypes/getAll')
            .then(response => response.json())
            .then(data => setPaymentTypes(data))
            .catch(error => console.error('Error fetching payment types:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.studentId < 0) {
            setErrorMessage('Student ID cannot be negative');
            return;
        }

        const selectedPaymentType = paymentTypes.find(type => type.paymentTypeId === parseInt(formData.paymentTypeId));

        const response = fetch('http://localhost:8080/payment/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                paymentTypeId: { paymentTypeId: formData.paymentTypeId },
                student: { studentId: formData.studentId }
            }),
        })
            .then(data => {
                const newPayment = {
                    ...data,
                    paymentTypeId: selectedPaymentType
                };
                setPayments([...payments, newPayment]);
                setFormData({ studentId: '', amount: '', paymentDate: new Date().toISOString().split('T')[0], paymentTypeId: '' });
                setErrorMessage('');
                toast.success('Payment added successfully',{ position: "top-center" });
                // toast.success(response.json().message)
                navigate("/admin/payment");
            })
            .catch(error => {
                console.error('Error adding payment:', error);
                setErrorMessage('An error occurred while adding the payment.');
            });
    };

    return (
        <Box className="add-payment-container">
            <form onSubmit={handleSubmit} className="add-payment-form">
                {errorMessage && <Typography className="error-message">{errorMessage}</Typography>}
                
                <TextField
                    label="PRN"
                    type="number"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                />

                <TextField
                    label="Amount"
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                />

                <TextField
                    label="Payment Date"
                    type="date"
                    name="paymentDate"
                    value={formData.paymentDate}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    select
                    label="Payment Type"
                    name="paymentTypeId"
                    value={formData.paymentTypeId}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                >
                    <MenuItem value="">Select Payment Type</MenuItem>
                    {Array.isArray(paymentTypes) && paymentTypes.map(type => (
                        <MenuItem key={type.paymentTypeId} value={type.paymentTypeId}>
                            {type.paymentTypeDesc}
                        </MenuItem>
                    ))}
                </TextField>

                <Button type="submit" variant="contained" color="primary" className="submit-button">
                    Add Payment
                </Button>
            </form>
        </Box>
    );
};

export default AddPayment;
