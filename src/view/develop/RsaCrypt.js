import { IconArrowLeft, IconArrowRight } from '@douyinfe/semi-icons';
import { Button, Col, Form, Row, Space, Toast, useFormApi, useFormState } from "@douyinfe/semi-ui";
import NodeRSA from 'node-rsa';
import React from 'react';
import { FileUtil } from '../../util/Utils';


const generateKey = (values, api) => {
    const { keyBit } = values;
    const key = new NodeRSA({ b: keyBit });

    api.setValue('privateKey', key.exportKey('private'));
    api.setValue('publicKey', key.exportKey('public'));
}

const importKey = (privateKey, values, api) => {
    if (privateKey) {
        FileUtil.read()
            .then(([, file]) => file.text())
            .then(text => api.setValue('privateKey', text));
    } else {
        FileUtil.read()
            .then(([, file]) => file.text())
            .then(text => api.setValue('publicKey', text));
    }
}

const encrypt = (values, api) => {
    const { publicKey, leftData } = values;
    if (!publicKey) { Toast.error('公钥不能为空'); return }
    if (!leftData) { Toast.error('加密数据不能为空'); return }

    const key = new NodeRSA();
    key.importKey(publicKey, 'public');

    const data = key.encrypt(leftData, 'base64');
    api.setValue('rightData', data);
}

const decrypt = (values, api) => {
    const { privateKey, rightData } = values;
    if (!privateKey) { Toast.error('公钥不能为空'); return }
    if (!rightData) { Toast.error('加密数据不能为空'); return }

    const key = new NodeRSA();
    key.importKey(privateKey, 'private');

    const data = key.decrypt(rightData, 'utf8');
    api.setValue('leftData', data);
}

const FormField = () => {

    const { RadioGroup, Radio, TextArea } = Form;

    const formApi = useFormApi()
    const { values } = useFormState()

    return <>
        <Row>
            <RadioGroup field='type' span={24} label='加密算法：' type='button' buttonSize='middle'
                onChange={v => { formApi.setValue('rightData', null); }}>
                <Radio value='rsa'>RSA</Radio>
            </RadioGroup>
        </Row>
        <Row>
            <RadioGroup field='keyBit' span={24} label='密钥位数：' type='button' buttonSize='middle'
                onChange={v => { formApi.setValues({ 'type': 'rsa' }); }}>
                <Radio value='512'>512</Radio>
                <Radio value='1024'>1024</Radio>
                <Radio value='2048'>2048</Radio>
                <Radio value='3072'>3072</Radio>
                <Radio value='4096'>4096</Radio>
            </RadioGroup>
        </Row>
        <Row type='flex' align='top'>
            <Col span={8}>
                <TextArea showClear rows={8} label='私钥：' field='privateKey' />
            </Col>
            <Col span={2} align='center' style={{ paddingTop: '80px' }}>
                <Space vertical>
                    <Button theme='solid' type='primary' size='small'
                        onClick={() => generateKey(values, formApi)}>生成</Button>
                    <Button icon={<IconArrowLeft size='small' />} theme='solid' type='primary' size='small'
                        onClick={() => importKey(true, values, formApi)}>导入</Button>
                    <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small'
                        onClick={() => importKey(false, values, formApi)}>导入</Button>
                </Space>
            </Col>
            <Col span={8} align='center'>
                <TextArea showClear rows={8} label='公钥：' field='publicKey' />
            </Col>
        </Row>
        <Row type='flex' align='top'>
            <Col span={8}>
                <TextArea showClear rows={15} label='加密内容：' field='leftData' />
            </Col>
            <Col span={2} align='center' style={{ paddingTop: '150px' }}>
                <Space vertical>
                    <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small'
                        onClick={() => encrypt(values, formApi)}>加密</Button>
                    <Button icon={<IconArrowLeft size='small' />} theme='solid' type='primary' size='small'
                        onClick={() => decrypt(values, formApi)}>解密</Button>
                </Space>
            </Col>
            <Col span={8} align='center'>
                <TextArea showClear rows={15} label='解密内容：' field='rightData' />
            </Col>
        </Row>
    </>
}

const RsaCrypt = () => {

    const initValues = { type: 'rsa', keyBit: '512' }

    return <Form initValues={initValues}><FormField /></Form>;
}

export default RsaCrypt;