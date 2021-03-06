import { IconArrowLeft, IconArrowRight, IconPlus } from '@douyinfe/semi-icons';
import { Button, Col, Form, Row, Space, Toast, useFormApi, useFormState } from "@douyinfe/semi-ui";
import React from 'react';
import ToolTitle from '../../components/ToolTitle';

const { RadioGroup, Radio, Upload, TextArea } = Form;

const FormField = () => {

    const formApi = useFormApi()
    const formState = useFormState()
    const values = formState.values

    const encode = () => {
        const { type, file } = formState.values;
        const data = file[0];
        if (!data) {
            Toast.error('编码数据不能为空')
            return
        }
        if (type === 'base64' && data.fileInstance) {
            const fd = new FileReader()
            fd.readAsDataURL(data.fileInstance);
            fd.onload = () => formApi.setValue('rightData', fd.result)
        }
    }

    const decode = (api) => {
        const { rightData } = formState.values;
        if (!rightData) {
            Toast.error('解码数据不能为空')
            return
        }
        try {
            api.setValue('file', [{ url: rightData }])
        } catch (error) {
            Toast.error('解码异常')
        }
    }

    return <>
        <Row>
            <RadioGroup field='type' span={24} label='编码方式：' type='button' onChange={v => formApi.setValue('rightData', null)}>
                <Radio value='base64'>Base64</Radio>
            </RadioGroup>
        </Row>
        <Row type='flex' align='top'>
            <Col span={6} align='center'>
                <Upload field='file' label='编码内容：' action='false' listType="picture" accept="image/*" uploadTrigger='custom' limit={1}>
                    <IconPlus size="extra-large" />
                </Upload>
                {values.file && values.file[0] && <img style={{ width: '200px' }} alt='' src={values.file[0].url} />}
            </Col>
            <Col span={2} align='center' style={{ paddingTop: '150px' }}>
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

const ImageEncode = () =>
    <>
        <ToolTitle text='图形编码' />
        <Form initValues={{ type: 'base64' }}><FormField /></Form>
    </>

export default ImageEncode;