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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = __importDefault(require("../../models/order"));
var user_1 = __importDefault(require("../../models/user"));
var product_1 = __importDefault(require("../../models/product"));
var database_1 = __importDefault(require("../../database"));
var orderStore = new order_1.default();
var userStore = new user_1.default();
var productStore = new product_1.default();
describe('test order model', function () {
    describe('test order model methods is defined', function () {
        it('create method is defined', function () {
            expect(orderStore.create).toBeDefined();
        });
        it('add product method is defined', function () {
            expect(orderStore.addProduct).toBeDefined();
        });
        it('get current order method is defined', function () {
            expect(orderStore.getCurrentOrder).toBeDefined();
        });
    });
    describe('test order model logic', function () {
        var user = {
            username: 'user1',
            first_name: 'user1',
            last_name: 'test1',
            email: 'user1@test.com',
            user_password: 'user123'
        };
        var product1 = {
            product_name: 'laptop',
            price: 5000
        };
        var product2 = {
            product_name: 'phone',
            price: 1000
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userStore.create(user)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, productStore.create(product1)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, productStore.create(product2)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var conn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query('DELETE FROM orders_products; \n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1; \n DELETE FROM orders; \n ALTER SEQUENCE orders_id_seq RESTART WITH 1; \n DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1; \n  DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1;')];
                    case 2:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it('test create method logic', function () { return __awaiter(void 0, void 0, void 0, function () {
            var orderTest, testID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderStore.create({
                            user_id: 1,
                            order_status: 'active'
                        })];
                    case 1:
                        orderTest = _a.sent();
                        testID = orderTest.id;
                        expect(orderTest).toEqual({
                            id: testID,
                            user_id: 1,
                            order_status: 'active'
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('test add product method logic, add product 1 to order 1 by user 1', function () { return __awaiter(void 0, void 0, void 0, function () {
            var orderProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderStore.addProduct({
                            order_id: 1,
                            product_id: 1,
                            quantity: 2
                        })];
                    case 1:
                        orderProduct = _a.sent();
                        expect(orderProduct.id).toBe(1);
                        expect(orderProduct.order_id).toBe(1);
                        expect(orderProduct.product_id).toBe(1);
                        expect(orderProduct.quantity).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('test add product method logic, add product 2 to order 1 by user 1', function () { return __awaiter(void 0, void 0, void 0, function () {
            var orderProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderStore.addProduct({
                            order_id: 1,
                            product_id: 2,
                            quantity: 4
                        })];
                    case 1:
                        orderProduct = _a.sent();
                        expect(orderProduct.id).toBe(2);
                        expect(orderProduct.order_id).toBe(1);
                        expect(orderProduct.product_id).toBe(2);
                        expect(orderProduct.quantity).toBe(4);
                        return [2 /*return*/];
                }
            });
        }); });
        it('test get current order by user id method logic', function () { return __awaiter(void 0, void 0, void 0, function () {
            var currentOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderStore.getCurrentOrder('1')];
                    case 1:
                        currentOrder = _a.sent();
                        expect(currentOrder.length).toBe(2);
                        expect(currentOrder[0].product_name).toBe('laptop');
                        expect(currentOrder[1].product_name).toBe('phone');
                        expect(currentOrder[0].quantity).toBe(2);
                        expect(currentOrder[1].quantity).toBe(4);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
