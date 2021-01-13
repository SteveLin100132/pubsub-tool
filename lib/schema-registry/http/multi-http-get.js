"use strict";
/**
 * 專案名稱： PubSub Tool
 * 部門代號： ML8100
 * 檔案說明： 多筆HTTP GET請求
 * @CREATE Fri Jan 08 2021 上午10:55:19
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiHttpGet = void 0;
var requestPromise = require("request-promise");
/**
 * 多筆HTTP GET請求
 */
var MultiHttpGet = /** @class */ (function () {
    function MultiHttpGet() {
        /**
         * HTTP請求
         */
        this.http = requestPromise;
    }
    /**
     * 取得請求列表
     *
     * @method public
     * @param uri 呼叫位置
     * @return 回傳請求列表
     */
    MultiHttpGet.prototype.getRequestList = function (uri) {
        var _this = this;
        return uri.map(function (location) {
            return new Promise(function (resolve, reject) {
                return _this.http.get(location, function (error, response, body) {
                    if (error) {
                        reject([error, response, body]);
                    }
                    else {
                        resolve([error, response, body]);
                    }
                });
            });
        });
    };
    /**
     * 呼叫HTTP GET
     *
     * @method public
     * @param uri      呼叫位置
     * @param callback 回呼函數
     */
    MultiHttpGet.prototype.get = function (uri, callback) {
        var requestList = this.getRequestList(uri);
        var response = new Promise(function (resolve, reject) {
            var count = 0;
            requestList.forEach(function (item) {
                item.then(function (res) { return resolve(res); }).catch(function (res) {
                    count++;
                    if (count === requestList.length) {
                        reject(res);
                    }
                });
            });
        });
        response.then(function (value) { return callback.apply(void 0, value); });
    };
    return MultiHttpGet;
}());
exports.MultiHttpGet = MultiHttpGet;
