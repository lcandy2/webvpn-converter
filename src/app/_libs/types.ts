// Define the data structure of the school list
export interface School {
  province: string | null;
  name: string;
  host: string;
  crypto_key?: string;
  crypto_iv?: string;
}

export interface UrlConvertConfig {
  KEY: string;
  IV: string;
  PROTOCOLS: Protocol[];
}

type Protocol = 'http' | 'https' | 'ssh' | 'vnc' | 'telnet' | 'rdp';

export interface ConvertConfig {
  url: string | URL;
  schoolHost?: string;
  key?: string;
  iv?: string;
}