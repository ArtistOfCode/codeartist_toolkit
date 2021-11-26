import { IconArrowRight } from "@douyinfe/semi-icons";
import { Button, Col, Form, Progress, Row, Space, Typography, useFormApi, useFormState } from "@douyinfe/semi-ui";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/mode/css/css');
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

const mime = {
    json: 'application/json',
    js: 'text/javascript',
    html: 'text/html',
    css: 'text/css',
}

const percent = (num, total) => {
    num = parseFloat(num);
    total = parseFloat(total);
    if (isNaN(num) || isNaN(total)) {
        return 0;
    }
    return total <= 0 ? 0 : (Math.round(num / total * 10000) / 100.00);
}

const errorHandler = callback => { try { return callback() } catch (e) { return e.toString() } }

const operate = {
    format: {
        json: value => errorHandler(() => JSON.stringify(JSON.parse(value), null, '  '))
    },
    simplify: {
        json: value => errorHandler(() => JSON.stringify(JSON.parse(value)))
    }
}

const format = (values, api) => {
    const { type, leftData } = values
    const data = leftData

    api.setValue('rightData', operate.format[type](data))
}

const simplify = (values, api) => {

    const { type, leftData } = values
    const data = leftData

    const rightData = operate.simplify[type](data);
    api.setValue('rightData', rightData)
    api.setValue('leftSize', data.length)
    api.setValue('rightSize', rightData.length)
    api.setValue('percent', percent(data.length - rightData.length, data.length))
}

const FormField = () => {

    const { Text } = Typography
    const { Slot, RadioGroup, Radio } = Form

    const api = useFormApi()
    const { values } = useFormState()

    return <>
        <RadioGroup field='type' span={24} label='编程语言：' type='button' buttonSize='middle'>
            <Radio value='json'>JSON</Radio>
            <Radio value='js'>JavaScript</Radio>
            <Radio value='html'>HTML</Radio>
            <Radio value='css'>CSS</Radio>
        </RadioGroup>
        <Row>
            <Col span={10}>
                <Slot label='源代码：'>
                    <CodeMirror
                        value={values.leftData}
                        options={{
                            mode: mime[values.type],
                            theme: 'material',
                            lineNumbers: true,
                        }}
                        onBeforeChange={(editor, data, value) => api.setValue('leftData', value)}
                    />
                </Slot>
            </Col>
            <Col span={3} align='center' style={{ paddingTop: '80px' }}>
                <Space vertical>
                    <Text>原始大小：{values.leftSize}</Text>
                    <Text>压缩大小：{values.rightSize}</Text>
                    <Progress type='circle' percent={values.percent} showInfo />
                    <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small'
                        onClick={() => format(values, api)}>格式化</Button>
                    <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small'
                        onClick={() => simplify(values, api)}>压缩</Button>
                </Space>
            </Col>
            <Col span={10}>
                <Slot label='格式化代码：'>
                    <CodeMirror
                        value={values.rightData}
                        options={{
                            mode: mime[values.type],
                            theme: 'material',
                            lineNumbers: true,
                            readOnly: true,
                        }}
                    />
                </Slot>
            </Col>
        </Row>
    </>
}

const CodeFormatter = () => {

    const initValues = { type: 'json' }

    return <Form initValues={initValues}><FormField /></Form>;
}

export default CodeFormatter