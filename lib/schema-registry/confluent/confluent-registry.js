"use strict";
/**
 * 專案名稱： PubSub Tool
 * 部門代號： ML8100
 * 檔案說明： Confluent Schema Registry
 * @CREATE Wed Jan 13 2021 下午1:09:26
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfluentRegistry = void 0;
var requestPromise = require("request-promise");
var ConfluentRegistry = /** @class */ (function () {
    /**
     * @param host Schema Registry位置
     */
    function ConfluentRegistry(host) {
        this.host = host;
        /**
         * HTTP請求
         */
        this.http = requestPromise;
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
    ConfluentRegistry.prototype.getSubjectsUrl = function () {
        return this.host + "/subjects";
    };
    /**
     * 取得Subject版本URL
     *
     * @method public
     * @param topic Topic名稱
     * @return 回傳Subject版本URL
     */
    ConfluentRegistry.prototype.getSubjectVersionsUrl = function (topic) {
        return this.getSubjectsUrl() + "/" + topic + "-value/versions";
    };
    /**
     * 取得Subjects清單
     *
     * @method public
     * @return 回傳Subjects清單
     */
    ConfluentRegistry.prototype.getSubjects = function () {
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
    ConfluentRegistry.prototype.getVersions = function (topic) {
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
    ConfluentRegistry.prototype.getSchema = function (topic, version) {
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
                _this.http.get(_this.getSubjectVersionsUrl(topic) + "/" + version, function (error, response, body) {
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
    ConfluentRegistry.prototype.getLatestSchemaId = function (topic) {
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
    ConfluentRegistry.prototype.getLatestSchema = function (topic) {
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
    ConfluentRegistry.prototype.getSchemaById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.schemaFlyweight.get(id)) {
                resolve(_this.schemaFlyweight.get(id));
            }
            else {
                _this.http.get(_this.host + "/schemas/ids/" + id, function (error, response, body) {
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
    return ConfluentRegistry;
}());
exports.ConfluentRegistry = ConfluentRegistry;
