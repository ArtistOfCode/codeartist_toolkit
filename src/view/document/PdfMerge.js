import { IconClear, IconDelete, IconUpload, IconWrench } from "@douyinfe/semi-icons";
import { Button, Form, InputNumber, Row, Space, Table, Toast, Typography } from "@douyinfe/semi-ui";
import { useState } from "react";
import pdf from "../../api/pdf";
import tmp from "../../api/tmp";
import ToolTitle from "../../components/ToolTitle";

const { Label } = Form
const { Column } = Table
const { Text } = Typography

const pickerOpts = {
    types: [
        { description: '只能上传PDF文件', accept: { 'application/pdf': ['.pdf'] } },
    ],
    excludeAcceptAllOption: true,
    multiple: false
};

const PdfMerge = () => {

    const [files, setFiles] = useState([]);
    const [result, setResult] = useState(null);

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

    const remove = (id) => {
        setFiles(files.filter(f => f.id !== id))
        tmp.delete([id])
    }

    const merge = () => {
        if (!files || files.length < 1) {
            Toast.warning('文件不能为空')
            return;
        }
        const pdfs = files.map(f => {
            return {
                page: `${f.start}-${f.end}`,
                name: f.id
            }
        })
        pdf.merge({ pdfs })
            .then(data => setResult({ file: data.pdf, url: tmp.get(data.pdf) }));
    }

    const clear = () => {
        setFiles([])
        let rmFiles = files.map(f => f.id)
        if (result) {
            rmFiles = [...rmFiles, result.file]
            setResult(null)
        }
        tmp.delete(rmFiles)
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
            <ToolTitle text='PDF合并' pro />
            <Row>
                <Label>文件列表：</Label>
                <Table rowKey='id' dataSource={files} pagination={false} bordered size="small">
                    <Column title='序号' dataIndex="key" align="center" render={(_t, _r, i) => i + 1} />
                    <Column title='文件名称' dataIndex="name" align="center"
                        render={(text, record) => <a target='_blank' rel='noopener noreferrer' href={record.url}>{text}</a>} />
                    <Column title='文件大小' dataIndex="size" align="center" />
                    <Column title='页码' dataIndex="page" align="center" render={(_t, record) => <Num record={record} />} />
                    <Column title='操作' dataIndex="operate" align="center"
                        render={(_t, record) => <Button icon={<IconDelete />} theme='borderless' onClick={() => remove(record.id)} />} />
                </Table>
            </Row>
            <Space spacing="medium" style={{ marginTop: 15 }}>
                <Button icon={<IconUpload />} onClick={upload}>上传</Button>
                <Button icon={<IconWrench />} onClick={merge}>合并</Button>
                <Button icon={<IconClear />} onClick={clear}>清空</Button>
                {result && <Text link={{ href: result.url }}>下载结果：{result.file}</Text>}
            </Space>
        </>
    )
}

export default PdfMerge