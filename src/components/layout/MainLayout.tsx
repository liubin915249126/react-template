import * as React from "react";
import { useState } from "react";
import { Layout, Menu, Icon, Breadcrumb } from "antd";
import "./mainLayout.less";
import { Link, Route, Redirect } from "react-router-dom";
import {withRouter} from "react-router";
import routerConfig, { componentLink } from "@/config/routerConfig";
const {SubMenu} = Menu
const { Header, Sider, Content } = Layout;


const menuList = routerConfig.flatten(Infinity)

const MainLayout = ({location}) => {
 const [collapsed, setCollapsed] = useState(false)
 const [openKeys, setOpenKeys] = useState([])
 const { pathname } = location

 const getSelectedKeys=()=> {
    const keys = pathname.split("/").slice(1);
    return keys;
  }
  const renderMenu = (menusData, parentPath)=> {
    return menusData.filter(item => !item.hide).map((item, index) => {
      const { icon = "user", url, name } = item;
      const itemPath = `${parentPath}/${url || ""}`.replace(/\/+/g, "/");
      if (Array.isArray(item.children) && item.children.length > 0) {
        return (
          <SubMenu
            title={
              <span>
                <Icon type={icon} />
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
            <Icon type={icon} />
            {collapsed ? null : <Link to={`${itemPath}`}>{name}</Link>}
          </Menu.Item>
        );
      }
    });
  }
  const renderBread = (routerConfig, parentPath) => {
    const pathArr = pathname.split("/").filter(item => item)
    if (Array.isArray(routerConfig) && routerConfig.length > 0) {
      return pathArr.map((item, index) => {
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
  const renderComponents=(menusData, parentPath)=>{
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
          selectedKeys={getSelectedKeys}
          openKeys={collapsed ? [] : openKeys}
          onOpenChange={setOpenKeys}
        >
          {renderMenu(routerConfig, "")}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Icon
            className="trigger"
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={()=>setCollapsed(!collapsed)}
          />
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