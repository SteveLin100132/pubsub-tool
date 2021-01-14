"use strict";
/**
 * 專案名稱： PubSub Tool
 * 部門代號： ML8100
 * 檔案說明： Consumer Error
 * @CREATE Thu Jan 14 2021 下午1:00:47
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerError = void 0;
/**
 * Consumer Error
 */
var ConsumerError = /** @class */ (function () {
    function ConsumerError() {
        /**
         * Error名稱
         */
        this.name = 'ConsumerError';
        /**
         * Error訊息
         */
        this.message = 'Consumer occur error';
    }
    return ConsumerError;
}());
exports.ConsumerError = ConsumerError;
