import { IconArrowLeft, IconArrowRight } from '@douyinfe/semi-icons';
import { Button, Col, Form, Row, Space, Toast, useFormApi, useFormState } from "@douyinfe/semi-ui";
import React from 'react';
import ToolTitle from "../../components/ToolTitle";

const operate = {
    url: (data, op) => op ? encodeURI(data) : decodeURI(data),
    hex: (data, op) => op ? Buffer.from(data, 'utf-8').toString('hex') : Buffer.from(data, 'hex').toString('utf-8'),
    base64: (data, op) => op ? Buffer.from(data).toString('base64') : Buffer.from(data, 'base64').toString(),
}

const { RadioGroup, Radio, TextArea } = Form;

const FormField = () => {

    const formApi = useFormApi()
    const formState = useFormState()

    const encode = () => {
        const { type, leftData } = formState.values;
        if (!leftData) {
            Toast.error('编码数据不能为空')
            return
        }
        formApi.setValue('rightData', operate[type](leftData, true))
    }

    const decode = () => {
        const { type, rightData } = formState.values;
        if (!rightData) {
            Toast.error('解码数据不能为空')
            return
        }
        try {
            formApi.setValue('leftData', operate[type](rightData, false))
        } catch (error) {
            Toast.error('解码异常')
        }
    }

    return <>
        <Row>
            <RadioGroup field='type' span={24} label='编码方式：' type='button' onChange={() => formApi.setValue('rightData', null)}>
                <Radio value='url'>URL</Radio>
                <Radio value='hex'>Hex</Radio>
                <Radio value='base64'>Base64</Radio>
            </RadioGroup>
        </Row>
        <Row type='flex' align='middle'>
            <Col span={8}>
                <TextArea showClear rows={15} label='编码内容：' field='leftData' />
            </Col>
            <Col span={2} align='center'>
                <Space vertical>
                    <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small' onClick={encode}>编码</Button>
                    <Button icon={<IconArrowLeft size='small' />} theme='solid' type='primary' size='small' onClick={decode}>解码</Button>
                </Space>
            </Col>
            <Col span={8}>
                <TextArea showClear rows={15} label='解码内容：' field='rightData' />
            </Col>
        </Row>
    </>
}

const TextEncode = () =>
    <>
        <ToolTitle text='文本编码' />
        <Form initValues={{ type: 'url' }}><FormField /></Form>
    </>

export default TextEncode;