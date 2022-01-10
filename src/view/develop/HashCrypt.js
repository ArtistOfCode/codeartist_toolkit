import { IconArrowRight } from '@douyinfe/semi-icons';
import { Button, Col, Form, Row, Toast, useFormApi, useFormState } from "@douyinfe/semi-ui";
import CryptoJS from 'crypto-js';
import React from 'react';
import ToolTitle from '../../components/ToolTitle';

const { RadioGroup, Radio, TextArea } = Form;

const FormField = () => {

    const formApi = useFormApi()
    const { values } = useFormState()

    const encrypt = () => {
        const { type, encode, leftData } = values;
        if (!leftData) {
            Toast.error('编码数据不能为空')
            return
        }
        formApi.setValue('rightData', CryptoJS[type](leftData).toString(CryptoJS.enc[encode]))
    }

    return <>
        <Row>
            <RadioGroup field='type' span={24} label='算法类型：' type='button' onChange={_v => formApi.setValue('rightData', null)}>
                <Radio value='MD5'>MD5</Radio>
                <Radio value='SHA1'>SHA1</Radio>
                <Radio value='SHA256'>SHA256</Radio>
                <Radio value='SHA512'>SHA512</Radio>
                <Radio value='SHA3'>SHA3</Radio>
            </RadioGroup>
        </Row>
        <Row>
            <RadioGroup field='encode' span={24} label='编码方式：' type='button' onChange={_v => formApi.setValue('rightData', null)}>
                <Radio value='Base64'>Base64</Radio>
                <Radio value='Hex'>Hex</Radio>
            </RadioGroup>
        </Row>
        <Row type='flex' align='top'>
            <Col span={8}>
                <TextArea showClear rows={15} label='信息内容：' field='leftData' />
            </Col>
            <Col span={2} align='center' style={{ paddingTop: '150px' }}>
                <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small' onClick={encrypt}>加密</Button>
            </Col>
            <Col span={8} align='center'>
                <TextArea showClear rows={15} label='摘要内容：' field='rightData' />
            </Col>
        </Row>
    </>
}

const HashCrypt = () => {

    const initValues = { type: 'MD5', encode: 'Base64' }

    return <>
        <ToolTitle text='摘要算法' />
        <Form initValues={initValues}><FormField /></Form>
    </>
}

export default HashCrypt;