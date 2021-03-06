import { IconArrowRight } from '@douyinfe/semi-icons';
import { Button, Col, Form, Row, Space, Toast, useFormApi, useFormState } from "@douyinfe/semi-ui";
import QrCode from 'qrcode';
import React from 'react';
import ToolTitle from '../../components/ToolTitle';

const validator = {
    url: (val) => {
        const test = /^((http|https):\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/?:]?.*$/.test(val)
        return test ? '' : '网站链接格式不正确';
    }
}

const { RadioGroup, Radio, Label, Input, TextArea, Slot, Select, Switch } = Form;

const FormField = () => {

    const inputStyle = { width: '300px' }

    const formApi = useFormApi()
    const formState = useFormState()
    const values = formState.values

    const wifiProtecel = () => {
        const { S, T, P, H } = values;
        return `WIFI:S:${S || ''};T:${T || ''};P:${T === 'nopass' ? '' : P || ''};${H ? 'H:true' : ''};`
    }

    const vcardProtecel = () => {
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

    const encode = () => {
        const { type, leftData } = values;
        let data = leftData;
        if (type === 'wifi') {
            data = wifiProtecel()
            console.debug('WIFI:', data)
        }
        if (type === 'vcard') {
            data = vcardProtecel()
            console.debug('VCARD:', data)
        }
        if (!data) {
            Toast.error('编码数据不能为空')
            return
        }
        if (type === 'url') {
            const valid = validator.url(leftData)
            if (valid !== '') {
                Toast.error(valid)
                return
            }
        }

        QrCode.toDataURL(data)
            .then(d => formApi.setValue('rightData', d))
            .catch(e => {
                Toast.error('编码异常')
                console.error(e)
            })
    }

    return <>
        <Row>
            <RadioGroup field='type' span={24} label='编码方式：' type='button' onChange={v => formApi.setValues({ leftData: null })}>
                <Radio value='text'>文本</Radio>
                <Radio value='url'>网址</Radio>
                <Radio value='vcard'>电子名片</Radio>
                <Radio value='wifi'>WIFI</Radio>
            </RadioGroup>
        </Row>
        <Row type='flex' align='top'>
            <Col span={8}>
                {values.type === 'text' && <TextArea showClear rows={15} label='编码内容：' field='leftData' />}
                {values.type === 'url' && <TextArea showClear placeholder='请输入网站链接' rows={15} label='编码内容：' field='leftData'
                    validate={validator.url} />}
                {values.type === 'wifi' &&
                    <>
                        <Label style={{ paddingTop: '12px' }}>WIFI信息：</Label>
                        <Input field='S' label='SSID' labelPosition='inset' showClear style={inputStyle}
                            validate={v => v && v !== '' ? '' : 'SSID不能为空'}
                        />
                        <Select field='T' label='加密' labelPosition='inset' style={inputStyle}>
                            <Select.Option value='WPA'>WPA</Select.Option>
                            <Select.Option value='WEP'>WEP</Select.Option>
                            <Select.Option value='nopass'>NONE</Select.Option>
                        </Select>
                        {values.T !== 'nopass' && <Input field='P' label='密码' labelPosition='inset' mode='password' style={inputStyle} />}
                        <Switch field='H' label='是否隐藏SSID' style={{ marginTop: '10px' }} />
                    </>
                }
                {values.type === 'vcard' &&
                    <>
                        <Label style={{ paddingTop: '12px' }}>名片信息：</Label>
                        <Input field='N' label='姓名' labelPosition='inset' showClear style={inputStyle} />
                        <Input field='NICKNAME' label='昵称' labelPosition='inset' showClear style={inputStyle} />
                        <Input field='TEL' label='手机' labelPosition='inset' showClear style={inputStyle} />
                        <Input field='EMAIL' label='邮箱' labelPosition='inset' showClear style={inputStyle} />
                        <Input field='ADR' label='地址' labelPosition='inset' showClear style={inputStyle} />
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
}

const QrEncode = () => {

    const initValues = { type: 'text', T: 'WPA', rightData: '' }

    return <>
        <ToolTitle text='二维码' />
        <Form initValues={initValues}><FormField /></Form>
    </>
}

export default QrEncode;