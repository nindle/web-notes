//  安装插件  npm install dsbridge

// 引入插件
import dsBridge from 'dsbridge';

//定义事件名称以及版本号
const messageName = {
  login: ['1.0.0'],
  miniprogram: ['1.0.0'],
  //stock: ['1.0.0'],
  router: ['1.0.0'],
  titleBar: ['1.0.0'],
  openWebView: ['1.0.0'],
  tel: ['1.0.0'],
  version: ['1.1.0'],
  newsDetailSkip: ['1.1.0'],
  share: ['2.4.0'],
};

//事件方法
const postMessage2App = function (name, params = {}) {
  //非APP环境使用openWebView直接打开新页面
  if (!device.isApp && name === 'openWebView') {
    window.open(params.url);
    return;
  }
  if (!messageName[name]) {
    console.error('postMessage2App', name, '未找到对应事件');
    return;
  }
  if (!checkVersion(...messageName[name])) {
    console.warn('postMessage2App', name, '不支持该事件');
    return;
  }
  console.log('postMessage2App', name, params);
  if (!device.isApp) {
    return;
  }
  if (name === 'router') {
    params.url = 'topcj://supermoneytree/' + params.url;
  }

  //如果打开的链接是跳转小程序的直接重定向至小程序方法
  if (name === 'openWebView' && params.url.indexOf('weixin://dl/business/?t=8QIy62nSSgo') > -1) {
    name = 'miniprogram';
    params = {
      pageTitle: 'news-detail',
      buttonTitle: '文章内部跳转',
    };
  }

  return new Promise(function (resolve) {
    dsBridge.call(name, params, data => {
      resolve(data);
    });
  });
};

//调用
postMessage2App('tel', { phone: e });
