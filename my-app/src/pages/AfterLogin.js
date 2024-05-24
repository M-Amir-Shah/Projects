import React, { useState } from 'react';
import '../Styling/Afterlogin.css';
import Input from '../components/Input.js';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const AfterLogin = () => {
    const history = useNavigate();
    const [arid, setArid] = useState('');
    const [gender, setGender] = useState('');
    const [father, setFather] = useState('');
    const [file, setFile] = useState(null);
    const [uploadDeathCertificate, setUploadDeathCertificate] = useState(false);
    const [uploadSalarySlip, setUploadSalarySlip] = useState(false);
    const [error, setError] = useState('');


    const FileData = (event) => {
        setFile(event.target.files[0]);
    };

    const Certificate = () => {
        setUploadDeathCertificate(!uploadDeathCertificate);
    };

    const SalarySlip = () => {
        setUploadSalarySlip(!uploadSalarySlip);
    };

    const Gender = (event) => {
        setGender(event.target.value);
    };

    const FatherStatus = (event) => {
        setFather(event.target.value);
    };


    const Submit = async (event) => {
        event.preventDefault();
        history('/PersonalDetails');
        // setArid('');
        // setGender('');
        // setFather('');
        // setUploadDeathCertificate('');
        setError('');
    };
    const Cancel = (event) => {
        history(-1);
    }

    return (
        <div className="container">
            <div className="form-box">
                <header>

                    <h1 id="title">Student Info</h1>
                </header>
                <form onSubmit={Submit}>
                    <div>
                        <div className='input-container'>
                            <label className='label' htmlFor="Textinput">Name </label>
                            <Input placeholder="Enter your Name" />
                        </div>

                        <div className='input-container'>
                            <label className='label' htmlFor="Textinput">Arid No.</label>
                            <Input placeholder="Arid eg. 2020-Arid-1234" />
                        </div>

                        <div className='input-container'>
                            <label className='label' htmlFor="Textinput">Semester</label>
                            <Input placeholder="Enter your Semester" />
                        </div>
                        <label>Gender</label>
                        <div className='RadioButton'>
                            <label>
                                <input
                                    type="radio"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={Gender}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={Gender}
                                />
                                Female
                            </label>
                        </div>
                        <div>
                            <h2>Parent Details</h2>
                        </div>
                        <div >
                            <label htmlFor="Textinput">Father Name: </label>
                            <br />
                            <Input placeholder="EnterFather Name" />
                        </div>
                        <label>Father Status</label>
                        <div className='RadioButton'>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Alive"
                                    checked={father === "Alive"}
                                    onChange={FatherStatus}
                                />
                                Alive
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Deceased"
                                    checked={father === "Deceased"}
                                    onChange={FatherStatus}
                                />
                                Deceased
                                <br />
                            </label>
                        </div>
                        {father === "Deceased" && (
                            <div>
                                <label>
                                    Upload Death Certificate:
                                    <input
                                        type="file"
                                        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png, .gif"
                                        onChange={FileData}
                                    />
                                </label>
                                <h2>Guardian Details</h2>
                                <label>Guardian Name</label>
                                <Input placeholder="guardian Name" />
                                <label>Guardian Contact</label>
                                <Input placeholder="guardian Contact" />
                                <label>Guardian Relation</label>
                                <Input placeholder="guardian Relation" />
                                <br />
                            </div>
                        )}
                        {
                            father === "Alive" && (
                                <div>
                                    <div>
                                        <label>Job Title</label>
                                        <Input placeholder="Job Title" />
                                    </div>
                                    <div>
                                        <label>Contact No.</label>
                                        <Input placeholder="Contact No." />
                                    </div>
                                    <div>
                                        <label>Salary</label>
                                        <Input placeholder="Salary" />
                                    </div>
                                    {/* <b><sup>optional</sup></b> */}
                                    <label>
                                        Upload Salary Slip:
                                        <input
                                            type="file"
                                            accept=".pdf, .doc, .docx"
                                            onChange={FileData}
                                        />

                                    </label>
                                    <br />

                                </div>
                            )
                        }<br />
                        <div className='Buttons'>
                            <Button type='primary' onClick={Cancel} >Cancel</Button>
                            <Button type='primary' onClick={Submit}>Next</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AfterLogin;
