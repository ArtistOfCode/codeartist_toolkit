import { IconArrowLeft, IconArrowRight } from '@douyinfe/semi-icons';
import { Button, Col, Form, Row, Space, Toast, Tooltip, useFormApi } from "@douyinfe/semi-ui";
import React from 'react';

const operate = {
    url: (data, op) => op ? encodeURI(data) : decodeURI(data),
    hex: (data, op) => op ? Buffer.from(data, 'utf-8').toString('hex') : Buffer.from(data, 'hex').toString('utf-8'),
    base64: (data, op) => op ? Buffer.from(data).toString('base64') : Buffer.from(data, 'base64').toString(),
}

const encode = api => {
    const { type, leftData } = api.getValues();
    const data = leftData;
    if (!data) {
        Toast.error('编码数据不能为空')
        return
    }
    api.setValue('rightData', operate[type](data, true))
}

const decode = api => {
    const { type, rightData } = api.getValues();
    const data = rightData;
    if (!data) {
        Toast.error('解码数据不能为空')
        return
    }
    try {
        api.setValue('leftData', operate[type](data, false))
    } catch (error) {
        Toast.error('解码异常')
    }
}

const FormField = () => {

    const { RadioGroup, Radio, TextArea } = Form;

    const formApi = useFormApi()

    return <>
        <Row>
            <RadioGroup field='type' span={24} label='编码方式：' type='button' buttonSize='middle' onChange={v => formApi.setValues({ leftData: null, rightData: null })}>
                <Tooltip content='URL编码' position='bottom'>
                    <Radio value='url'>URL</Radio>
                </Tooltip>
                <Tooltip content='十六进制编码' position='bottom'>
                    <Radio value='hex'>Hex</Radio>
                </Tooltip>
                <Tooltip content='Base64编码' position='bottom'>
                    <Radio value='base64'>Base64</Radio>
                </Tooltip>
            </RadioGroup>
        </Row>
        <Row type='flex' align='middle'>
            <Col span={8}>
                <TextArea showClear rows={15} label='编码内容：' field='leftData' />
            </Col>
            <Col span={2} align='center'>
                <Space vertical>
                    <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small'
                        onClick={() => encode(formApi)}>编码</Button>
                    <Button icon={<IconArrowLeft size='small' />} theme='solid' type='primary' size='small'
                        onClick={() => decode(formApi)}>解码</Button>
                </Space>
            </Col>
            <Col span={8}>
                <TextArea showClear rows={15} label='解码内容：' field='rightData' />
            </Col>
        </Row>
    </>
}

const TextEncode = () =>
    <Form initValues={{ type: 'url' }}><FormField /></Form>

export default TextEncode;