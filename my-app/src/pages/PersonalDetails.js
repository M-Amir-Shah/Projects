import React, { useState } from 'react';
import '../Styling/PersonalDetails.css';
import { Input, Button, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import EndPoint from '../endpoints';
const { TextArea } = Input;

const PersonalDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { formData } = location.state || {};

    const [house, setHouse] = useState('');
    const [agreement, setAgreement] = useState(null);
    const [agreementBase64, setAgreementBase64] = useState('');
    const [reason, setReason] = useState('');
    const [amount, setAmount] = useState('');

    const handleHouseDetails = (event) => {
        setHouse(event.target.value);
    };

    const handleFileData = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setAgreementBase64(reader.agreement);
        };
        reader.readAsDataURL(file);
    };

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleBack = () => {
        navigate('/AfterLogin');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validation check
        if (!house || !agreementBase64 || !reason || !amount) {
            message.error("Please fill in all fields.");
            return;
        }

        const updatedFormData = {
            ...formData,
            house: house,
            agreement: agreementBase64,
            reason: reason,
            amount: amount
        };

        try {
            const response = await fetch(EndPoint.sendApplication, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFormData)
            });

            if (response.ok) {
                message.success("Submitted Successfully.");
                setTimeout(() => {
                    navigate('/StudentDashboard');
                }, 1500);
            } else {
                message.error("Submission Failed.");
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            message.error("Submission Failed.");
        }
    };

    return (
        <div className="container">
            <div className="form-box">
                <header>
                    <h1 id="title">Personal Details</h1>
                </header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>House</label>
                        <div className='RadioButton'>
                            <label>
                                <input
                                    type="radio"
                                    name="house"
                                    value="own"
                                    checked={house === "own"}
                                    onChange={handleHouseDetails}
                                />
                                Own
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="house"
                                    value="rent"
                                    checked={house === "rent"}
                                    onChange={handleHouseDetails}
                                />
                                Rent
                            </label>
                        </div>
                        <br />
                        <label>House Agreement
                            <input
                                type="file"
                                accept=".pdf, .doc, .docx"
                                onChange={handleFileData}
                            />
                        </label>
                        <div>
                            <label>Reason for scholarship</label>
                            <br />
                            <TextArea placeholder="Reason..." value={reason} onChange={handleReasonChange} />
                        </div>
                        <div>
                            <label>Required Amount</label>
                            <br />
                            <Input
                                type="number"
                                inputMode="numeric"
                                min={0}
                                required
                                placeholder="Enter Amount"
                                value={amount}
                                onChange={handleAmountChange}
                            />
                        </div>
                        <br />
                        <div className='Buttons'>
                            <Button type='primary' onClick={handleBack} icon={<ArrowLeftOutlined />}>Back</Button>
                            <Button type='primary' htmlType="submit" icon={<CheckOutlined />}>Submit</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PersonalDetails;
