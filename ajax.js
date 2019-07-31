var formatData = require('formatData');
module.exports = function ajax(opt) {
  // 格式化参数
  var json = opt || {};
  var url = json.url;
  if (!url) {
    return;
  }
  var type = json.type || 'get';
  var data = json.data || {};
  var async = json.async || true;
  // 创建xhr
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  switch (type.toUpcase()) {
    case 'POST':
      xhr.open(type, url, async);
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.send(formatData(data));
      break;
    case 'GET':
      xhr.open(type, url, async);
      xhr.send(null);
      break;
  }
  // 接受后台返回值
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        opt.success && opt.success(xhr.responseText);
      } else {
        opt.error && opt.error();
      }
    }
  }

}