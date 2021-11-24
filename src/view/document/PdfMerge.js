import { IconUpload } from "@douyinfe/semi-icons"
import { Button, Form, Table } from "@douyinfe/semi-ui"

const merge = (api, values) => {
    const { fileSelect } = values;
    console.table(fileSelect)

    const fd = new FileReader()
    fd.readAsDataURL(fileSelect[0].fileInstance)
    fd.onload = () => console.debug(fd.result)
}

const columns = [
    {
        title: '序号',
        dataIndex: 'key',
        render: (text, record, index) => index + 1,
    },
    {
        title: '文件名称',
        dataIndex: 'name',
        render: (text, recode, index) => <a target='_blank' rel='noopener noreferrer' href={recode.url}>{text}</a>
    },
    {
        title: '文件大小',
        dataIndex: 'size',
    },
]

const rowSelection = (api, values) => {
    return {
        onChange: (keys, rows) => api.setValue('fileSelect', rows)
    }
}

const PdfMerge = () => {

    const { Upload, Label } = Form

    return (
        <Form initValues={{ file: [] }} render={({ formApi, values }) => (
            <>
                <Upload field='file' noLabel multiple action='false' accept='.pdf' uploadTrigger='custom'>
                    <Button icon={<IconUpload />} theme="light">上传文件</Button>
                </Upload>
                <Label>文件信息：</Label>
                <Table rowKey='uid' columns={columns} dataSource={values.file} rowSelection={rowSelection(formApi, values)} />
                <Button onClick={() => merge(formApi, values)}>合并PDF</Button>
            </>
        )} />
    )
}

export default PdfMerge