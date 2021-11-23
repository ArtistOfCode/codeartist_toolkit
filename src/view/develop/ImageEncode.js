import { IconArrowLeft, IconArrowRight, IconPlus } from '@douyinfe/semi-icons';
import { Button, Col, Form, Radio, Row, Space, Toast, Tooltip } from "@douyinfe/semi-ui";
import React from 'react';

const operate = {
    base64: (data, op) => op ? Buffer.from(data).toString('base64') : Buffer.from(data, 'base64').toString(),
}

const encode = api => {
    const { type, file } = api.getValues();
    const data = file;
    console.log(file)
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

const ImageEncode = () => {

    let api = React.useRef();

    return (
        <Form initValues={{ type: 'base64' }} getFormApi={v => api = v}>
            <Row>
                <Form.RadioGroup field='type' span={24} label='编码方式：' type='button' buttonSize='middle' onChange={v => api.setValues({ leftData: null, rightData: null })}>
                    <Tooltip content='Base64编码' position='bottom'>
                        <Radio value='base64'>Base64</Radio>
                    </Tooltip>
                </Form.RadioGroup>
            </Row>
            <Row type='flex' align='top'>
                <Col span={8} align='center'>
                    <Form.Upload field='file' label='编码内容：' listType="picture"
                        uploadTrigger='custom' limit={1} previewFile={file => api.setValue('file', file.url)}>
                        <IconPlus size="extra-large" />
                    </Form.Upload>
                </Col>
                <Col span={2} align='center' style={{ paddingTop: '150px' }}>
                    <Space vertical>
                        <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small'
                            onClick={() => encode(api)}>编码</Button>
                        <Button icon={<IconArrowLeft size='small' />} theme='solid' type='primary' size='small'
                            onClick={() => decode(api)}>解码</Button>
                    </Space>
                </Col>
                <Col span={8}>
                    <Form.TextArea showClear rows={15} label='解码内容：' field='rightData' />
                </Col>
            </Row>
        </Form>
    )
}

export default ImageEncode;