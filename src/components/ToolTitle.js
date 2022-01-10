import { IconServer } from "@douyinfe/semi-icons";
import { Typography } from "@douyinfe/semi-ui";

const { Title } = Typography

const ToolTitle = ({ text, pro }) => {
    return <Title heading={3} style={{ margin: '10px 0' }}>{text}
        {pro && <IconServer size="extra-large" style={{ color: 'var(--semi-color-primary)', margin: '0 10px' }} />}
    </Title>
}

export default ToolTitle;