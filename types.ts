export type Version = '4' | '6'

export interface IPInfo {
  family: string;
  address: string;
  macaddress: string;
  protocolVersion: string;
}

export type PublicIp = {
  ipv4: string;
  ipv6: string;
}

export interface WrapperValue {
  getPrivateIp: (version: Version) => Error | IPInfo;
  isIPv4: (ipv4: string) => string;
  isMacaddress: (macaddress: string) => string;
  isIPv6: (ipv6: string) => string;
  getDefaultGateway: (ip: string) => Promise<string>;
  getPublicIp: (version: Version) => Promise<PublicIp>
}