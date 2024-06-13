import React, { useState, useEffect } from 'react';
import { Button, Input, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styling/Afterlogin.css'; // Importing CSS file
import EndPoint from '../endpoints';

const { TextArea } = Input;

const AfterLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { profileId } = location.state || {};

    const [name, setName] = useState('');
    const [arid_no, setArid_no] = useState('');
    const [cgpa, setCgpa] = useState('');
    const [semester, setSemester] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [file, setFile] = useState(null);
    const [gName, setGName] = useState('');
    const [gContact, setGContact] = useState('');
    const [gRelation, setGRelation] = useState('');
    const [occupation, setOccupation] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [salary, setSalary] = useState('');
    const [house, setHouse] = useState('');
    const [agreementFiles, setAgreementFiles] = useState([]);
    const [reason, setReason] = useState('');
    const [amount, setAmount] = useState('');
    const [length, setLength] = useState('1');
    const [isPicked, setIsPicked] = useState(false);
    const [studentId, setStudentId] = useState('');

    useEffect(() => {
        if (profileId) {
            fetchData(profileId);
        }
    }, [profileId]);

    const fetchData = async (profileId) => {
        try {
            const response = await fetch(`${EndPoint.getStudentInfo}?id=${profileId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setName(data.name);
            setArid_no(data.arid_no);
            setCgpa(data.cgpa);
            setSemester(data.semester);
            setFatherName(data.father_name);
            setStudentId(profileId); // Assuming profileId is studentId
        } catch (error) {
            message.error('Failed to fetch data');
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSalarySlip = (event) => {
        setFile(event.target.files[0]);
    };

    const handleAgreementFiles = (event) => {
        setAgreementFiles([...event.target.files]);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleFatherStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleHouseDetails = (event) => {
        setHouse(event.target.value);
    };

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validation check
        if (!name || !arid_no || !semester || !gender || !fatherName || !status) {
            message.error("Please fill in all fields.");
            return;
        }
        if (contactNo.length !== 11) {
            message.error("Contact number must be 11 digits.");
            return;
        }

        const formData = new FormData();
        formData.append('status', status);
        formData.append('occupation', occupation);
        formData.append('contactNo', contactNo);
        formData.append('salary', salary);
        formData.append('gName', gName);
        formData.append('gContact', gContact);
        formData.append('gRelation', gRelation);
        formData.append('house', house);
        formData.append('reason', reason);
        formData.append('amount', amount);
        formData.append('length', length);
        formData.append('isPicked', isPicked);
        formData.append('studentId', studentId);

        if (status === "Alive" && file) {
            formData.append('docs', file);
        } else if (status === "Deceased" && file) {
            formData.append('docs', file);
        }

        agreementFiles.forEach((file, index) => {
            formData.append(`agreement${index}`, file);
        });

        try {
            const token = localStorage.getItem('token'); // or however you store/retrieve your token
            const response = await fetch(EndPoint.sendApplication, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: formData,
            });
            if (response.ok) {
                message.success('Submitted successfully');
                navigate('/StudentDashboard');
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            message.error('Failed to submit');
        }
    };

    const handleCancel = () => {
        navigate('/StudentDashboard');
    };

    return (
        <div className="container">
            <div className="form-box">
                <header>
                    <h1 id="title">Student Info</h1>
                </header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className='input-container'>
                            <label className='label' htmlFor="name">Name</label>
                            <input type="text" value={name} disabled />
                        </div>
                        <div className='input-container'>
                            <label className='label' htmlFor="arid_no">Arid No.</label>
                            <input type="text" value={arid_no} disabled />
                        </div>
                        <div className='input-container'>
                            <label className='label' htmlFor="cgpa">CGPA</label>
                            <input type="text" value={cgpa} disabled />
                        </div>
                        <div className='input-container'>
                            <label className='label' htmlFor="semester">Semester</label>
                            <input type="text" value={semester} disabled />
                        </div>

                        <label>Gender</label>
                        <div className='RadioButton'>
                            <label>
                                <input
                                    type="radio"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={handleGenderChange}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={handleGenderChange}
                                />
                                Female
                            </label>
                        </div>

                        <div className='parent'>
                            <h2>Parent Details</h2>
                        </div>

                        <div className='input-container'>
                            <label className='label' htmlFor="father_name">Father Name</label>
                            <input type="text" value={fatherName} disabled />
                        </div>

                        <label>Father Status</label>
                        <div className='RadioButton'>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Alive"
                                    checked={status === "Alive"}
                                    onChange={handleFatherStatusChange}
                                />
                                Alive
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Deceased"
                                    checked={status === "Deceased"}
                                    onChange={handleFatherStatusChange}
                                />
                                Deceased
                            </label>
                        </div>

                        {status === "Deceased" && (
                            <div>
                                <label>
                                    Upload Death Certificate:
                                    <input
                                        type="file"
                                        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png, .gif"
                                        onChange={handleFileChange}
                                    />
                                </label>
                                <div className='input-container'>
                                    <label className='label' htmlFor="guardian_name">Guardian Name</label>
                                    <Input placeholder="Guardian Name" value={gName} onChange={(e) => setGName(e.target.value)} />
                                </div>
                                <div className='input-container'>
                                    <label className='label' htmlFor="guardian_contact">Guardian Contact</label>
                                    <Input placeholder="Guardian Contact" value={gContact} onChange={(e) => setGContact(e.target.value)} />
                                </div>
                                <div className='input-container'>
                                    <label className='label' htmlFor="guardian_relation">Guardian Relation</label>
                                    <Input placeholder="Guardian Relation" value={gRelation} onChange={(e) => setGRelation(e.target.value)} />
                                </div>
                            </div>
                        )}

                        {status === "Alive" && (
                            <div>
                                <div className='input-container'>
                                    <label className='label' htmlFor="occupation">Occupation</label>
                                    <Input placeholder="Job Title" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
                                </div>
                                <div className='input-container'>
                                    <label className='label' htmlFor="contact">Contact No.</label>
                                    <Input placeholder="Contact Number" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                                </div>
                                <div className='input-container'>
                                    <label className='label' htmlFor="salary">Salary</label>
                                    <Input placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                                </div>
                                <div>
                                    <label>Upload Salary Slip:</label>
                                    <input
                                        type="file"
                                        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png, .gif"
                                        onChange={handleSalarySlip}
                                    />
                                </div>
                            </div>
                        )}

                        <div className='parent'>
                            <h2>Personal Details</h2>
                        </div>
                        <div className='input-container'>
                            <label className='label' htmlFor="house">House Details</label>
                            <select value={house} onChange={handleHouseDetails}>
                                <option value="">Select house status</option>
                                <option value="Own">Own</option>
                                <option value="Rented">Rented</option>
                            </select>
                        </div>
                        <div>
                            <label>Upload House Agreement:</label>
                            <input
                                type="file"
                                multiple
                                accept=".pdf, .doc, .docx, .jpg, .jpeg, .png, .gif"
                                onChange={handleAgreementFiles}
                            />
                        </div>

                        <div className='input-container'>
                            <label className='label' htmlFor="reason">Reason for Apply</label>
                            <TextArea placeholder="Reason" value={reason} onChange={handleReasonChange} rows={4} />
                        </div>
                        <div className='input-container'>
                            <label className='label' htmlFor="amount">Amount Needed</label>
                            <Input placeholder="Amount" value={amount} onChange={handleAmountChange} />
                        </div>
                    </div>

                    <div className='buttons'>
                        <Button type="primary" htmlType="submit" className="form-button">Submit</Button>
                        <Button type="primary" onClick={handleCancel} className="form-button">Cancel</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AfterLogin;
