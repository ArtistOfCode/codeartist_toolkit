import { IconDelete, IconUpload } from "@douyinfe/semi-icons";
import { Button, Form, InputNumber, Row, Space, Table } from "@douyinfe/semi-ui";
import { useState } from "react";
import pdf from "../../api/pdf";

const { Label } = Form
const { Column } = Table

const pickerOpts = {
    types: [
        { description: '只能上传PDF文件', accept: { 'application/pdf': ['.pdf'] } },
    ],
    excludeAcceptAllOption: true,
    multiple: false
};


const PdfMerge = () => {

    const [files, setFiles] = useState([]);

    const upload = () => {
        window.showOpenFilePicker(pickerOpts)
            .then(([fileHandle]) => fileHandle.getFile())
            .then(file => {
                pdf.upload(file).then(data => {
                    const f = {
                        id: data.filename,
                        name: file.name,
                        size: `${Math.round(file.size / 1024)}Kb`,
                        url: URL.createObjectURL(file),
                        start: 1,
                        end: parseInt(data.pdf.NumberOfPages),
                        max: parseInt(data.pdf.NumberOfPages),
                    }
                    setFiles([...files, f]);
                })
            })
    }

    const merge = () => {
    }

    const clear = () => {
    }

    const Num = ({ record }) => {

        const [start, setStart] = useState(record.start)
        const [end, setEnd] = useState(record.end)

        const page = (isStart, val) => {
            files.forEach((item, i) => {
                if (item.id === record.id) {
                    if (isStart) {
                        item.start = val;
                        setStart(val)
                    } else {
                        item.end = val;
                        setEnd(val)
                    }
                    files[i] = item;
                    return;
                }
            })
            setFiles(files)
        }

        return <>
            <InputNumber innerButtons
                min={1} max={record.end} value={start} style={{ width: 50 }}
                onChange={v => page(true, v)}
            /> - <InputNumber innerButtons
                min={record.start} max={record.max} value={end} style={{ width: 50 }}
                onChange={v => page(false, v)}
            />
        </>
    }

    return (
        <>
            <Row>
                <Label>文件列表：</Label>
                <Table rowKey='id' dataSource={files} pagination={false} bordered size="small">
                    <Column title='序号' dataIndex="key" align="center"
                        render={(_t, _r, i) => i + 1} />
                    <Column title='文件名称' dataIndex="name" align="center"
                        render={(text, record) => <a target='_blank' rel='noopener noreferrer' href={record.url}>{text}</a>} />
                    <Column title='文件大小' dataIndex="size" align="center" />
                    <Column title='页码' dataIndex="page" align="center"
                        render={(_t, record) => <Num record={record} />} />
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