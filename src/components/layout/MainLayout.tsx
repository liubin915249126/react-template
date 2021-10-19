import * as React from "react";
import { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import "./mainLayout.less";
import { Link, Route, Redirect } from "react-router-dom";
import {withRouter, RouteProps} from "react-router";
import routerConfig, { componentLink,RouterConfig } from "@/config/routerConfig";
const {SubMenu} = Menu
const { Header, Sider, Content } = Layout;


const menuList = routerConfig.flat(Infinity)

const MainLayout = ({location}: RouteProps) => {
 const [collapsed, setCollapsed] = useState(false)
 const [openKeys, setOpenKeys] = useState([])
 const { pathname } = location

 const getSelectedKeys = (): string[] => {
    const keys = pathname.split("/").slice(1);
    return keys;
  }
  const renderMenu = (menusData: RouterConfig[], parentPath: string)=> {  
    return menusData.filter((item: RouterConfig) => !item.hide).map((item: RouterConfig, index: number) => {
      const { icon = "user", url, name } = item;
      const itemPath = `${parentPath}/${url || ""}`.replace(/\/+/g, "/");
      if (Array.isArray(item.children) && item.children.length > 0) {
        return (
          <SubMenu
            title={
              <span>
                {/* <Icon type={icon} /> */}
                {name}
              </span>
            }
          >
            {renderMenu(item.children, itemPath)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={url || index}>
            {/* <Icon type={icon} /> */}
            {collapsed ? null : <Link to={`${itemPath}`}>{name}</Link>}
          </Menu.Item>
        );
      }
    });
  }
  const renderBread = (routerConfig: RouterConfig[], parentPath:string)=> {
    const pathArr = pathname.split("/").filter((item: string): boolean => Boolean(item))
    if (Array.isArray(routerConfig) && routerConfig.length > 0) {
      return pathArr.map((item: string, index: number) => {
        const currentIndex = routerConfig.findIndex(({ url }) => item == url)
        if (currentIndex > -1) {
          const { url, resourceNameCn } = routerConfig[currentIndex]
          let itemPath = '#';
          for (let i = 0; i < index + 1; i++) {
            itemPath += `/${pathArr[i]}`
          }
          return <Breadcrumb.Item href={itemPath}>{resourceNameCn}</Breadcrumb.Item>
        }
      })
    }
  }
  const renderComponents=(menusData: RouterConfig[], parentPath: string)=>{
    const components = menusData.map((item, index) => {
      const { url } = item;
      const itemPath = `${parentPath}/${url || ""}`.replace(/\/+/g, "/");
      const component = componentLink[url];
      if (Array.isArray(item.children) && item.children.length > 0) {
        return <div>{renderComponents(item.children, itemPath)}</div>;
      } else {
        return component ? (
          <Route
            exact={item.exact}
            key={itemPath}
            path={itemPath}
            component={component}
          />
        ) : null;
      }
    });
    return components;
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKeys()}
          openKeys={collapsed ? [] : openKeys}
          onOpenChange={setOpenKeys}
        >
          {renderMenu(routerConfig, "")}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <span
            className="icon-wrap"
            onClick={()=>setCollapsed(!collapsed)}
          >
            {
              collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
            }
          </span>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item href="/">首页</Breadcrumb.Item>
            {renderBread(menuList, "")}
          </Breadcrumb>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280,
          }}
        >
          {renderComponents(routerConfig, "")}
          {pathname == "/" ? (
            <Redirect exact strict from="/" to="/index" />
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(MainLayout)