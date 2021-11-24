import { Nav } from '@douyinfe/semi-ui';
import React from 'react';
import { useNavigate } from "react-router-dom";

const SideMenu = ({ menu }) => {
    const navigate = useNavigate();
    const [openKey, setOpenKey] = React.useState([]);
    const [selectKey, setSelectKey] = React.useState([]);

    return <Nav style={{ maxWidth: 220, height: '100%' }}
        selectedKeys={selectKey} openKeys={openKey} items={menu}
        onOpenChange={data => { setOpenKey(data.openKeys); }}
        onSelect={data => {
            setSelectKey(data.selectedKeys)
            navigate(data.itemKey, { replace: true })
        }}
    />
}

export default SideMenu;