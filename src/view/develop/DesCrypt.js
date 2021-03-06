import { IconArrowLeft, IconArrowRight } from '@douyinfe/semi-icons';
import { Button, Col, Form, Radio, Row, Space, Toast, useFormApi, useFormState } from "@douyinfe/semi-ui";
import CryptoJS from 'crypto-js';
import React from 'react';
import ToolTitle from '../../components/ToolTitle';

const { RadioGroup, TextArea, Input } = Form;

const FormField = () => {

    const formApi = useFormApi()
    const { values } = useFormState()

    const encrypt = () => {
        let { type, mode, padding, key, leftData } = values;

        if (!leftData) { Toast.error('加密数据不能为空'); return }
        if (!key) { Toast.error('密钥不能为空'); return }

        if (mode === 'ECB') {
            if (key.length % 4 !== 0) { Toast.warning('密钥位数不正确'); return }
            key = CryptoJS.enc.Utf8.parse(key)
        }
        const config = { mode: CryptoJS.mode[mode], padding: CryptoJS.pad[padding] }

        try {
            formApi.setValue('rightData', CryptoJS[type].encrypt(leftData, key, config).toString())
        } catch (e) {
            Toast.error(e.toString())
        }
    }

    const decrypt = () => {
        let { type, mode, padding, key, rightData } = values;

        if (!rightData) { Toast.error('解码数据不能为空'); return }
        if (!key) { Toast.error('密钥不能为空'); return }

        if (mode === 'ECB') {
            if (key.length % 4 !== 0) { Toast.warning('密钥位数不正确'); return }
            key = CryptoJS.enc.Utf8.parse(key)
        }
        const config = { mode: CryptoJS.mode[mode], padding: CryptoJS.pad[padding] }

        try {
            const chiper = CryptoJS[type].decrypt(rightData, key, config).toString(CryptoJS.enc.Utf8);
            if (!chiper) Toast.error('解密失败')
            formApi.setValue('leftData', chiper)
        } catch (e) {
            Toast.error(e.toString())
        }
    }

    const reset = () => formApi.setValue('rightData', null)

    return <>
        <RadioGroup field='type' span={24} label='加密算法：' type='button' onChange={reset}>
            <Radio value='AES'>AES</Radio>
            <Radio value='DES'>DES</Radio>
            <Radio value='TripleDES'>TripleDES</Radio>
            <Radio value='RC4'>RC4</Radio>
        </RadioGroup>
        <RadioGroup field='mode' span={24} label='加密模式：' type='button' onChange={reset}>
            <Radio value='ECB'>ECB</Radio>
            <Radio value='CBC'>CBC</Radio>
            <Radio value='CFB'>CFB</Radio>
            <Radio value='CTR'>CTR</Radio>
            <Radio value='OFB'>OFB</Radio>
        </RadioGroup>
        <RadioGroup field='padding' span={24} label='填充形式：' type='button' onChange={reset}>
            <Radio value='Pkcs7'>Pkcs7</Radio>
            <Radio value='Iso97971'>Iso97971</Radio>
            <Radio value='AnsiX923'>AnsiX923</Radio>
            <Radio value='Iso10126'>Iso10126</Radio>
            <Radio value='ZeroPadding'>ZeroPadding</Radio>
            <Radio value='NoPadding'>NoPadding</Radio>
        </RadioGroup>
        <Row span={8} style={{ width: '30%' }}>
            <Input field='key' label='密钥：' showClear />
        </Row>
        <Row type='flex' align='top'>
            <Col span={8}>
                <TextArea showClear rows={15} label='加密内容：' field='leftData' />
            </Col>
            <Col span={2} align='center' style={{ paddingTop: '150px' }}>
                <Space vertical>
                    <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small' onClick={encrypt}>加密</Button>
                    <Button icon={<IconArrowLeft size='small' />} theme='solid' type='primary' size='small' onClick={decrypt}>解码</Button>
                </Space>
            </Col>
            <Col span={8} align='center'>
                <TextArea showClear rows={15} label='解密内容：' field='rightData' />
            </Col>
        </Row>
    </>
}

const DesCrypt = () => {

    const initValues = { type: 'AES', mode: 'ECB', padding: 'Pkcs7' }

    return <>
        <ToolTitle text='对称加密' />
        <Form initValues={initValues}><FormField /></Form>
    </>
}

export default DesCrypt;