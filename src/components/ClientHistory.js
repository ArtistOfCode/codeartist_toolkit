import { IconHistory } from "@douyinfe/semi-icons";
import { Button, List, Typography } from "@douyinfe/semi-ui";

const { Text } = Typography;

const ClientHistory = ({ items, recover }) => {

    return <div style={{ height: 300, overflowY: 'auto' }}>
        <List bordered size='small' header='历史记录'>
            {items && items.map((i, ii) => <List.Item key={ii}
                main={<Text code ellipsis={{ showTooltip: { opts: { content: i.command } } }} style={{ width: 300 }}>{i.command}</Text>}
                extra={<Button theme='borderless' size='small' icon={<IconHistory />} onClick={() => recover(i.command)} />}
            />)}
        </List>
    </div>
}

export default ClientHistory;