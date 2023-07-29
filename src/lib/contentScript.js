// https://webvpn.hebau.edu.cn/login
var utf8 = aesjs.utils.utf8;
var hex = aesjs.utils.hex
var AesCfb = aesjs.ModeOfOperation.cfb
var textRightAppend = function (text, mode) {
    var segmentByteSize = mode === 'utf8' ? 16 : 32

    if (text.length % segmentByteSize === 0) {
        return text
    }

    var appendLength = segmentByteSize - text.length % segmentByteSize
    var i = 0
    while (i++ < appendLength) {
        text += '0'
    }
    return text
}

var encrypt = function (text, key, iv) {
    var textLength = text.length
    text = textRightAppend(text, 'utf8')
    var keyBytes = utf8.toBytes(key)
    var ivBytes = utf8.toBytes(iv)
    var textBytes = utf8.toBytes(text)
    var aesCfb = new AesCfb(keyBytes, ivBytes, 16)
    var encryptBytes = aesCfb.encrypt(textBytes)
    return hex.fromBytes(ivBytes) + hex.fromBytes(encryptBytes).slice(0, textLength * 2)
}
