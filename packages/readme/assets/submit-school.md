没有你的学校？你可以使用自定义功能，或提交 pull request 或 issue，来适配你的学校。

相关文件：[/data/webvpn.json](https://github.com/lcandy2/webvpn-converter/blob/main/data/webvpn.json)。文件格式如下：

```json
{
  "上海【请将学校所在地区填写在此处】": {
    "上海交通大学【请将学校名称填写在此处】": {
      "host": "webvpn.sjtu.edu.cn【请将 WebVPN 服务网址填写在此处】",
      "crypto_key": "【请将 key 填写在此处】",
      "crypto_iv": "【请将 iv 填写在此处】"
    }
  }
}
```

- 请查找已有省级分类，并在其中添加你的学校。如果没有，请新建一个省级分类，并在其中添加你的学校。
- 请不要重复添加已有的学校。
- 若学校存在多个 WebVPN 服务网址，请添加多个条目，请使用括号区分，以保证JSON格式正确性。
