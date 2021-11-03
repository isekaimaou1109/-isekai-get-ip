* # Đây là 1 giải pháp thay thế cho các modules internal-ip, public-ip, default-gateway bởi vì 3 modules đều không dùng được trong môi trường commonjs cho nên mình mới làm ra 1 cách để thay thế.

**Cách dùng**

```javascript
  const wrapper = require('./index')();

  /* lấy địa chỉ nội bộ của bạn */
  console.log("IP ver 4 nè => " + JSON.stringify(wrapper.getPrivateIp('4'), null, 2));

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
```

**Output**

```
IP ver 4 nè => {
  "family": "IPv4",
  "address": "192.168.1.5/24",
  "macaddress": "c4:e9:84:d8:77:53",
  "protocolVersion": "IPv4"
}
Địa chỉ public của bạn là "14.230.235.200"
Có phải ip ver 4 không ta true
Có phải ip ver 4 không ta false
Đây đích thị là ip version 6 à? true
Địa chỉ cổng của con wifi nhà bạn là 192.168.1.1
Địa chỉ mac hả ta true
```
> Và trên đó chính là cách dùng và đầu ra của từng chức năng. Nếu có bất kì vấn đề nào thì cứ post issue lên nha mọi người.
