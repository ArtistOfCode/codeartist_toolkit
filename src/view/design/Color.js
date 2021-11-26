import { Col, Form, Row, useFormApi, useFormState } from "@douyinfe/semi-ui";
import React from "react";
import { HexColorPicker, RgbColorPicker } from "react-colorful";

const ColorView = ({ color }) => (
    <div style={{ backgroundColor: color, borderRadius: '5px', height: '40px', width: '200px' }} />
)

const hexHandler = (hex, api) => {
    api.setValue('hex', hex)
    if (hex.length !== 4 && hex.length !== 7) {
        return;
    }
    if (hex.length === 4) {
        hex = hex.replace(/([\d,a-f,A-F])/g, '$1$1')
    }
    const r = parseInt("0x" + hex.slice(1, 3));
    const g = parseInt("0x" + hex.slice(3, 5));
    const b = parseInt("0x" + hex.slice(5, 7));
    api.setValue('r', r)
    api.setValue('g', g)
    api.setValue('b', b)
    api.setValue('rgb', `rgb(${r}, ${g}, ${b})`)
}

const rgbHandler = (rgb, api) => {
    const { r, g, b } = rgb
    api.setValue('r', r)
    api.setValue('g', g)
    api.setValue('b', b)
    api.setValue('rgb', `rgb(${r}, ${g}, ${b})`)
    api.setValue('hex', "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1))
}

const FormField = () => {

    const { RadioGroup, InputNumber, Input, Radio, Slot, Label } = Form;

    const formApi = useFormApi()
    const { values } = useFormState()

    return (
        <>
            <Row>
                <RadioGroup field='type' span={24} label='编码方式：' type='button' buttonSize='middle'>
                    <Radio value='hex'>HEX</Radio>
                    <Radio value='rgb'>RGB</Radio>
                </RadioGroup>
            </Row>
            <Row>
                <Col span={6}>
                    <Slot label='颜色选择：'>
                        {values.type === 'hex' &&
                            <HexColorPicker color={values.hex} onChange={v => hexHandler(v, formApi)} />}
                        {values.type === 'rgb' &&
                            <RgbColorPicker color={{ r: values.r, g: values.g, b: values.b }} onChange={v => rgbHandler(v, formApi)} />}
                    </Slot>
                    <ColorView color={values.type === 'hex' ? values.hex : values.rgb} />
                </Col>
                <Col span={6}>
                    <Label style={{ paddingTop: '12px' }}>颜色配置：</Label>
                    {values.type === 'hex' &&
                        <Input field='hex' label='HEX' labelPosition='inset' style={{ width: '200px' }}
                            onChange={v => hexHandler(v, formApi)} />}
                    {values.type === 'rgb' && <>
                        <InputNumber field='r' label='R' labelPosition='inset' min={0} max={255}
                            onChange={v => rgbHandler({ r: v, g: values.g, b: values.b }, formApi)} />
                        <InputNumber field='g' label='G' labelPosition='inset' min={0} max={255}
                            onChange={v => rgbHandler({ r: values.r, g: v, b: values.b }, formApi)} />
                        <InputNumber field='b' label='B' labelPosition='inset' min={0} max={255}
                            onChange={v => rgbHandler({ r: values.r, g: values.g, b: v }, formApi)} />
                        <Input field='rgb' label='RGB' labelPosition='inset' style={{ width: '250px' }} />
                    </>}
                </Col>
            </Row>
        </>
    );
}

const Color = () => {

    const initValues = {
        type: 'hex',
        hex: '#f00',
        r: 255, g: 0, b: 0,
        rgb: 'rgb(255, 0, 0)'
    };

    return <Form initValues={initValues}><FormField /></Form>
}

export default Color