import { IconApartment, IconColorPalette, IconFile, IconGithubLogo, IconHelpCircle, IconHome, IconKey, IconBriefcase } from '@douyinfe/semi-icons';
import { Avatar, Button, Nav, Toast, Typography } from '@douyinfe/semi-ui';
import React from 'react';
import websocket from '../api/websocket';

const menu = {
    header: [
        { itemKey: 'develop', text: '开发类' },
        { itemKey: 'design', text: '设计类' },
        { itemKey: 'document', text: '文档类' },
    ],
    develop: [
        {
            itemKey: 'encode', text: '编码加密', icon: <IconKey size="large" />,
            items: [
                { itemKey: '/encode/text', text: '编码 - 文本类' },
                { itemKey: '/encode/image', text: '编码 - 图形类' },
                { itemKey: '/encode/qr', text: '编码 - 二维码' },
                { itemKey: '/crypt/hash', text: '加密 - 摘要算法' },
                { itemKey: '/crypt/des', text: '加密 - 对称加密' },
                { itemKey: '/crypt/rsa', text: '加密 - 非对称加密' },
            ]
        },
        {
            itemKey: 'develop', text: '开发工具', icon: <IconBriefcase size="large" />,
            items: [
                { itemKey: '/develop/mysql', text: 'MySQL客户端' }
            ]
        },
        {
            itemKey: 'frontend', text: '前端工具', icon: <IconHome size="large" />,
            items: [
                { itemKey: '/color', text: '色彩' },
                { itemKey: '/front/format', text: '格式化' },
            ]
        },
        { itemKey: 'backend', text: '后端工具', icon: <IconApartment size="large" /> },
    ],
    design: [
        { itemKey: '/color', text: '色彩', icon: <IconColorPalette size="large" /> },
    ],
    document: [
        {
            itemKey: 'pdf', text: 'PDF工具', icon: <IconFile size="large" />,
            items: [
                { itemKey: '/pdf/merge', text: 'PDF合并' },
                { itemKey: '/pdf/split', text: 'PDF拆分' },
            ]
        },
    ]
}

const connection = (setServer) => {
    websocket.connection('ws://localhost:8888/ws')
        .then(() => {
            setServer(true)
            Toast.success("连接本地服务器成功")
        })
        .then(() => {
            websocket.ws.onclose = () => {
                setServer(false)
                Toast.warning("本地服务器已断开")
            };
        })
        .catch(() => Toast.error("连接本地服务器失败"))
}

const HeaderMenu = ({ setMenu }) => {

    const { Text } = Typography;

    const [server, setServer] = React.useState(false);
    const [selectKey, setSelectKey] = React.useState(['develop']);

    React.useEffect(() => setMenu(menu[selectKey[0]]), [setMenu, selectKey])

    return <Nav mode="horizontal" selectedKeys={selectKey} items={menu.header}
        onSelect={({ itemKey }) => setSelectKey([itemKey])}>
        <Nav.Header>
            <Avatar src="/logo.png" shape='square' size='small' style={{ marginRight: '10px' }} />
            <h3>码匠工具集</h3>
        </Nav.Header>
        <Nav.Footer>
            <Text link={{ href: 'https://gitee.com/code_artist/codeartist_toolkit/issues/I4JDY4' }}>想要的小工具没有？</Text>
            <Button theme="borderless" icon={<IconHelpCircle size="large" />}
                style={{ color: 'var(--semi-color-text-2)', marginRight: '12px', }} />
            <Button theme="borderless" icon={<IconGithubLogo size="large" />}
                style={{ color: 'var(--semi-color-text-2)', marginRight: '12px', }}
                onClick={() => window.location = 'https://gitee.com/code_artist/codeartist_toolkit'} />
            <Button theme='solid' type={server ? 'primary' : 'danger'} onClick={() => { if (!server) connection(setServer) }}>
                {server ? '已连接' : '未连接'}
            </Button>
        </Nav.Footer>
    </Nav>;
}

export default HeaderMenu;