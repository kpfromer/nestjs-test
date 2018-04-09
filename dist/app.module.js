"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cat_module_1 = require("modules/cat/cat.module");
const login_module_1 = require("modules/login/login.module");
const register_module_1 = require("modules/register/register.module");
const task_module_1 = require("modules/task/task.module");
const request_context_middleware_1 = require("middleware/request-context/request-context.middleware");
const winston = require("winston");
const expressWinston = require("express-winston");
const app_controller_1 = require("app.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(request_context_middleware_1.RequestContextMiddleware).forRoutes({ path: '*' });
        consumer.apply(expressWinston.logger({
            transports: [
                new winston.transports.Console({
                    json: true,
                    colorize: true
                })
            ],
            meta: true,
            msg: 'HTTP {{req.method}} {{req.url}}',
            expressFormat: true,
            colorize: false,
            ignoreRoute: function (req, res) { return false; }
        })).forRoutes({ path: '*' });
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost/nestjs-login'),
            login_module_1.LoginModule,
            register_module_1.RegisterModule,
            cat_module_1.CatModule,
            task_module_1.TaskModule
        ],
        controllers: [app_controller_1.AppController],
        components: []
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map