"use strict";
/**
 * 專案名稱： PubSub Tool
 * 部門代號： ML8100
 * 檔案說明： Confluent多重Schema Registry
 * @CREATE Wed Jan 13 2021 下午1:07:46
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfluentMultiRegistry = void 0;
var http_1 = require("./../http");
/**
 * Confluent多重Schema Registry
 */
var ConfluentMultiRegistry = /** @class */ (function () {
    /**
     * @param host Schema Registry位置
     */
    function ConfluentMultiRegistry(host) {
        this.host = host;
        /**
         * HTTP請求
         */
        this.http = new http_1.MultiHttpGet();
        /**
         * Schema版本享元
         */
        this.topicSchemaVersionFlyweight = new Map();
        /**
         * Schema享元
         */
        this.schemaFlyweight = new Map();
    }
    /**
     * 取得Subject的URL
     *
     * @method public
     * @return 回傳Subject的URL
     */
    ConfluentMultiRegistry.prototype.getSubjectsUrl = function () {
        return this.host.split(',').map(function (host) { return host + "/subjects"; });
    };
    /**
     * 取得Subject版本URL
     *
     * @method public
     * @param topic Topic名稱
     * @return 回傳Subject版本URL
     */
    ConfluentMultiRegistry.prototype.getSubjectVersionsUrl = function (topic) {
        return this.getSubjectsUrl().map(function (subject) { return subject + "/" + topic + "-value/versions"; });
    };
    /**
     * 取得Subjects清單
     *
     * @method public
     * @return 回傳Subjects清單
     */
    ConfluentMultiRegistry.prototype.getSubjects = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.getSubjectsUrl(), function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode === 200) {
                        resolve(JSON.parse(body));
                    }
                    else {
                        reject(new Error(JSON.parse(body).message));
                    }
                }
            });
        });
    };
    /**
     * 取得特定Topic的Schema版本清單
     *
     * @method public
     * @param topic Topic名稱
     * @return 回傳特定Topic的Schema版本清單
     */
    ConfluentMultiRegistry.prototype.getVersions = function (topic) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a;
            if (_this.topicSchemaVersionFlyweight.get(topic)) {
                resolve((_a = _this.topicSchemaVersionFlyweight.get(topic)) !== null && _a !== void 0 ? _a : []);
            }
            else {
                _this.http.get(_this.getSubjectVersionsUrl(topic), function (error, response, body) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode === 200) {
                            _this.topicSchemaVersionFlyweight.set(topic, JSON.parse(body));
                            resolve(JSON.parse(body));
                        }
                        else {
                            reject(new Error(JSON.parse(body).message));
                        }
                    }
                });
            }
        });
    };
    /**
     * 取得Schema
     *
     * @method public
     * @param topic   Topic名稱
     * @param version 版本
     * @return 回傳Schema
     */
    ConfluentMultiRegistry.prototype.getSchema = function (topic, version) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var target = Array.from(_this.schemaFlyweight)
                .map(function (schema) { return schema[1]; })
                .filter(function (schema) {
                return schema.subject === topic + "-value" && schema.version === version;
            });
            if (target.length > 0) {
                resolve(target[0]);
            }
            else {
                var subjectVersions = _this.getSubjectVersionsUrl(topic).map(function (subject) { return subject + "/" + version; });
                _this.http.get(subjectVersions, function (error, response, body) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode === 200) {
                            var result = JSON.parse(body);
                            _this.schemaFlyweight.set(result.id, result);
                            resolve(result);
                        }
                        else {
                            reject(new Error(JSON.parse(body).message));
                        }
                    }
                });
            }
        });
    };
    /**
     * 取得特定Topic最新的Schema ID
     *
     * @method public
     * @param topic Topic名稱
     * @return 回傳特定Topic最新的Schema ID
     */
    ConfluentMultiRegistry.prototype.getLatestSchemaId = function (topic) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getLatestSchema(topic)
                .then(function (result) { return resolve(result.id); })
                .catch(reject);
        });
    };
    /**
     * 取得特定Topic最新的Schema
     *
     * @method public
     * @param topic Topic名稱
     * @return 回傳特定Topic最新的Schema
     */
    ConfluentMultiRegistry.prototype.getLatestSchema = function (topic) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getVersions(topic)
                .then(function (versions) {
                _this.getSchema(topic, Math.max.apply(Math, versions))
                    .then(resolve)
                    .catch(reject);
            })
                .catch(reject);
        });
    };
    /**
     * 取得特定ID的Schema
     *
     * @method public
     * @param id Schema ID
     * @return 回傳特定ID的Schema
     */
    ConfluentMultiRegistry.prototype.getSchemaById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.schemaFlyweight.get(id)) {
                resolve(_this.schemaFlyweight.get(id));
            }
            else {
                _this.http.get(_this.host.split(',').map(function (host) { return host + "/schemas/ids/" + id; }), function (error, response, body) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode === 200) {
                            var result = JSON.parse(body);
                            _this.schemaFlyweight.set(id, result);
                            resolve(result);
                        }
                        else {
                            reject(new Error(JSON.parse(body).message));
                        }
                    }
                });
            }
        });
    };
    return ConfluentMultiRegistry;
}());
exports.ConfluentMultiRegistry = ConfluentMultiRegistry;
