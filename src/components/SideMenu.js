import { IconApartment, IconHome, IconKey, IconTextRectangle } from '@douyinfe/semi-icons';
import { Nav } from '@douyinfe/semi-ui';
import React from 'react';
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
    const navigate = useNavigate();
    const [openKey, setOpenKey] = React.useState([]);
    const [selectKey, setSelectKey] = React.useState([]);

    return <Nav
        style={{ maxWidth: 220, height: '100%' }}
        selectedKeys={selectKey}
        openKeys={openKey}
        items={[
            {
                itemKey: 'encode', text: '编码', icon: <IconTextRectangle size="large" />,
                items: [
                    { itemKey: '/encode/text', text: '文本类' },
                    { itemKey: '/encode/image', text: '图形类' },
                ]
            },
            { itemKey: 'encrypt', text: '加密', icon: <IconKey size="large" /> },
            { itemKey: 'frontend', text: '前端', icon: <IconHome size="large" /> },
            { itemKey: 'backend', text: '后端', icon: <IconApartment size="large" /> },
        ]}
        onOpenChange={data => { setOpenKey(data.openKeys); }}
        onSelect={data => {
            setSelectKey(data.selectedKeys)
            navigate(data.itemKey, { replace: true })
        }}
    />
}

export default SideMenu;