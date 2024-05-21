import React, { useState } from 'react';
import '../Styling/PersonalDetails.css';
import Input from '../components/Input.js';
import Description from '../components/DescriptionBox.js';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';


const PersonalDetails = () => {
    const history = useNavigate();

    const [house, setHouse] = useState('');
    const [file, setFile] = useState(null);
    const [uploadHouseAgreement, setUploadHouseAgreement] = useState(false);
    const [uploadEvidence, setUploadEvidence] = useState(false);

    const HouseDetails = (event) => {
        setHouse(event.target.value);
    };
    const FileData = (event) => {
        setFile(event.target.files[0]);
    };

    const HouseAgreement = () => {
        setUploadHouseAgreement(!uploadHouseAgreement);
    };

    const Evidence = () => {
        setUploadEvidence(!uploadEvidence);
    };

    const Back = (event) => {
        history(-1);
    }


    const Submit = (event) => {
        event.preventDefault();
        message.success("Submit Successfully.");
        setTimeout(() => {
            history(-2); // Navigates back two steps in the history stack after 3 seconds
            //  window.location.reload();   reload the current screen
        }, 3500); // Delay navigation by 3 seconds
    };

    return (
        <div className="container">
            <div className="form-box">
                <header>

                    <h1 id="title">Personal Details</h1>
                </header>
                <form onSubmit={Submit}>
                    <div>
                        <label>House</label>
                        <div className='RadioButton'>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="own"
                                    checked={house === "own"}
                                    onChange={HouseDetails}
                                />
                                Own
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="rent"
                                    checked={house === "rent"}
                                    onChange={HouseDetails}
                                />
                                Rent
                                <br />
                            </label>
                        </div>
                        <label>House Agreement
                            <input
                                type="file"
                                accept=".pdf, .doc, .docx"
                                onChange={FileData}

                            />
                        </label>
                        <div>
                            <label>Reason for scholarship</label>
                            <br />
                            <Description placeholder="Reason..." />
                        </div>
                        <br />
                        <label>Reason Evidence
                            <input
                                type="file"
                                accept=".pdf, .doc, .docx"
                                onChange={FileData}
                            />
                        </label>

                        <div>
                            <label>Required Amount</label>
                            <br />
                            <Input type="number"
                                inputMode="numeric"
                                min={0}
                                required
                                placeholder="Enter Amount" />
                        </div>
                        <br />
                        <div className='Buttons'>
                            <Button type='primary' onClick={Back} icon={<ArrowLeftOutlined />}>Back</Button>
                            <Button type='primary' onClick={Submit} icon={<CheckOutlined />}>Submit</Button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default PersonalDetails;
