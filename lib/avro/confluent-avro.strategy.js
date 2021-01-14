"use strict";
/**
 * 專案名稱： PubSub Tool
 * 部門代號： ML8100
 * 檔案說明： Confluent Avro解析策略
 * @CREATE Fri Nov 27 2020 上午7:58:03
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
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
exports.ConfluentAvroStrategy = void 0;
var avro = require("avsc");
/**
 * Confluent Avro解析策略
 */
var ConfluentAvroStrategy = /** @class */ (function () {
    function ConfluentAvroStrategy() {
    }
    /**
     * 進行Avro編碼
     *
     * @method private
     * @param schema   Avro Schema
     * @param schemaId Schema ID
     * @param obj      要進行編碼的資料
     * @return 回傳編碼結果
     */
    ConfluentAvroStrategy.prototype.encoded = function (schema, schemaId, obj) {
        var buf;
        var type = avro.Type.forSchema(schema);
        if (typeof obj === 'string') {
            buf = type.toBuffer(JSON.parse(obj));
        }
        else {
            buf = type.toBuffer(obj);
        }
        var result = Buffer.alloc(buf.length + 5);
        result.writeUInt8(0, 0);
        result.writeUInt32BE(schemaId, 1);
        buf.copy(result, 5);
        return result;
    };
    /**
     * 將JSON物件轉Avro
     *
     * @method public
     * @param schemaRegistry Schema Registry
     * @param topic          Topic
     * @param json           JSON物件
     * @return 回傳轉換後的Avro
     */
    ConfluentAvroStrategy.prototype.toAvro = function (schemaRegistry, topic, json) {
        return __awaiter(this, void 0, void 0, function () {
            var schemaId, res, schema_1, results_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, schemaRegistry.getLatestSchemaId(topic)];
                    case 1:
                        schemaId = _a.sent();
                        return [4 /*yield*/, schemaRegistry.getSchemaById(schemaId)];
                    case 2:
                        res = _a.sent();
                        if (res) {
                            schema_1 = JSON.parse(res.schema);
                            results_1 = [];
                            if (Array.isArray(json)) {
                                json.forEach(function (obj) {
                                    var result = _this.encoded(schema_1, schemaId, obj);
                                    results_1.push(result);
                                });
                                return [2 /*return*/, results_1];
                            }
                            else {
                                return [2 /*return*/, this.encoded(schema_1, schemaId, json)];
                            }
                        }
                        else {
                            throw new Error('Avro schema not found');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 從Avro轉JSON物件
     *
     * @method public
     * @param schema Avro Schema
     * @param buffer Avro
     * @return 回傳轉換後的JSON物件
     */
    ConfluentAvroStrategy.prototype.toJson = function (schemaRegistry, buffer) {
        return __awaiter(this, void 0, void 0, function () {
            var schemaId, res, schema, type, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!(buffer.readUInt8(0) === 0)) return [3 /*break*/, 2];
                        schemaId = buffer.readUInt32BE(1);
                        return [4 /*yield*/, schemaRegistry.getSchemaById(schemaId)];
                    case 1:
                        res = _a.sent();
                        if (res) {
                            schema = JSON.parse(res.schema);
                            type = avro.Type.forSchema(schema);
                            return [2 /*return*/, type.fromBuffer(buffer.slice(5))];
                        }
                        else {
                            throw new Error('Avro schema not found');
                        }
                        return [3 /*break*/, 3];
                    case 2: throw new Error("Not Avro Encoded Message: " + JSON.stringify(buffer));
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ConfluentAvroStrategy;
}());
exports.ConfluentAvroStrategy = ConfluentAvroStrategy;
