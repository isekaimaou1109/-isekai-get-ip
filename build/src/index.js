"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
module.exports = (function () {
    var os = require('os');
    var nics = os.networkInterfaces();
    return ({
        getPrivateIp: function (version) {
            var nic;
            if (version !== '4' && version !== '6') {
                return new Error('Gomenasai please nhập 4 hoặc 6 vì ip chỉ có v4 hoặc v6');
            }
            for (var nicName in nics) {
                for (var _i = 0, _a = nics[nicName]; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.family === 'IPv6' && /^\b2001\b/gm.test(item.address)) {
                        nic = nics[nicName].filter(function (kind) { return kind.family === 'IPv' + version; }).map(function (model) { return ({
                            family: model.family, address: model.cidr, macaddress: model.mac, protocolVersion: model.family
                        }); });
                        break;
                    }
                }
            }
            return nic[0];
        },
        isIPv4: function (ipv4) {
            return ipv4.trim().split('.').every(function (numeric) { return parseInt(numeric) > 0 && parseInt(numeric) < 255; }) ? true : false;
        },
        isMacaddress: function (macaddress) {
            return macaddress.trim().split(':').length == 6 && macaddress.split(':').every(function (item) { return item.length == 2 && /[a-f0-9]{2}/gm.test(item); }) ? true : false;
        },
        isIPv6: function (ipv6) {
            return typeof ipv6 === 'string' && /(^\:{2}[1]|\bfe80::1%\d{2}\b|^\b2001\b(\:\w{3,4})+|\bfe80::\b([a-f0-9]{3,4}\:*)+(\%\d{2})*)/gm.test(ipv6.trim()) ? true : false;
        },
        getDefaultGateway: function (ip) {
            return __awaiter(this, void 0, void 0, function () {
                var execSync, content, lines, index, routes, i, realLine;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            execSync = require('child_process').execSync;
                            return [4 /*yield*/, execSync(os.platform() == 'win32' ? 'route print -4' : 'ip route list').toString()];
                        case 1:
                            content = _a.sent();
                            lines = content.split('\n');
                            index = lines.map(function (line) { return line.trim(); }).indexOf('Active Routes:');
                            routes = lines.slice(index + 1, lines.length);
                            for (i = 0; i < routes.length; i++) {
                                if (routes[i].includes(ip)) {
                                    realLine = routes[i].split(/\x20{2,8}/gm).filter(function (item) { return item.trim() !== ''; });
                                    if (realLine[realLine.indexOf(ip) - 1] !== 'On-link') {
                                        return [2 /*return*/, realLine[realLine.indexOf(ip) - 1]];
                                    }
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        getPublicIp: function (version) {
            if (version === void 0) { version = '4'; }
            return __awaiter(this, void 0, void 0, function () {
                var axios, ipv4, ipv6, ip;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            axios = require('axios')["default"];
                            if (version !== '4' && version !== '6' && version !== 'both') {
                                return [2 /*return*/, null];
                            }
                            if (!(version === 'both')) return [3 /*break*/, 3];
                            return [4 /*yield*/, axios.get("https://ipv4bot.whatismyipaddress.com")];
                        case 1:
                            ipv4 = _a.sent();
                            return [4 /*yield*/, axios.get("https://ipv6bot.whatismyipaddress.com")];
                        case 2:
                            ipv6 = _a.sent();
                            return [2 /*return*/, { ipv4: ipv4.data, ipv6: ipv6.data }];
                        case 3: return [4 /*yield*/, axios.get("https://ipv".concat(version, "bot.whatismyipaddress.com"))];
                        case 4:
                            ip = _a.sent();
                            return [2 /*return*/, ip.data];
                    }
                });
            });
        }
    });
});
