import { useState } from 'react';
import { Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DecideMeritBaseApplication = ({ aidtype, applicationStatus, id, EndPoint }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (status) => {
    setLoading(true);
    try {
      const response = await axios.post(`${EndPoint.meritRejected}`, {
        id: id,
        status: status
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 200) {
        message.success(`${status} successfully`);
        navigate('/StudentDashboard');
      }
    } catch (error) {
      message.error('Failed to submit');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {aidtype === 'MeritBase' && applicationStatus === 'Pending' && (
        <>
          <Button
            onClick={() => handleSubmit('Accepted')}
            type='primary'
            loading={loading}
            style={{ marginRight: '10px', backgroundColor: 'green' }}
          >
            Accept
          </Button>
          <Button
            onClick={() => handleSubmit('Rejected')}
            type='primary'
            loading={loading}
            style={{ backgroundColor: 'red' }}
          >
            Reject
          </Button>
        </>
      )}
    </>
  );
};

export default DecideMeritBaseApplication;
