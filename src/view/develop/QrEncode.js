import { IconArrowRight, IconPlus } from '@douyinfe/semi-icons';
import { Button, Col, Form, Radio, Row, Space, Toast } from "@douyinfe/semi-ui";
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

const QrEncode = () => {

    let api = React.useRef();

    return (
        <Form initValues={{ type: 'text' }} getFormApi={v => api = v}>
            <Row>
                <Form.RadioGroup field='type' span={24} label='编码方式：' type='button' buttonSize='middle' onChange={v => api.setValues({ leftData: null, rightData: null })}>
                    <Radio value='text'>文本</Radio>
                    <Radio value='url'>网址</Radio>
                </Form.RadioGroup>
            </Row>
            <Row type='flex' align='top'>
                <Col span={8}>
                    <Form.TextArea showClear rows={15} label='编码内容：' field='leftData' />
                </Col>
                <Col span={2} align='center' style={{ paddingTop: '150px' }}>
                    <Space vertical>
                        <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small'
                            onClick={() => encode(api)}>编码</Button>
                    </Space>
                </Col>
                <Col span={6} align='center'>
                    <Form.Upload field='file' label='二维码：' listType="picture" accept="image/*" uploadTrigger='custom' limit={1}>
                        <IconPlus size="extra-large" />
                    </Form.Upload>
                </Col>
            </Row>
        </Form>
    )
}

export default QrEncode;