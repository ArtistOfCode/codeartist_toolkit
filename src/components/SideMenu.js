import { IconSetting, IconHome, IconHistogram, IconLive } from '@douyinfe/semi-icons';
import { Nav } from '@douyinfe/semi-ui';
import React from 'react';

const SideMenu = () =>
    <Nav
        style={{ maxWidth: 220, height: '100%' }}
        defaultSelectedKeys={['Home']}
        items={[
            { itemKey: 'Home', text: '编码', icon: <IconHome size="large" /> },
            { itemKey: 'Histogram', text: '加密', icon: <IconHistogram size="large" /> },
            { itemKey: 'Live', text: '前端', icon: <IconLive size="large" /> },
            { itemKey: 'Setting', text: '后端', icon: <IconSetting size="large" /> },
        ]}
    />

export default SideMenu;