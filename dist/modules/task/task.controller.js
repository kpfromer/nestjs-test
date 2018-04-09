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
const task_service_1 = require("./task.service");
const task_dto_1 = require("../../dto/task.dto");
const is_objectid_pipe_1 = require("../../pipes/is-objectid.pipe");
const is_not_array_pipe_1 = require("../../pipes/is-not-array.pipe");
let TaskController = class TaskController {
    constructor(service) {
        this.service = service;
    }
    getTasks(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.getTasks();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.getTaskById(id);
        });
    }
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.createTask(task);
        });
    }
    updateTask(id, task) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.updateById(id, task);
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.deleteTaskById(id);
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getTasks", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param(new is_objectid_pipe_1.IsObjectIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getById", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body(new is_not_array_pipe_1.IsNotArrayPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.TaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createTask", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param(new is_objectid_pipe_1.IsObjectIdPipe())),
    __param(1, common_1.Body(new is_not_array_pipe_1.IsNotArrayPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, task_dto_1.TaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateTask", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param(new is_objectid_pipe_1.IsObjectIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "deleteTask", null);
TaskController = __decorate([
    common_1.Controller('task'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map