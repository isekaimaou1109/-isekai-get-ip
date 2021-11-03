const wrapper = require('./index')();

/* lấy địa chỉ nội bộ của bạn */
console.log("This get an IPv4 on your computer => " + JSON.stringify(wrapper.getPrivateIp('4'), null, 2));

/* lấy địa chỉ public của bạn */
wrapper.getPublicIp('4').then(ip => {
  console.log("Địa chỉ public của bạn là " + JSON.stringify(ip, null, 2));
}).catch(error => console.error("Mạng của bạn bị cá mập cắn rồi, troll tí :))"));

/* kiểm tra xem đây có phải là IPv4 không */
console.log("Có phải ip ver 4 không ta " + wrapper.isIPv4('176.12.1.6'));
console.log("Có phải ip ver 4 không ta " + wrapper.isIPv4('2001:e3ac:4aac:23bd:12cd:eee2:311:23a3'));

/* kiểm tra xem đây có phải là IPv6 không */
console.log("Đây đích thị là ip version 6 à? " + wrapper.isIPv6('2001:e3ac:4aac:23bd:12cd:eee2:311:23a3'));

/* lấy default gateway của 1 địa chỉ ip nào đó */
wrapper.getDefaultGateway('192.168.1.5').then(gateway => {
  console.log("Địa chỉ cổng của con wifi nhà bạn là " + gateway);
}).catch(error => console.error("Địa chỉ không hợp lệ hoặc chưa cấu hình cổng cho con wifi"));

/* kiểm tra xem có phải địa chỉ mac hay không */
console.log("Địa chỉ mac hả ta " + wrapper.isMacaddress('3e:2a:ab:a2:1b:c2'));