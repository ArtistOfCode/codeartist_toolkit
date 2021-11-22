import { IconApartment, IconHome, IconKey, IconTextRectangle } from '@douyinfe/semi-icons';
import { Nav } from '@douyinfe/semi-ui';
import React from 'react';
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
    const navigate = useNavigate();

    return <Nav
        style={{ maxWidth: 220, height: '100%' }}
        items={[
            {
                itemKey: 'encode', text: '编码', icon: <IconTextRectangle size="large" />,
                items: [
                    { itemKey: '/base64', text: 'Base64' },
                    { itemKey: '/', text: 'Base64' },
                    { itemKey: 'base2', text: 'Base64' },
                    { itemKey: 'base624', text: 'Base64' },
                ]
            },
            { itemKey: 'encrypt', text: '加密', icon: <IconKey size="large" /> },
            { itemKey: 'frontend', text: '前端', icon: <IconHome size="large" /> },
            { itemKey: 'backend', text: '后端', icon: <IconApartment size="large" /> },
        ]}
        onOpenChange={data => console.log('open:', data)}
        onSelect={data => {
            console.log('select:', data.itemKey)
            navigate(data.itemKey, { replace: true })
        }}
    />
}

export default SideMenu;