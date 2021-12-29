import { IconArrowLeft, IconArrowRight } from '@douyinfe/semi-icons';
import { Button, Col, Form, Row, Space, useFormApi, useFormState } from "@douyinfe/semi-ui";
import React from 'react';

const encrypt = (values, api) => { }
const decrypt = (values, api) => { }

const FormField = () => {

    const { RadioGroup, Radio, TextArea } = Form;

    const formApi = useFormApi()
    const { values } = useFormState()

    return <>
        <Row>
            <RadioGroup field='type' span={24} label='加密算法：' type='button' buttonSize='middle'
                onChange={v => { formApi.setValue('rightData', null); }}>
                <Radio value='md5'>MD5</Radio>
                <Radio value='hash'>SHA</Radio>
            </RadioGroup>
        </Row>
        <Row type='flex' align='top'>
            <Col span={8}>
                <TextArea showClear rows={15} label='加密内容：' field='leftData' />
            </Col>
            <Col span={2} align='center' style={{ paddingTop: '150px' }}>
                <Space vertical>
                    <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small'
                        onClick={() => encrypt(values, formApi)}>编码</Button>
                    <Button icon={<IconArrowLeft size='small' />} theme='solid' type='primary' size='small'
                        onClick={() => decrypt(values, formApi)}>解码</Button>
                </Space>
            </Col>
            <Col span={8} align='center'>
                <TextArea showClear rows={15} label='解密内容：' field='leftData' />
            </Col>
        </Row>
    </>
}

const RsaCrypt = () => {

    const initValues = { type: 'md5' }

    return <Form initValues={initValues}><FormField /></Form>;
}

export default RsaCrypt;