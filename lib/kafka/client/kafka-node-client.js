"use strict";
/**
 * 專案名稱： PubSub Tool
 * 部門代號： ML8100
 * 檔案說明： kafka-node客戶端
 * @CREATE Wed Jan 13 2021 下午12:50:38
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaNodeClient = void 0;
var kafka_node_1 = require("kafka-node");
/**
 * kafka-node客戶端
 */
var KafkaNodeClient = /** @class */ (function (_super) {
    __extends(KafkaNodeClient, _super);
    /**
     * @param options Kafka客戶端配置
     */
    function KafkaNodeClient(options) {
        return _super.call(this, options) || this;
    }
    /**
     * Kafka客戶端連線
     *
     * @method public
     */
    KafkaNodeClient.prototype.connect = function () {
        var _this = this;
        _super.prototype.connect.call(this);
        return new Promise(function (resolve) { return _this.once('ready', function () { return resolve(); }); });
    };
    return KafkaNodeClient;
}(kafka_node_1.KafkaClient));
exports.KafkaNodeClient = KafkaNodeClient;
