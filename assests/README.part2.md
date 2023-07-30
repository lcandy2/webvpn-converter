
没有你的学校？你可以使用自定义功能，或提交 pull request 或 issue，来适配你的学校。

相关文件：[适配学校列表 list.txt](https://github.com/lcandy2/webvpn-converter/blob/main/data/db/list.txt)。文件格式如下：

| 学校省份 | 学校名称 | 学校WebVPN网址 | KEY（可留空）              | IV（可留空）           |
|----|---------|--------------|------------------------|---------------------|
| 北京    | 清华大学     | webvpn.tsinghua.edu.cn | wrdvpnisthebest!    | wrdvpnisthebest!    |
| 上海    | 复旦大学     | webvpn.fudan.edu.cn    |                     |


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
