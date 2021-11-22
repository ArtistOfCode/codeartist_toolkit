import { IconBell, IconHelpCircle, IconSemiLogo } from '@douyinfe/semi-icons';
import { Button, Nav } from '@douyinfe/semi-ui';
import React from 'react';

const HeaderMenu = () =>
    <Nav mode="horizontal" defaultSelectedKeys={['Home']}>
        <Nav.Header>
            <IconSemiLogo style={{ width: '96px', height: '36px', fontSize: 36 }} />
            <h3>码匠工具集</h3>
        </Nav.Header>
        <span style={{ color: 'var(--semi-color-text-0)', }}>
            <span style={{ marginLeft: '30px', marginRight: '24px' }}>开发类</span>
            <span style={{ marginRight: '24px' }}>设计类</span>
            <span>文档类</span>
        </span>
        <Nav.Footer>
            <Button
                theme="borderless"
                icon={<IconBell size="large" />}
                style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                }}
            />
            <Button
                theme="borderless"
                icon={<IconHelpCircle size="large" />}
                style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                }}
            />
        </Nav.Footer>
    </Nav>

export default HeaderMenu;