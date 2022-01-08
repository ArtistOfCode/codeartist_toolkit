import { IconDelete, IconUpload } from "@douyinfe/semi-icons";
import { Button, Form, InputNumber, Row, Space, Table } from "@douyinfe/semi-ui";
import { useState } from "react";

const { Label } = Form
const { Column } = Table

const pickerOpts = {
    types: [
        { description: '只能上传PDF文件', accept: { 'application/pdf': ['.pdf'] } },
    ],
    excludeAcceptAllOption: true,
    multiple: false
};

const Num = () => <InputNumber innerButtons min={1} style={{ width: 50 }} />

const PdfMerge = () => {

    const [files, setFiles] = useState([]);

    const upload = () => {
        window.showOpenFilePicker(pickerOpts)
            .then(([fileHandle]) => fileHandle.getFile())
            .then(file => {
                const f = {
                    name: file.name,
                    size: `${Math.round(file.size / 1024)}Kb`,
                    url: URL.createObjectURL(file),
                }
                setFiles([...files, f]);
            })
    }

    const merge = () => {
    }

    const clear = () => {
    }

    return (
        <>
            <Row>
                <Label>文件列表：</Label>
                <Table rowKey='uid' dataSource={files} pagination={false} bordered size="small">
                    <Column title='序号' dataIndex="key" align="center"
                        render={(text, record, i) => i + 1} />
                    <Column title='文件名称' dataIndex="name" align="center"
                        render={(text, recode) => <a target='_blank' rel='noopener noreferrer' href={recode.url}>{text}</a>} />
                    <Column title='文件大小' dataIndex="size" align="center" />
                    <Column title='页码' dataIndex="page" align="center"
                        render={() => <><Num /> - <Num /></>} />
                    <Column title='操作' dataIndex="operate" align="center"
                        render={() => <Button icon={<IconDelete />} theme='borderless' onClick={() => { }} />} />
                </Table>
            </Row>
            <Space spacing="medium" style={{ marginTop: 15 }}>
                <Button icon={<IconUpload />} theme="light" onClick={() => upload(files, setFiles)}>上传</Button>
                <Button onClick={() => merge()}>合并</Button>
                <Button onClick={() => clear()}>清空</Button>
            </Space>
        </>
    )
}

export default PdfMerge