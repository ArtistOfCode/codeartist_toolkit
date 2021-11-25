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

const vcardProtecel = (values) => {
    const { N, NICKNAME, TEL, EMAIL, ADR } = values;
    let res = 'BEGIN:VCARD\nVERSION:3.0\n'
    if (N) res += 'N:' + N + '\n'
    if (NICKNAME) res += 'NICKNAME:' + NICKNAME + '\n'
    if (TEL) res += 'TEL:' + TEL + '\n'
    if (EMAIL) res += 'EMAIL:' + EMAIL + '\n'
    if (ADR) res += 'ADR:' + ADR + '\n'
    res += 'END:VCARD'
    return res;
}

const encode = (state, api) => {
    const { type, leftData } = state.values;
    let data = leftData;
    if (type === 'wifi') {
        data = wifiProtecel(state.values)
        console.debug('WIFI:', data)
    }
    if (type === 'vcard') {
        data = vcardProtecel(state.values)
        console.debug('VCARD:', data)
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

    const { RadioGroup, Label, Input, TextArea, Slot, Select, Switch } = Form;

    const initValues = { type: 'text', T: 'WPA', rightData: '' }
    const wifiStyle = { width: '300px' }

    return (
        <Form initValues={initValues} render={({ formState, formApi, values }) => (
            <>
                <Row>
                    <RadioGroup field='type' span={24} label='编码方式：' type='button' buttonSize='middle'
                        onChange={v => formApi.setValues({ leftData: null, rightData: null })}>
                        <Radio value='text'>文本</Radio>
                        <Radio value='url'>网址</Radio>
                        <Radio value='vcard'>电子名片</Radio>
                        <Radio value='wifi'>WIFI</Radio>
                    </RadioGroup>
                </Row>
                <Row type='flex' align='top'>
                    <Col span={8}>
                        {values.type === 'text' && <TextArea showClear rows={15} label='编码内容：' field='leftData' />}
                        {values.type === 'url' && <TextArea showClear placeholder='请输入网站链接' rows={15}
                            validate={validator.url}
                            label='编码内容：' field='leftData' />}
                        {values.type === 'wifi' &&
                            <>
                                <Label style={{ paddingTop: '12px' }}>WIFI信息：</Label>
                                <Input field='S' label='SSID' labelPosition='inset' showClear style={wifiStyle}
                                    validate={v => v && v !== '' ? '' : 'SSID不能为空'}
                                />
                                <Select field='T' label='加密' labelPosition='inset' style={wifiStyle}>
                                    <Select.Option value='WPA'>WPA</Select.Option>
                                    <Select.Option value='WEP'>WEP</Select.Option>
                                    <Select.Option value='nopass'>NONE</Select.Option>
                                </Select>
                                {values.T !== 'nopass' && <Input field='P' label='密码' labelPosition='inset' mode='password' style={wifiStyle} />}
                                <Switch field='H' label='是否隐藏SSID' style={{ marginTop: '10px' }} />
                            </>
                        }
                        {values.type === 'vcard' &&
                            <>
                                <Label style={{ paddingTop: '12px' }}>名片信息：</Label>
                                <Input field='N' label='姓名' labelPosition='inset' showClear style={wifiStyle} />
                                <Input field='NICKNAME' label='昵称' labelPosition='inset' showClear style={wifiStyle} />
                                <Input field='TEL' label='手机' labelPosition='inset' showClear style={wifiStyle} />
                                <Input field='EMAIL' label='邮箱' labelPosition='inset' showClear style={wifiStyle} />
                                <Input field='ADR' label='地址' labelPosition='inset' showClear style={wifiStyle} />
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
                        <Slot label='二维码：'>
                            <div>
                                <img alt='' src={values.rightData} />
                            </div>
                        </Slot>
                    </Col>
                </Row>
            </>
        )}>
        </Form>
    )
}

export default QrEncode;