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
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const user_service_1 = require("../user/user.service");
const user_dto_1 = require("dto/user.dto");
let RegisterController = class RegisterController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.userService.findByUsername(user.username)) {
                throw new common_1.HttpException('Username is taken', common_1.HttpStatus.CONFLICT);
            }
            else if (yield this.userService.findByEmail(user.email)) {
                throw new common_1.HttpException('Email is taken', common_1.HttpStatus.CONFLICT);
            }
            const createdUser = yield this.userService.register(user);
            return yield this.authService.createToken(createdUser._id, user.username);
        });
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RegisterController.prototype, "register", null);
RegisterController = __decorate([
    common_1.Controller('register'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], RegisterController);
exports.RegisterController = RegisterController;
//# sourceMappingURL=register.controller.js.map