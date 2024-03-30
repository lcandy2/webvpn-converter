没有你的学校？你可以使用自定义功能，或提交 pull request 或 issue，来适配你的学校。

相关文件：[递交适配学校 \_submit_your_data_here.ts](https://github.com/lcandy2/webvpn-converter/blob/main/data/_submit_your_data_here.ts)。文件格式如下：

```typescript
const data: School = {
  province: '上海', // ← 请将学校所在地区填写在此处
  name: '上海交通大学', // ← 请将学校名称填写在此处
  host: 'webvpn.sjtu.edu.cn', // ← 请将 WebVPN 服务网址填写在此处
  crypto_key: '', // ← 请将 key 填写在此处
  crypto_iv: '', // ← 请将 iv 填写在此处
};
```
