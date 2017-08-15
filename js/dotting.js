var isTestEnv = true;
var allScripts = document.getElementsByTagName('script');

// 根据页面包含统计脚本来判断是否是测试环境
for (var i = 0; i < allScripts.length; i++) {
  if (allScripts[i].src.indexOf('analytics') > -1) {
    isTestEnv = false;
    break;
  }
}

if (isTestEnv) {
  var script = document.createElement('script');
  script.src = '//haitao.nos.netease.com/2f5267e0-b803-4478-ba29-fe13120cac59.js';
  allScripts[0].parentNode.insertBefore(script, allScripts[0]);
}