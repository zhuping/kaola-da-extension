### 需求背景

目前考拉的埋点方式有两种，一种是通过url后面拼接参数，还有一种是通过 `_.daEvent()` 的方式去手动触发。第一种可以直接通过查看链接有没有带上我们的参数判断埋点有没有成功，第二种只能通过查看 `Network` 里面有没有发送 `https://rev.da.netease.com/__dam.gif` 开头的链接来判断是否埋点成功，而且里面每个字段都被 `encodeURI` 过，很难一眼看出来。

### 功能介绍

假设我们这里打点的请求地址都是 `rev.da.netease.com/__dam.gif` 开头的，该扩展可以拦截所有 `*://rev.da.netease.com/__dam.gif?*` 开头的请求，分析url参数，把 `category`、`action`、`label`等参数 `decodeURIComponent` 后统一显示出来，方便开发者校验埋点是否成功。

### 如何使用

* 在chrome中打开 `chrome://extensions/`，把 `.crx` 扩展文件直接托进去。
* 打开要检查的页面，点击扩展插件图标，正常浏览点击你的页面。只要有埋点的请求，都会显示在插件的小窗口中。