import { IconGridSquare } from '@douyinfe/semi-icons';
import { Button, Col, Form, Layout, Modal, Row, Table, Toast, Tree, useFormApi } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { Controlled as CodeMirror } from 'react-codemirror2';
import mysql from "../../api/mysql";
import ClientHistory from '../../components/ClientHistory';
import ToolTitle from '../../components/ToolTitle';

require('codemirror/mode/sql/sql');

const connection = (setConnect, setVisible, setDatabase, setTable, formApi, databaseFormApi) => {

    const { values } = databaseFormApi.getFormState();

    mysql.connection(values)
        .then(data => {
            setConnect(true)
            setVisible(false)
            return mysql.query('show databases')
        })
        .then(result => {
            if (values.database) {
                formApi.setValue('database', values.database)
                selectDatabse(values.database, setTable)
            }
            setDatabase(result.data.map(e => e.Database))
            Toast.success('数据库连接成功')
        })
        .catch(error => Toast.error(error));
}

const end = (setConnect, setTable, formApi) => {
    mysql.end().then(() => {
        setConnect(false);
        setTable([])
        formApi.setValue('database', null)
        Toast.success('数据库断开成功')
    })
}

const selectDatabse = (value, setTable) => {

    mysql.query(`use ${value}`)
        .then(() => { return mysql.query('show tables') })
        .then(result => {
            const key = `Tables_in_${value}`
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

const query = (sql, setResult, history, setHistory) => {
    mysql.query(sql)
        .then(result => {
            setResult(result);
            setHistory([{ command: sql }, ...history.filter(h => h.command !== sql)])
        })
        .catch(() => setResult({ fields: [], data: [] }))
}

const FormField = ({ setTable }) => {

    const initValues = {
        "host": "idatafun.com",
        "port": 3307,
        "user": "idatafun-test",
        "password": "26bfeb7bba504e28ac8c8c791ed5f99a",
        "database": "idatafun"
    }

    const [connect, setConnect] = useState(false)
    const [visible, setVisible] = useState(false)
    const [database, setDatabase] = useState([])
    const [databaseFormApi, setDatabaseFormApi] = useState({})
    const formApi = useFormApi()

    useEffect(() => {
        if (!connect) {
            setDatabase([]);
        }
    }, [connect])

    return <>
        <Form.Select field="database" label='数据库' labelPosition="left" style={{ width: 150 }}
            onChange={v => selectDatabse(v, setTable)}
        >
            {database.map((database, index) => (<Form.Select.Option key={index} value={database}>{database}</Form.Select.Option>))}
        </Form.Select>
        <Button theme='solid' type={connect ? 'primary' : 'danger'}
            onClick={() => connect ? end(setConnect, setTable, formApi) : setVisible(true)}>
            {connect ? '数据库已连接' : '数据库未连接'}
        </Button>

        <Modal
            title="创建数据库连接"
            visible={visible}
            onOk={() => connection(setConnect, setVisible, setDatabase, setTable, formApi, databaseFormApi)}
            onCancel={() => setVisible(false)}
        >
            <Form getFormApi={setDatabaseFormApi} labelPosition="left" labelAlign="right" labelWidth={100} initValues={initValues}>
                <Form.Input field="host" label="服务器地址" style={{ width: 280 }} />
                <Form.InputNumber field='port' label='端口' style={{ width: 280 }} />
                <Form.Input field="user" label="用户名" style={{ width: 280 }} />
                <Form.Input field="password" mode="password" label="密码" style={{ width: 280 }} />
                <Form.Input field="database" label="数据库" style={{ width: 280 }} />
            </Form>
        </Modal>
    </>
}

const MySQL = () => {

    const { Header, Sider, Content } = Layout

    const [table, setTable] = useState([])
    const [history, setHistory] = useState([])
    const [sql, setSql] = useState('SELECT 1')
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

    return <>
        <ToolTitle text='MySQL客户端' pro />
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
                            <Button theme='solid' style={{ margin: 10 }} onClick={() => query(sql, setResult, history, setHistory)}>查询</Button>
                        </Col>
                        <Col span={9} style={{ marginLeft: 20 }}>
                            <ClientHistory items={history} recover={setSql} />
                        </Col>
                    </Row>
                    <Row style={{ marginLeft: 10, minHeight: 298, border: '1px solid var(--semi-color-border)' }}>
                        <Table columns={columns} dataSource={result.data} pagination={false} />
                    </Row>
                </Content>
            </Layout>
        </Layout>
    </>
}

export default MySQL;