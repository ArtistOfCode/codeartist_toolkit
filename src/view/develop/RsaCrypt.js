import { IconArrowLeft, IconArrowRight } from '@douyinfe/semi-icons';
import { Button, Col, Form, Row, Space, Toast, useFormApi, useFormState } from "@douyinfe/semi-ui";
import NodeRSA from 'node-rsa';
import React from 'react';
import ToolTitle from '../../components/ToolTitle';

const { RadioGroup, Radio, TextArea } = Form;

const FormField = () => {

    const formApi = useFormApi()
    const { values } = useFormState()

    const generateKey = () => {
        const { keyType, keyBit } = values;
        const key = new NodeRSA({ b: keyBit });

        formApi.setValue('privateKey', key.exportKey(keyType + '-private'));
        formApi.setValue('publicKey', key.exportKey(keyType + '-public'));
    }

    const importKey = (privateKey) => {
        window.showOpenFilePicker()
            .then(([fileHandle]) => fileHandle.getFile())
            .then(file => file.text())
            .then(text => formApi.setValue(privateKey ? 'privateKey' : 'publicKey', text))
    }

    const encrypt = () => {
        const { keyType, publicKey, leftData } = values;
        if (!publicKey) { Toast.error('公钥不能为空'); return }
        if (!leftData) { Toast.error('加密数据不能为空'); return }

        try {
            const key = new NodeRSA();
            key.importKey(publicKey, keyType + '-public');

            const data = key.encrypt(leftData, 'base64');
            formApi.setValue('rightData', data);
        } catch (error) {
            console.error(error);
            Toast.error('加密异常');
        }
    }

    const decrypt = () => {
        const { keyType, privateKey, rightData } = values;
        if (!privateKey) { Toast.error('私钥不能为空'); return }
        if (!rightData) { Toast.error('解密数据不能为空'); return }

        try {
            const key = new NodeRSA();
            key.importKey(privateKey, keyType + '-private');

            const data = key.decrypt(rightData, 'utf8');
            formApi.setValue('leftData', data);
        } catch (error) {
            console.error(error);
            Toast.error('解密异常');
        }
    }

    return <>
        <Row>
            <RadioGroup field='type' span={24} label='加密算法：' type='button' onChange={v => { formApi.setValue('rightData', null); }}>
                <Radio value='rsa'>RSA</Radio>
            </RadioGroup>
        </Row>
        <Row>
            <RadioGroup field='keyType' span={24} label='密钥类型：' type='button' onChange={v => {
                formApi.setValue('privateKey', null);
                formApi.setValue('publicKey', null);
            }}>
                <Radio value='pkcs1'>pkcs1</Radio>
                <Radio value='pkcs8'>pkcs8</Radio>
                <Radio value='openssh'>openssh</Radio>
            </RadioGroup>
        </Row>
        <Row>
            <RadioGroup field='keyBit' span={24} label='密钥位数：' type='button' onChange={v => {
                formApi.setValue('privateKey', null);
                formApi.setValue('publicKey', null);
            }}>
                <Radio value='512'>512</Radio>
                <Radio value='1024'>1024</Radio>
                <Radio value='2048'>2048</Radio>
                <Radio value='3072'>3072</Radio>
                <Radio value='4096'>4096</Radio>
            </RadioGroup>
        </Row>
        <Row type='flex' align='top'>
            <Col span={8}>
                <TextArea showClear rows={5} label='私钥：' field='privateKey' />
            </Col>
            <Col span={2} align='center' style={{ paddingTop: '50px' }}>
                <Space vertical>
                    <Button theme='solid' type='primary' size='small' onClick={generateKey}>生成</Button>
                    <Button icon={<IconArrowLeft size='small' />} theme='solid' type='primary' size='small' onClick={() => importKey(true)}>导入</Button>
                    <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small' onClick={() => importKey(false)}>导入</Button>
                </Space>
            </Col>
            <Col span={8} align='center'>
                <TextArea showClear rows={5} label='公钥：' field='publicKey' />
            </Col>
        </Row>
        <Row type='flex' align='top'>
            <Col span={8}>
                <TextArea showClear rows={15} label='加密内容：' field='leftData' />
            </Col>
            <Col span={2} align='center' style={{ paddingTop: '150px' }}>
                <Space vertical>
                    <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small' onClick={encrypt}>加密</Button>
                    <Button icon={<IconArrowLeft size='small' />} theme='solid' type='primary' size='small' onClick={decrypt}>解密</Button>
                </Space>
            </Col>
            <Col span={8} align='center'>
                <TextArea showClear rows={15} label='解密内容：' field='rightData' />
            </Col>
        </Row>
    </>
}

const RsaCrypt = () => {

    const initValues = { type: 'rsa', keyType: 'pkcs1', keyBit: '512' }

    return <>
        <ToolTitle text='非对称加密' />
        <Form initValues={initValues}><FormField /></Form>
    </>
}

export default RsaCrypt;