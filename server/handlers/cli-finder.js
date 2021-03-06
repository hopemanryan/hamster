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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliFinder = void 0;
var util = require('util');
var exec = util.promisify(require('child_process').exec);
var parser = require("xml2json");
var jp = require("jsonpath");
var CliFinder = /** @class */ (function () {
    function CliFinder(os) {
        this.os = os;
        switch (os) {
            case "darwin":
                this.systemOs = 'mac';
                break;
            case "win32":
                this.systemOs = "win32";
                break;
            default:
                this.systemOs = "linux";
                break;
        }
    }
    CliFinder.prototype.findOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.systemOs;
                        switch (_a) {
                            case "win32": return [3 /*break*/, 1];
                            case "mac": return [3 /*break*/, 2];
                        }
                        return [3 /*break*/, 4];
                    case 1: return [2 /*return*/, this.findWindowsOptions()];
                    case 2: return [4 /*yield*/, this.findMacOptions()];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4: return [2 /*return*/, this.findLinuxOptions()];
                }
            });
        });
    };
    CliFinder.prototype.findWindowsOptions = function () {
        return [
            {
                name: 'CMD',
                val: 'cmd.exe'
            },
            {
                name: 'Powershell',
                val: 'powershell.exe'
            }
        ];
    };
    CliFinder.prototype.findMacOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options, optionsFormMacAppCheck, _i, optionsFormMacAppCheck_1, op;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = [
                            {
                                name: 'Terminal',
                                val: 'Terminal'
                            }
                        ];
                        return [4 /*yield*/, this.runMacAppCheck()];
                    case 1:
                        optionsFormMacAppCheck = _a.sent();
                        for (_i = 0, optionsFormMacAppCheck_1 = optionsFormMacAppCheck; _i < optionsFormMacAppCheck_1.length; _i++) {
                            op = optionsFormMacAppCheck_1[_i];
                            options.push({ name: op, val: op });
                        }
                        return [2 /*return*/, options];
                }
            });
        });
    };
    CliFinder.prototype.runMacAppCheck = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cliOptions, _a, stdout, stderr, profile;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cliOptions = ['iTerm', 'Hyper', 'Terminator'];
                        return [4 /*yield*/, exec('system_profiler -xml  SPApplicationsDataType')];
                    case 1:
                        _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                        profile = parser.toJson(stdout.toString(), { object: true });
                        return [2 /*return*/, jp
                                .query(profile, 'plist.array.dict.array[1].dict[*].string[0]')
                                .filter(function (item) { return cliOptions.indexOf(item) > -1; })];
                }
            });
        });
    };
    CliFinder.prototype.findLinuxOptions = function () {
    };
    return CliFinder;
}());
exports.CliFinder = CliFinder;
//# sourceMappingURL=cli-finder.js.map