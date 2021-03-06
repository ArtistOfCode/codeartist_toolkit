import { IconGridSquare } from '@douyinfe/semi-icons';
import { Button, Col, Form, Layout, Modal, Row, Table, Toast, Tree, useFormApi } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { Controlled as CodeMirror } from 'react-codemirror2';
import mysql from "../../api/mysql";
import ClientHistory from '../../components/ClientHistory';
import ToolTitle from '../../components/ToolTitle';
require('codemirror/mode/sql/sql');

const { Header, Sider, Content } = Layout
const { Select, Input, InputNumber } = Form

const FormField = ({ setTable }) => {

    const initValues = { "port": 3306, }

    const formApi = useFormApi()
    const [conn, setConn] = useState(false)
    const [db, setDb] = useState([])
    const [visible, setVisible] = useState(false)
    const [dbFormApi, setDbFormApi] = useState({})

    useEffect(() => {
        if (!conn) {
            setDb([]);
        }
    }, [conn])

    const selDb = (val) => {
        mysql.query(`use ${val}`)
            .then(() => mysql.query('show tables'))
            .then(result => {
                const key = `Tables_in_${val}`
                setTable(result.data.map((e, i) => {
                    return {
                        icon: (<IconGridSquare style={{ color: 'var(--semi-color-text-2)' }} />),
                        label: e[key],
                        value: e[key],
                        key: `${i}`
                    }
                }))
            })
    }

    const connection = () => {

        const { values } = dbFormApi.getFormState();

        mysql.connection(values)
            .then(_d => {
                setConn(true)
                setVisible(false)
                return mysql.query('show databases')
            })
            .then(result => {
                if (values.database) {
                    formApi.setValue('database', values.database)
                    selDb(values.database, setTable)
                }
                setDb(result.data.map(e => e.Database))
                Toast.success('?????????????????????')
            })
            .catch(error => Toast.error(error));
    }

    const end = () => {
        mysql.end().then(() => {
            setConn(false);
            setTable([])
            formApi.setValue('database', null)
            Toast.success('?????????????????????')
        })
    }

    return <>
        <Select field="database" label='?????????' labelPosition="left" style={{ width: 150 }} onChange={selDb}>
            {db.map((d, i) => (<Select.Option key={i} value={d}>{d}</Select.Option>))}
        </Select>
        <Button theme='solid' type={conn ? 'primary' : 'danger'} onClick={() => conn ? end(setConn, setTable, formApi) : setVisible(true)}>
            {conn ? '??????????????????' : '??????????????????'}
        </Button>

        <Modal
            title="?????????????????????"
            visible={visible}
            onOk={() => connection(setConn, setVisible, setDb, setTable, formApi, dbFormApi)}
            onCancel={() => setVisible(false)}
        >
            <Form getFormApi={setDbFormApi} labelPosition="left" labelAlign="right" labelWidth={100} initValues={initValues}>
                <Input field="host" label="???????????????" style={{ width: 280 }} />
                <InputNumber field='port' label='??????' style={{ width: 280 }} />
                <Input field="user" label="?????????" style={{ width: 280 }} />
                <Input field="password" mode="password" label="??????" style={{ width: 280 }} />
                <Input field="database" label="?????????" style={{ width: 280 }} />
            </Form>
        </Modal>
    </>
}

const MySQL = () => {

    const [table, setTable] = useState([])
    const [sql, setSql] = useState('SELECT 1')
    const [history, setHistory] = useState([])
    const [columns, setColumns] = useState([])
    const [result, setResult] = useState({ fields: [], data: [] })

    useEffect(() => {
        setColumns(result.fields.map((v) => {
            return {
                title: v.name,
                dataIndex: v.name,
            }
        }))
    }, [result])

    const query = () => {
        mysql.query(sql)
            .then(result => {
                setResult(result);
                setHistory([{ command: sql }, ...history.filter(h => h.command !== sql)])
            })
            .catch(() => setResult({ fields: [], data: [] }))
    }

    return <>
        <ToolTitle text='MySQL?????????' pro />
        <Layout>
            <Header>
                <Form layout='horizontal'><FormField setTable={setTable} /></Form>
            </Header>
            <Layout style={{ marginTop: 10 }}>
                <Sider>
                    <Tree treeData={table} filterTreeNode showFilteredOnly style={{ width: 260, height: 650, border: '1px solid var(--semi-color-border)' }} />
                </Sider>
                <Content>
                    <Row style={{ height: 350 }}>
                        <Col span={14}>
                            <CodeMirror value={sql} options={{ mode: 'text/x-mysql', theme: 'material', lineNumbers: true }}
                                onBeforeChange={(_e, _d, value) => { setSql(value) }} />
                            <Button theme='solid' style={{ margin: 10 }} onClick={() => query(sql, setResult, history, setHistory)}>??????</Button>
                        </Col>
                        <Col span={9} style={{ marginLeft: 20 }}>
                            <ClientHistory items={history} recover={setSql} />
                        </Col>
                    </Row>
                    <Row style={{ marginLeft: 10, minHeight: 298, border: '1px solid var(--semi-color-border)' }}>
                        <Table columns={columns} dataSource={result.data} pagination={false} scroll={{ x: 'max-content' }} />
                    </Row>
                </Content>
            </Layout>
        </Layout>
    </>
}

export default MySQL;