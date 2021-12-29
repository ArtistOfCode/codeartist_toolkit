import { IconArrowRight } from '@douyinfe/semi-icons';
import { Button, Col, Form, Row, Space, Toast, useFormApi, useFormState } from "@douyinfe/semi-ui";
import CryptoJS from 'crypto-js';
import React from 'react';

const encrypt = (values, api) => {
    const { type, encode, leftData } = values;
    const data = leftData;
    if (!data) {
        Toast.error('编码数据不能为空')
        return
    }
    api.setValue('rightData', CryptoJS[type](data).toString(CryptoJS.enc[encode]))
}

const FormField = () => {

    const { RadioGroup, Radio, TextArea } = Form;

    const formApi = useFormApi()
    const { values } = useFormState()

    return <>
        <Row>
            <RadioGroup field='type' span={24} label='摘要算法：' type='button' buttonSize='middle'
                onChange={v => { formApi.setValue('rightData', null); }}>
                <Radio value='MD5'>MD5</Radio>
                <Radio value='SHA1'>SHA1</Radio>
                <Radio value='SHA256'>SHA256</Radio>
                <Radio value='SHA512'>SHA512</Radio>
                <Radio value='SHA3'>SHA3</Radio>
            </RadioGroup>
        </Row>
        <Row>
            <RadioGroup field='encode' span={24} label='编码方式：' type='button' buttonSize='middle'
                onChange={v => { formApi.setValue('rightData', null); }}>
                <Radio value='Base64'>Base64</Radio>
                <Radio value='Hex'>Hex</Radio>
            </RadioGroup>
        </Row>
        <Row type='flex' align='top'>
            <Col span={8}>
                <TextArea showClear rows={15} label='信息内容：' field='leftData' />
            </Col>
            <Col span={2} align='center' style={{ paddingTop: '150px' }}>
                <Space vertical>
                    <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small'
                        onClick={() => encrypt(values, formApi)}>加密</Button>
                </Space>
            </Col>
            <Col span={8} align='center'>
                <TextArea showClear rows={15} label='摘要内容：' field='rightData' />
            </Col>
        </Row>
    </>
}

const HashCrypt = () => {

    const initValues = { type: 'MD5', encode: 'Base64' }

    return <Form initValues={initValues}><FormField /></Form>
}

export default HashCrypt;