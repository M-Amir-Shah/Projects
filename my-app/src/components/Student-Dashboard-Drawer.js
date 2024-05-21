import React, { useState } from 'react';
import { Drawer, Button, message } from 'antd';
import { EllipsisOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useNavigate } from "react-router-dom";

const SampleDrawer = () => {
    const history = useNavigate();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    const onClose = () => {
        setIsDrawerVisible(false);
    };

    const logout = () => {
        history.push('/login');
    }

    return (
        <>
            <div style={{ padding: "5px" }}>
                <Button icon={<EllipsisOutlined />} onClick={showDrawer} />
            </div>

            <Drawer
                placement="left"
                width={250}
                closable={true}
                onClose={onClose}
                visible={isDrawerVisible}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
                <div className="sider-content">
                    <Avatar size={64} icon={<UserOutlined />} />
                </div>
                <br />
                <Button type='primary' onClick={logout}>Logout</Button>
            </Drawer>
        </>
    );
};

export default SampleDrawer;
