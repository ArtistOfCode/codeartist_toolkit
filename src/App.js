import { Layout } from '@douyinfe/semi-ui';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import HeaderMenu from './components/HeaderMenu';
import SideMenu from './components/SideMenu';
import routes from './routes/router';

const { Header, Sider, Content, Footer } = Layout;

const App = () => {

  const [menu, setMenu] = React.useState([]);

  return <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}><HeaderMenu setMenu={setMenu} /></Header>
    <Layout>
      <Router>
        <Sider style={{ position: 'fixed', paddingTop: 60, height: '100%' }}><SideMenu menu={menu} /></Sider>
        <Content style={{ marginTop: 60, marginBottom: 60, marginLeft: 220, padding: '24px', }}>
          <div style={{ padding: 10, minHeight: 300, borderRadius: '10px', border: '1px solid var(--semi-color-border)', }}>
            <Routes>
              {routes.map((route, index) => (<Route key={index} path={route.path} exact element={route.main} />))}
            </Routes>
          </div>
        </Content>
      </Router>
      <Footer style={{
        position: 'fixed', bottom: 0, width: '100%', padding: '20px', marginLeft: 220, textAlign: 'center',
        color: 'var(--semi-color-text-2)', backgroundColor: 'rgba(var(--semi-grey-2), 1)',
      }}>
        <span>Copyright © 2021 CodeArtist 码匠</span>
      </Footer>
    </Layout>
  </Layout>;
}

export default App;