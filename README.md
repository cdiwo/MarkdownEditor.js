# MarkdownEditor.js

## 使用方法

##### 引入 MarkdownEditor 文件

CommonJS 方式引用
```js
var ME = require('mdeditor');
```

AMD 方式引用
```js
define(['mdeditor'], function(ME) {
    // ...
});
```

全局方式，在HTML页面中引入:
```html
<script src="mdeditor.min.js"></script>
```


### HTML代码
查看 index.html 文件示例代码

另外，在 `Yii2` 中使用widget方式，可以查看 `MarkdownEditor.php` 文件


### Javascript代码

Example：
```js
ME.getEditor('.dw-markdown');
```


## 参数
### 
<table>
<thead>

<tr>
  <th>参数</th>
  <th>类型</th>
  <th>默认值</th>
  <th>说明</th>
</tr>
</thead>
<tbody>
<tr><th colspan="4">构造参数</th></tr>
<tr>
  <td>container</td>
  <td>string</td>
  <td></td>
  <td>容器id 或 class</td>
</tr>
<tr>
  <td>params</td>
  <td>object</td>
  <td>{}</td>
  <td>预留参数</td>
</tr>
</tbody></table>

### 更新日志
### 0.3.2 - 2016/10/10
1. 调整 全屏显示触发时机

### 0.3.1 - 2016/08/25
1. 添加 `esc` 快捷键退出全屏
2. 修复 点击菜单按钮后光标未置尾的问题

### 0.3.0 - 2016/08/24
1. 提交 带工具栏的markdown编辑器

