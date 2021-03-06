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
exports.getProjectInfo = void 0;
var fs = require("fs-extra");
var errors_enum_1 = require("./enums/errors.enum");
var resolve = require('path').resolve;
var readdir = require('fs').promises.readdir;
var gitlog_1 = require("gitlog");
function getProjectInfo(projectPath) {
    return __awaiter(this, void 0, void 0, function () {
        var fileList, packageJsonFileRaw, packageJsonParsed, response, _a, script, key, key;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fs.readdir(projectPath)];
                case 1:
                    fileList = _b.sent();
                    if (!fileList.includes('.git')) {
                        throw Error(errors_enum_1.ErrorsEnum.NOT_GIT_PATH);
                    }
                    return [4 /*yield*/, fs.readFile(projectPath + '/package.json', 'utf-8')];
                case 2:
                    packageJsonFileRaw = _b.sent();
                    packageJsonParsed = JSON.parse(packageJsonFileRaw);
                    _a = {
                        id: '' + uuidv4(),
                        projectName: packageJsonParsed.name,
                        version: packageJsonParsed.version,
                        scripts: [],
                        projectPath: projectPath,
                        appRequirements: [],
                        gitCommits: getCommits(projectPath)
                    };
                    return [4 /*yield*/, getReadMe(projectPath)];
                case 3:
                    response = (_a.readMe = _b.sent(),
                        _a);
                    if (packageJsonParsed.scripts) {
                        for (script in packageJsonParsed.scripts) {
                            response.scripts.push({
                                keyword: script,
                                cmd: packageJsonParsed.scripts[script]
                            });
                        }
                    }
                    if (packageJsonParsed.dependencies) {
                        for (key in packageJsonParsed.dependencies) {
                            response.appRequirements.push({
                                name: key,
                                version: packageJsonParsed.dependencies[key]
                            });
                        }
                    }
                    if (packageJsonParsed.devDependencies) {
                        for (key in packageJsonParsed.devDependencies) {
                            response.appRequirements.push({
                                name: key,
                                version: packageJsonParsed.devDependencies[key]
                            });
                        }
                    }
                    return [2 /*return*/, response];
            }
        });
    });
}
exports.getProjectInfo = getProjectInfo;
function getCommits(projectPath) {
    try {
        return gitlog_1.default({
            repo: projectPath,
            number: 50,
            fields: ["subject", "authorName", "authorDate", "hash", "committerDateRel"],
        });
    }
    catch (e) {
        return [];
    }
}
function getReadMe(projectPath) {
    return __awaiter(this, void 0, void 0, function () {
        var fileExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.pathExists(projectPath + '/README.md')];
                case 1:
                    fileExists = _a.sent();
                    if (fileExists) {
                        return [2 /*return*/, fs.readFile(projectPath + '/README.md', 'utf-8')];
                    }
                    return [2 /*return*/, ''];
            }
        });
    });
}
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
//# sourceMappingURL=projectParser.js.map