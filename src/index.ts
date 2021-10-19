// 引入css样式
import 'antd/dist/antd.css';
import './index.less';

//引入fetch
import 'whatwg-fetch'


import dva from 'dva';


// const models = require.context('./models',false,/(\.js|\.jsx|\.ts|\.tsx)$/)

// 1. Initialize
const app = dva({
   //history: browserHistory
  history: require("history").createBrowserHistory(),
});

// 2. Plugins
// app.use({});



// 3. Model move to router
// models.keys().forEach(key=>{ 
//   app.model(models(key).default)
// })

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#main');


import 'dva'

declare module 'dva' {
  interface DvaInstance {
    _store: any
  }
}

export default app._store;
