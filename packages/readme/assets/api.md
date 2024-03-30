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
- `host` : [required] [only in encrypt] The URL prefix of the generated Web VPN URL.
- `key` : [optional] The key used for encryption, defaults to `wrdvpnisthebest!`.
- `iv` : [optional] The initialization vector used for encryption, defaults to `wrdvpnisthebest!`.

**Success Response** :

```json
{
  "status": {
    "code": 200
  },
  "url": "encrypted URL or decrypted URL",
  "requestData": {
    "url": "requested URL",
    "host": "URL prefix of the encrypted Web VPN URL",
    "key": "key used for decryption, wrdvpnisthebest! for default",
    "iv": "initialization vector used for decryption, wrdvpnisthebest! for default"
  }
}
```

Note: When using this API, ensure that the encryption and decryption key and initialization vector are used correctly. If the key or initialization vector is incorrect, the URL may not be encrypted or decrypted successfully.
