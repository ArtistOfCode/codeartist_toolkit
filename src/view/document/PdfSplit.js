import { IconUpload } from "@douyinfe/semi-icons";
import { Button, Form, Table, Toast } from "@douyinfe/semi-ui";

const merge = (api, values) => {
    const { fileSelect } = values;
    console.table(fileSelect)
    // TODO PDF合并和拆分前端还不知道怎么实现
    Toast.warning('网页版暂未实现，请下载本地软件')
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

const PdfSplit = () => {

    const { Upload, Label } = Form

    return (
        <Form initValues={{ file: [] }} render={({ formApi, values }) => (
            <>
                <Upload field='file' noLabel action='false' accept='.pdf' limit={1} uploadTrigger='custom'>
                    <Button icon={<IconUpload />} theme="light">上传文件</Button>
                </Upload>
                <Label>文件信息：</Label>
                <Table rowKey='uid' columns={columns} dataSource={values.file} rowSelection={rowSelection(formApi, values)} />
                <Button onClick={() => merge(formApi, values)}>拆分PDF</Button>
                <Button style={{ marginLeft: '20px' }} onClick={() => window.open("https://github.com/torakiki/pdfsam/releases")}>下载本地软件</Button>
            </>
        )} />
    )
}

export default PdfSplit