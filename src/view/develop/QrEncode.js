import { IconArrowRight } from '@douyinfe/semi-icons';
import { Button, Col, Form, Radio, Row, Space, Toast } from "@douyinfe/semi-ui";
import QrCode from 'qrcode';
import React from 'react';

const validator = {
    url: (val) => {
        const test = /^((http|https):\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/?:]?.*$/.test(val)
        return test ? '' : '网站链接格式不正确';
    }
}

const wifiProtecel = (values) => {
    const { S, T, P, H } = values;
    return `WIFI:S:${S || ''};T:${T || ''};P:${T === 'nopass' ? '' : P || ''};${H ? 'H:true' : ''};`
}

const encode = (state, api) => {
    const { type, leftData } = state.values;
    let data = leftData;
    if (type === 'wifi') {
        data = wifiProtecel(state.values)
        console.debug('WIFI:', data)
    }
    if (!data) {
        Toast.error('编码数据不能为空')
        return
    }
    if (type === 'url') {
        const valid = validator.url(leftData, state.setValue)
        if (valid !== '') {
            Toast.error(valid)
            return
        }
    }

    QrCode.toDataURL(data)
        .then(d => api.setValue('rightData', d))
        .catch(e => {
            Toast.error('编码异常')
            console.error(e)
        })
}

const QrEncode = () => {

    const initValues = { type: 'text', T: 'WPA', rightData: '' }
    const wifiStyle = { width: '300px' }

    return (
        <Form initValues={initValues} render={({ formState, formApi, values }) => (
            <>
                <Row>
                    <Form.RadioGroup field='type' span={24} label='编码方式：' type='button' buttonSize='middle'
                        onChange={v => formApi.setValues({ leftData: null, rightData: null })}>
                        <Radio value='text'>文本</Radio>
                        <Radio value='url'>网址</Radio>
                        <Radio value='wifi'>WIFI</Radio>
                    </Form.RadioGroup>
                </Row>
                <Row type='flex' align='top'>
                    <Col span={8}>
                        <Form.Label style={{ paddingTop: '12px' }}>WIFI信息：</Form.Label>
                        {values.type === 'text' && <Form.TextArea showClear rows={15} label='编码内容：' field='leftData' />}
                        {values.type === 'url' && <Form.TextArea showClear placeholder='请输入网站链接' rows={15}
                            validate={validator.url}
                            label='编码内容：' field='leftData' />}
                        {values.type === 'wifi' &&
                            <>
                                <Form.Input field='S' label='SSID' labelPosition='inset' showClear style={wifiStyle}
                                    validate={v => v && v !== '' ? '' : 'SSID不能为空'}
                                />
                                <Form.Select field='T' label='加密' labelPosition='inset' style={wifiStyle}>
                                    <Form.Select.Option value='WPA'>WPA</Form.Select.Option>
                                    <Form.Select.Option value='WEP'>WEP</Form.Select.Option>
                                    <Form.Select.Option value='nopass'>NONE</Form.Select.Option>
                                </Form.Select>
                                {values.T !== 'nopass' && <Form.Input field='P' label='密码' labelPosition='inset' mode='password' style={wifiStyle} />}
                                <Form.Switch field='H' label='是否隐藏SSID' style={{ marginTop: '10px' }} />
                            </>
                        }
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