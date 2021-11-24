import { IconGithubLogo, IconHelpCircle } from '@douyinfe/semi-icons';
import { Avatar, Button, Nav, Typography } from '@douyinfe/semi-ui';
import React from 'react';

const { Text } = Typography;

const HeaderMenu = () =>
    <Nav mode="horizontal" defaultSelectedKeys={['Home']}>
        <Nav.Header>
            <Avatar src="/logo.png" shape='square' size='small' style={{ marginRight: '10px' }} />
            <h3>码匠工具集</h3>
        </Nav.Header>
        <span style={{ color: 'var(--semi-color-text-0)', }}>
            <span style={{ marginLeft: '30px', marginRight: '24px' }}>开发类</span>
            <span style={{ marginRight: '24px' }}>设计类</span>
            <span>文档类</span>
        </span>
        <Nav.Footer>
            <Text link={{ href: 'https://gitee.com/code_artist/codeartist_toolkit/issues/I4JDY4' }}>想要的小工具没有？</Text>
            <Button
                theme="borderless"
                icon={<IconHelpCircle size="large" />}
                style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                }}
            />
            <Button
                theme="borderless"
                icon={<IconGithubLogo size="large" />}
                style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                }}
                onClick={() => window.location = 'https://gitee.com/code_artist/codeartist_toolkit'}
            />
        </Nav.Footer>
    </Nav>

export default HeaderMenu;