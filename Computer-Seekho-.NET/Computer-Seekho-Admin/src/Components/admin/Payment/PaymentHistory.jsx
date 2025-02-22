import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentHistory.css';

const PaymentHistory = () => {
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        studentId: '',
        amount: '',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentTypeId: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/payment/getAll')
            .then(response => response.json())
            .then(data => setPayments(data))
            .catch(error => console.error('Error fetching payment history:', error));

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

        fetch('http://localhost:8080/payment/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                paymentTypeId: { paymentTypeId: formData.paymentTypeId }, // Adjusting the structure for nested objects
                student: { studentId: formData.studentId }
            }),
        })
        // .then(response => {
        //     if (response.status === 409) {
        //         setErrorMessage('Payment already present');
        //         return;
        //     }
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     return response.json();
        // })
        .then(data => {
            const newPayment = {
                ...data,
                paymentTypeId: selectedPaymentType
            };
            setPayments([...payments, newPayment]);
            setShowModal(false);  // Close the modal
            setFormData({ studentId: '', amount: '', paymentDate: new Date().toISOString().split('T')[0], paymentTypeId: '' });  // Reset the form data
            setErrorMessage('');
        })
        .catch(error => {
            console.error('Error adding payment:', error);
            setErrorMessage('An error occurred while adding the payment.');
        });
    };

    return (
        <div>
            <h1>Payment History</h1>
            <button className="open-modal-button" onClick={() => navigate("add")}>Add Payment</button>
            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Student ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.length > 0 ? payments.map(payment => (
                        <tr key={payment.paymentId}>
                            <td>{payment.paymentId}</td>
                            <td>{payment.student?.studentId}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.paymentDate}</td>
                            <td>{payment.paymentTypeId?.paymentTypeDesc}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="5">No payments found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;