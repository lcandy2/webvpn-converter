// Define the data structure of the school list
export interface School {
  province: string | null;
  name: string;
  host: string;
  crypto_key: string | null;
  crypto_iv: string | null;
}

export interface UrlConvertConfig {
  KEY: string;
  IV: string;
  PROTOCOLS: Protocol[];
  ALGORITHM: string;
}

type Protocol = 'http' | 'https' | 'ssh' | 'vnc' | 'telnet' | 'rdp';

export interface ConvertConfig {
  url: string | URL;
  key?: string;
  iv?: string;
}
