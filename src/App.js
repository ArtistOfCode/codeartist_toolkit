import { Layout } from '@douyinfe/semi-ui';
import React from 'react';
import './App.css';
import HeaderMenu from './components/HeaderMenu';
import SideMenu from './components/SideMenu';

const { Header, Sider, Content, Footer } = Layout;

const App = () =>
  <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}><HeaderMenu /></Header>
    <Layout>
      <Sider style={{ position: 'fixed', paddingTop: 60, height: '100%' }}><SideMenu /></Sider>
      <Content
        style={{
          marginTop: 60,
          marginBottom: 60,
          marginLeft: 220,
          padding: '24px',
        }}
      >
        <div style={{
          padding: 10,
          minHeight: 300,
          borderRadius: '10px',
          border: '1px solid var(--semi-color-border)',
        }}>
          <p>Content</p>
        </div>
      </Content>
      <Footer
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          padding: '20px',
          marginLeft: 220,
          textAlign: 'center',
          color: 'var(--semi-color-text-2)',
          backgroundColor: 'rgba(var(--semi-grey-2), 1)',
        }}
      >
        <span>Copyright © 2021 CodeArtist 码匠</span>
      </Footer>
    </Layout>
  </Layout >

export default App;