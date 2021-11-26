import { IconArrowRight } from "@douyinfe/semi-icons";
import { Button, Col, Form, Row, Space, useFormApi, useFormState } from "@douyinfe/semi-ui";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { Controlled as CodeMirror } from 'react-codemirror2';

const mime = {
    json: 'application/json',
    js: 'text/javascript',
    css: 'css',
    html: 'text/html',
}

const operate = {
    format: {
        json: value => JSON.stringify(JSON.parse(value), null, '  ')
    },
    simplify: {
        json: value => JSON.stringify(JSON.parse(value))
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

    api.setValue('rightData', operate.simplify[type](data))
}

const FormField = () => {

    const { Slot, RadioGroup, Radio } = Form

    const api = useFormApi()
    const { values } = useFormState()

    return <>
        <RadioGroup field='type' span={24} label='编程语言：' type='button' buttonSize='middle'>
            <Radio value='json'>JSON</Radio>
            <Radio value='js'>JavaScript</Radio>
            <Radio value='css'>CSS</Radio>
            <Radio value='html'>HTML</Radio>
        </RadioGroup>
        <Row>
            <Col span={11}>
                <Slot label='源代码：'>
                    <CodeMirror
                        value={values.leftData}
                        options={{ mode: mime[values.type], theme: 'material', lineNumbers: true }}
                        onBeforeChange={(editor, data, value) => api.setValue('leftData', value)}
                    />
                </Slot>
            </Col>
            <Col span={2} align='center' style={{ paddingTop: '150px' }}>
                <Space vertical>
                    <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small'
                        onClick={() => format(values, api)}>格式化</Button>
                    <Button icon={<IconArrowRight size='small' />} theme='solid' type='primary' size='small'
                        onClick={() => simplify(values, api)}>压缩</Button>
                </Space>
            </Col>
            <Col span={11}>
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