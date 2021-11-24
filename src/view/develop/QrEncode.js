import { IconArrowRight } from '@douyinfe/semi-icons';
import { Button, Col, Form, Radio, Row, Space, Toast } from "@douyinfe/semi-ui";
import QrCode from 'qrcode';
import React from 'react';

const validator = {
    url: (val, values) => {
        const test = /^((http|https):\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/?:]?.*$/.test(val)
        return test ? '' : '网站链接格式不正确';
    }
}

const encode = (state, api) => {
    const { type, leftData } = state.values;
    const data = leftData;
    if (!data) {
        Toast.error('编码数据不能为空')
        return
    }
    const valid = validator[type](leftData, state.setValue)
    if ('' !== valid) {
        Toast.error(valid)
        return
    }

    QrCode.toDataURL(data)
        .then(d => api.setValue('rightData', d))
        .catch(e => {
            Toast.error('编码异常')
            console.error(e)
        })
}

const QrEncode = () => {

    return (
        <Form initValues={{ type: 'text', rightData: '' }} render={({ formState, formApi, values }) => (
            <>
                <Row>
                    <Form.RadioGroup field='type' span={24} label='编码方式：' type='button' buttonSize='middle'
                        onChange={v => formApi.setValues({ leftData: null, rightData: null })}>
                        <Radio value='text'>文本</Radio>
                        <Radio value='url'>网址</Radio>
                    </Form.RadioGroup>
                </Row>
                <Row type='flex' align='top'>
                    <Col span={8}>
                        {values.type === 'text' && <Form.TextArea showClear rows={15} label='编码内容：' field='leftData' />}
                        {values.type === 'url' && <Form.TextArea showClear placeholder='请输入网站链接' rows={15}
                            validate={validator.url}
                            label='编码内容：' field='leftData' />}
                    </Col>
                    <Col span={2} align='center' style={{ paddingTop: '150px' }}>
                        <Space vertical>
                            <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small'
                                onClick={() => encode(formState, formApi)}>编码</Button>
                        </Space>
                    </Col>
                    <Col span={6} align='center'>
                        <Form.Slot label='二维码：'>
                            <div>
                                <img alt='' src={values.rightData} />
                            </div>
                        </Form.Slot>
                    </Col>
                </Row>
            </>
        )}>
        </Form>
    )
}

export default QrEncode;