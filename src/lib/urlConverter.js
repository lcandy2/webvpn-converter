import aesjs from 'aes-js'

const KEY = 'wrdvpnisthebest!'
const IV = 'wrdvpnisthebest!'
const utf8 = aesjs.utils.utf8
const hex = aesjs.utils.hex
const AesCfb = aesjs.ModeOfOperation.cfb
const PROTOCOLS = ['http', 'https', 'ssh', 'vnc', 'telnet', 'rdp']

const textRightAppend = (text, mode) => {
  const segmentByteSize = mode === 'utf8' ? 16 : 32
  const appendLength = segmentByteSize - (text.length % segmentByteSize)
  return text.padEnd(text.length + appendLength, '0')
}

const createAesCfb = (key, iv) => new AesCfb(utf8.toBytes(key), utf8.toBytes(iv), 16)

const encryptText = (text, key, iv) => {
  const aesCfb = createAesCfb(key, iv)
  const textBytes = utf8.toBytes(textRightAppend(text, 'utf8'))
  const encryptBytes = aesCfb.encrypt(textBytes)

  return hex.fromBytes(utf8.toBytes(iv)) + hex.fromBytes(encryptBytes).slice(0, text.length * 2)
}

const decryptText = (text, key, iv) => {
  const aesCfb = createAesCfb(key, iv)
  const textLength = (text.length - iv.length * 2) / 2
  const decryptBytes = aesCfb.decrypt(hex.toBytes(textRightAppend(text.slice(IV.length * 2), 'hex')))

  return utf8.fromBytes(decryptBytes).slice(0, textLength)
}

const extractProtocolAndUrl = (url) => {
  for (const protocol of PROTOCOLS) {
    const protoLength = protocol.length + 3
    if (url.substring(0, protoLength).toLowerCase() === protocol + '://') {
      return { protocol, url: url.substring(protoLength) }
    }
  }
  return { protocol: 'http', url }
}

export const encryptUrl = (url, key = KEY, iv = IV) => {
  let { protocol, url: urlString } = extractProtocolAndUrl(url)

  let ipv6 = ''
  urlString = urlString.replace(/\[[0-9a-fA-F:]+?\]/, (match) => {
    ipv6 = match
    return ''
  })

  let segments = urlString.split('?')[0].split(':')
  let port = ''
  if (segments.length > 1) {
    port = segments[1].split('/')[0]
    urlString = urlString.substring(0, segments[0].length) + urlString.substring(segments[0].length + port.length + 1)
  }

  const i = urlString.indexOf('/')
  let host = urlString
  let path = ''
  if (i !== -1) {
    host = urlString.slice(0, i)
    path = urlString.slice(i)
  }
  if (ipv6 !== '') {
    host = ipv6
  }

  host = encryptText(host, key, iv)

  if (port !== '') {
    return `/${protocol}-${port}/${host}${path}`
  } else {
    return `/${protocol}/${host}${path}`
  }
}

export const decryptUrl = (rawUrl, key = KEY, iv = IV) => {
  try {
    if (!rawUrl) return { url: '', error: null }

    const url = new URL(rawUrl)
    const segments = url.pathname.split('/')
    const [protocol, port] = segments[1].split('-')
    const decryptedHost = decryptText(segments[2], key, iv)
    const remainingSegments = segments.slice(3).join('/')

    return `${protocol}://${decryptedHost}${port ? ':' + port : ''}/${remainingSegments}`
  } catch (error) {
    return 'Unknown error, check your URL.' 
  }
}

export const keys = (type) => {
  if (type === 'KEY') return KEY 
  else if (type === 'IV') return IV
  else return 'error'
}
