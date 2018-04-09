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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class TaskDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(1),
    __metadata("design:type", String)
], TaskDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], TaskDto.prototype, "complete", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], TaskDto.prototype, "project", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], TaskDto.prototype, "priority", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsDateString(),
    __metadata("design:type", String)
], TaskDto.prototype, "duedate", void 0);
exports.TaskDto = TaskDto;
//# sourceMappingURL=task.dto.js.map