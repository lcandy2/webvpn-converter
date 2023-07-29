# Web VPN <br>网址转换工具

轻松访问校内网络资源，无需繁琐设置，只需粘贴链接，常规网址即刻转化为您学校的Web VPN网址。

**立刻使用：[https://wrdvpn.vercel.app/](https://wrdvpn.vercel.app/)**

![alt text](./assests/main.png)

## 功能

- 轻松转换 URL
- 丰富的预设学校数据
- 可定制的加密密钥
- 为大学生量身定制的活力主题
- 兼容各种设备的响应式界面

## Development

```bash
git clone https://github.com/lcandy2/webvpn-converter.git
cd webvpn-converter
npm install
npm run dev
```

This will be running at `http://localhost:3000`.

## Api

This project's API consists of two parts: encryption (encrypt) and decryption (decrypt).

### Encrypt API

This API takes a raw URL and encrypts it into a Web VPN URL.

**URL** : `/api/encrypt`


### Decrypt API

This API takes a Web VPN URL and decrypts it back into a raw URL.

**URL** : `/api/decrypt`

### API Parameters

**Method** : `GET`

- `url` : [required] The raw URL to be encrypted or decrypted.
- `prehost` : [required] [only in encrypt] The URL prefix of the generated Web VPN URL.
- `key` : [optional] The key used for encryption, defaults to `wrdvpnisthebest!`.
- `iv` : [optional] The initialization vector used for encryption, defaults to `wrdvpnisthebest!`.

**Success Response** : 

```json
{
  "originalUrl": "school Web VPN URL",
  "url": "encrypted URL or decrypted URL",
  "key": "key used for decryption",
  "iv": "initialization vector used for decryption"
}
```

Note: When using this API, ensure that the encryption and decryption key and initialization vector are used correctly. If the key or initialization vector is incorrect, the URL may not be encrypted or decrypted successfully.

## 贡献

欢迎所有的贡献。

## Built With and Thanks

- [bit-webvpn-converter](https://github.com/spencerwooo/bit-webvpn-converter)
- [Next.js](https://nextjs.org/)
- [Material-UI](https://mui.com/)
- [Icons8](https://icons8.com/)

## License

This project is licensed under the MPL-2.0 License - see the [LICENSE.md](LICENSE.md) file for details.
