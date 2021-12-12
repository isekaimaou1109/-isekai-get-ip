import { NetworkInterfaceInfo } from 'os';
import { IPInfo, Version } from '../types'

module.exports = (function() {
  const os: typeof import('os') = require('os')
  const nics: NodeJS.Dict<NetworkInterfaceInfo[]> = os.networkInterfaces();

  return ({
    getPrivateIp: function(version) {
      var nic: IPInfo | IPInfo[];

      for(let nicName in nics) {
        for(let item of nics[nicName]) {
          if(item.family === 'IPv6' && /^\b2001\b/gm.test(item.address)) {
            nic = nics[nicName].filter(kind => kind.family === 'IPv' + version).map(model => ({ 
              family: model.family, address: model.cidr, macaddress: model.mac, protocolVersion: model.family 
            }))
            break;
          }
        }
      }
      return nic[0];
    }, 

    isIPv4: function(ipv4) {
      return ipv4.trim().split('.').every(numeric => parseInt(numeric) > 0 && parseInt(numeric) < 255) ? true : false  
    },

    isMacaddress: function(macaddress) {
      return macaddress.trim().split(':').length == 6 && macaddress.split(':').every(item => item.length == 2 && /[a-f0-9]{2}/gm.test(item)) ? true : false;
    },

    isIPv6: function(ipv6) {
      return typeof ipv6 === 'string' && /(^\:{2}[1]|\bfe80::1%\d{2}\b|^\b2001\b(\:\w{3,4})+|\bfe80::\b([a-f0-9]{3,4}\:*)+(\%\d{2})*)/gm.test(ipv6.trim()) ? true : false;
    },

    getDefaultGateway: async function(ip) {
      const { execSync } = require('child_process');
    
      const content: string = await execSync(os.platform() == 'win32' ? 'route print -4' : 'ip route list').toString();
      const lines: string[] = content.split('\n');
      const index: number = lines.map(line => line.trim()).indexOf('Active Routes:');
      const routes: string[] = lines.slice(index + 1, lines.length);
    
      for(let i = 0; i < routes.length; i++) {
        if(routes[i].includes(ip)) {
          const realLine = routes[i].split(/\x20{2,8}/gm).filter(item => item.trim() !== '');
          if(realLine[realLine.indexOf(ip) - 1] !== 'On-link') {
            return realLine[realLine.indexOf(ip) - 1]
          }
        }
      }
    },

    getPublicIp: async function(version: Version | 'both') {
      const axios: typeof import('axios').default = require('axios').default;
      
      if(version === 'both') {
        const ipv4 = await axios.get(`https://ipv4bot.whatismyipaddress.com`);
        const ipv6 = await axios.get(`https://ipv6bot.whatismyipaddress.com`);
        return ({ ipv4: ipv4.data, ipv6: ipv6.data });
      }

      const ip = await axios.get(`https://ipv${version}bot.whatismyipaddress.com`);
      return ip.data;
    }
  })
})