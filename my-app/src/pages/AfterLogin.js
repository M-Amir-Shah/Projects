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
    const [fileBase64, setFileBase64] = useState('');
    const [gName, setGName] = useState('');
    const [gContact, setGContact] = useState('');
    const [gRelation, setGRelation] = useState('');
    const [occupation, setOccupation] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [salary, setSalary] = useState('');
    const [error, setError] = useState('');

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
        } catch (error) {
            setError('Failed to fetch data');
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFileBase64(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSalarySlip = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFileBase64(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleFatherStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = (event) => {
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

        const formData = {
            status: status,
            semester: semester,
            gender: gender,
            father_name: fatherName,
            file: fileBase64,
            guardian_name: status === "Deceased" ? gName : undefined,
            guardian_contact: status === "Deceased" ? gContact : undefined,
            guardian_relation: status === "Deceased" ? gRelation : undefined,
            job_title: status === "Alive" ? occupation : undefined,
            contact_no: status === "Alive" ? contactNo : undefined,
            salary: status === "Alive" ? salary : undefined
        };

        // Navigate to PersonalDetails screen with formData
        navigate('/PersonalDetails', { state: { formData } });
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
                            {/* <Input placeholder="Enter your Name" value={name} onChange={(e) => setName(e.target.value)} disabled/> */}
                            <input type="text" value={name} disabled />
                        </div>

                        <div className='input-container'>
                            <label className='label' htmlFor="arid_no">Arid No.</label>
                            {/* <Input placeholder="Arid eg. 2020-Arid-1234" value={arid_no} onChange={(e) => setArid_no(e.target.value)} disabled/> */}
                            <input type="text" value={arid_no} disabled />
                        </div>

                        <div className='input-container'>
                            <label className='label' htmlFor="cgpa">CGPA</label>
                            {/* <Input placeholder="Enter your CGPA" value={cgpa} onChange={(e) => setCgpa(e.target.value)} disabled/> */}
                            <input type="text" value={cgpa} disabled />
                        </div>

                        <div className='input-container'>
                            <label className='label' htmlFor="semester">Semester</label>
                            {/* <Input placeholder="Enter your Semester" value={semester} onChange={(e) => setSemester(e.target.value)} disabled/> */}
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

                        <div>
                            <h2>Parent Details</h2>
                        </div>

                        <div className='input-container'>
                            <label className='label' htmlFor="father_name">Father Name</label>
                            {/* <Input placeholder="Enter Father Name" value={fatherName} onChange={(e) => setFatherName(e.target.value)} disabled/> */}
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
                                    <label className='label' htmlFor="contact_no">Contact Number</label>
                                    <Input placeholder="Contact Number" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                                </div>
                                <div className='input-container'>
                                    <label className='label' htmlFor="salary">Salary</label>
                                    <Input placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                                </div>
                                <label>
                                    Upload Salary Slip:
                                    <input
                                        type="file"
                                        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png, .gif"
                                        onChange={handleSalarySlip}
                                    />
                                </label>
                            </div>
                        )}
                        <div className='button-container'>
                            <Button type="primary" htmlType="submit">Next</Button>
                            <Button type="default" onClick={handleCancel}>Cancel</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AfterLogin;
