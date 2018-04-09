"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("schemas/user.schema");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    register(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const createUser = new this.userModel(newUser);
            return yield createUser.save();
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ username }).exec();
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ email }).exec();
        });
    }
    isUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findByUsername(username);
            if (user) {
                return yield user.matchPassword(password);
            }
            return false;
        });
    }
};
UserService = __decorate([
    common_1.Component(),
    __param(0, mongoose_2.InjectModel(user_schema_1.UserSchema)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map