"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const common_1 = require("@nestjs/common");
const user_module_1 = require("modules/user/user.module");
const auth_service_1 = require("modules/auth/auth.service");
const jwt_strategy_1 = require("modules/auth/jwt.strategy");
const task_controller_1 = require("modules/task/task.controller");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(task_controller_1.TaskController);
    }
};
AuthModule = __decorate([
    common_1.Module({
        imports: [user_module_1.UserModule],
        components: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map