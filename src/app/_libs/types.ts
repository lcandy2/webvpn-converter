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
  DECRYPT_FAILED_SEPARATOR: string;
}

type Protocol = 'http' | 'https' | 'ssh' | 'vnc' | 'telnet' | 'rdp';

export interface ConvertConfig {
  url: string | URL;
  schoolHost?: string;
  key?: string;
  iv?: string;
}

type UrlConvertMode = 'encrypt' | 'decrypt';

export interface ConverterConfig {
  mode?: UrlConvertMode;
}

type SettingsMode = 'settings' | 'init';
type SettingsType = 'page' | 'modal';

export interface SettingsConfig {
  mode?: SettingsMode;
  type?: SettingsType;
}
