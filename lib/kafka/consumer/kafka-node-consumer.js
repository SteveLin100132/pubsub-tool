"use strict";
/**
 * 專案名稱： PubSub Tool
 * 部門代號： ML8100
 * 檔案說明： kafka-node Consumer
 * @CREATE Thu Jan 14 2021 上午10:30:51
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
exports.KafkaNodeConsumer = void 0;
var kafka_node_1 = require("kafka-node");
var rxjs_1 = require("rxjs");
/**
 * kafka-node Consumer
 */
var KafkaNodeConsumer = /** @class */ (function (_super) {
    __extends(KafkaNodeConsumer, _super);
    /**
     * @param options Consumer配置
     * @param topic   Consumer要訂閱的Topic
     */
    function KafkaNodeConsumer(options, topic) {
        var _this = _super.call(this, options, topic) || this;
        /**
         * 要訂閱的項目
         */
        _this.subject = new rxjs_1.Subject();
        /**
         * 發生錯誤時的訂閱項目
         */
        _this.errors = new rxjs_1.Subject();
        /**
         * 是否要分割Array
         */
        _this.splitArray = false;
        return _this;
    }
    /**
     * 消費資料
     *
     * @method public
     * @param resolver 消費資料解析策略
     * @return 回傳物件本身
     */
    KafkaNodeConsumer.prototype.consume = function (resolver) {
        var _this = this;
        this.on('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
            var result, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!resolver) return [3 /*break*/, 2];
                        return [4 /*yield*/, resolver.resolve(message.value)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = message.value;
                        _b.label = 3;
                    case 3:
                        result = _a;
                        if (Array.isArray(result) && this.splitArray) {
                            result.forEach(function (item) { return _this.subject.next(item); });
                        }
                        else {
                            this.subject.next(result);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        return this;
    };
    /**
     * 關閉
     *
     * @method public
     */
    KafkaNodeConsumer.prototype.close = function () {
        _super.prototype.close.call(this, function (error) {
            if (error) {
                console.error(error);
            }
        });
    };
    return KafkaNodeConsumer;
}(kafka_node_1.ConsumerGroup));
exports.KafkaNodeConsumer = KafkaNodeConsumer;
