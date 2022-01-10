import { IconArrowRight } from "@douyinfe/semi-icons";
import { Button, Col, Form, Progress, Row, Space, Toast, Typography, useFormApi, useFormState } from "@douyinfe/semi-ui";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ToolTitle from "../../components/ToolTitle";
import { MathUtil } from '../../util/Utils';

require('codemirror/mode/css/css');
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

const mime = {
    json: 'application/json',
    js: 'text/javascript',
    html: 'text/html',
    css: 'text/css',
}

const { Text } = Typography
const { Slot, RadioGroup, Radio } = Form

const errorHandler = callback => { try { return callback() } catch (e) { return e.toString() } }

const operate = {
    format: {
        json: value => errorHandler(() => JSON.stringify(JSON.parse(value), null, '  ')),
    },
    simplify: {
        json: value => errorHandler(() => JSON.stringify(JSON.parse(value))),
    }
}

const FormField = () => {

    const formApi = useFormApi()
    const { values } = useFormState()

    const format = () => {
        const { type, leftData } = values
        if (!leftData) { Toast.error('代码不能为空'); return }

        formApi.setValue('rightData', operate.format[type](leftData))
    }

    const simplify = () => {
        const { type, leftData } = values
        if (!leftData) { Toast.error('代码不能为空'); return }
        const data = leftData

        const rightData = operate.simplify[type](data);
        formApi.setValue('rightData', rightData)
        formApi.setValue('leftSize', data.length)
        formApi.setValue('rightSize', rightData.length)
        formApi.setValue('percent', MathUtil.percent(data.length - rightData.length, data.length))
    }

    return <>
        <RadioGroup field='type' span={24} label='编程语言：' type='button'>
            <Radio value='json'>JSON</Radio>
        </RadioGroup>
        <Row>
            <Col span={10}>
                <Slot label='源代码：'>
                    <CodeMirror
                        value={values.leftData}
                        options={{ mode: mime[values.type], theme: 'material', lineNumbers: true, }}
                        onBeforeChange={(_e, _d, value) => formApi.setValue('leftData', value)}
                    />
                </Slot>
            </Col>
            <Col span={3} align='center' style={{ paddingTop: '80px' }}>
                <Space vertical>
                    <Text>原始大小：{values.leftSize}</Text>
                    <Text>压缩大小：{values.rightSize}</Text>
                    <Progress type='circle' percent={values.percent} showInfo />
                    <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small' onClick={format}>格式化</Button>
                    <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small' onClick={simplify}>压缩</Button>
                </Space>
            </Col>
            <Col span={10}>
                <Slot label='格式化代码：'>
                    <CodeMirror
                        value={values.rightData}
                        options={{ mode: mime[values.type], theme: 'material', lineNumbers: true, readOnly: true, }}
                    />
                </Slot>
            </Col>
        </Row>
    </>
}

const CodeFormatter = () => {

    const initValues = { type: 'json' }

    return <>
        <ToolTitle text='代码格式化' />
        <Form initValues={initValues}><FormField /></Form>
    </>
}

export default CodeFormatter