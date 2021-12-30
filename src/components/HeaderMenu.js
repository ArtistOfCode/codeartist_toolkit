import { IconApartment, IconColorPalette, IconFile, IconGithubLogo, IconHelpCircle, IconHome, IconKey, IconTextRectangle } from '@douyinfe/semi-icons';
import { Avatar, Button, Nav, Typography } from '@douyinfe/semi-ui';
import React from 'react';

const menu = {
    header: [
        { itemKey: 'develop', text: '开发类' },
        { itemKey: 'design', text: '设计类' },
        { itemKey: 'document', text: '文档类' },
    ],
    develop: [
        {
            itemKey: 'encode', text: '编码', icon: <IconTextRectangle size="large" />,
            items: [
                { itemKey: '/encode/text', text: '文本类' },
                { itemKey: '/encode/image', text: '图形类' },
                { itemKey: '/encode/qr', text: '二维码' },
            ]
        },
        {
            itemKey: 'encrypt', text: '加密', icon: <IconKey size="large" />,
            items: [
                { itemKey: '/crypt/hash', text: '摘要算法' },
                { itemKey: '/crypt/des', text: '对称加密' },
                { itemKey: '/crypt/rsa', text: '非对称加密' },
            ]
        },
        {
            itemKey: 'frontend', text: '前端', icon: <IconHome size="large" />,
            items: [
                { itemKey: '/color', text: '色彩' },
                { itemKey: '/front/format', text: '格式化' },
            ]
        },
        { itemKey: 'backend', text: '后端', icon: <IconApartment size="large" /> },
    ],
    design: [
        { itemKey: '/color', text: '色彩', icon: <IconColorPalette size="large" /> },
    ],
    document: [
        {
            itemKey: 'pdf', text: 'PDF工具集', icon: <IconFile size="large" />,
            items: [
                { itemKey: '/pdf/merge', text: 'PDF合并' },
                { itemKey: '/pdf/split', text: 'PDF拆分' },
            ]
        },
    ]
}

const HeaderMenu = ({ setMenu }) => {

    const { Text } = Typography;

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
        </Nav.Footer>
    </Nav>;
}

export default HeaderMenu;