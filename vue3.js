// 批量导入文件
const certificatesArray = Object.keys(import.meta.globEager(`/src/assets/images/certificate/*.*`));


// KeepAlive路由缓存;
    // {
    //   path: '/vip',
    //   name: 'vip',
    //   meta: {
    //     title: 'VIP服务',
    //     keepAlive: true, //设置页面是否需要使用缓存
    //   },
    //   component: () => import('../views/vip/index.vue'),
    // }