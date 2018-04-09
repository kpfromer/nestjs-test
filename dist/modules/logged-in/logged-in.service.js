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
const request_context_1 = require("../../middleware/request-context/request-context");
let LoggedInService = class LoggedInService {
    constructor() { }
    getUserId() {
        const user = request_context_1.RequestContext.currentUser();
        if (!user || !user.id) {
            throw new Error('No user id or user!');
        }
        return user.id;
    }
    getAll(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model.find({ userId: this.getUserId() }).exec();
        });
    }
    getById(model, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model.findOne({ _id: id, userId: this.getUserId() }).exec();
        });
    }
    create(model, item) {
        return __awaiter(this, void 0, void 0, function* () {
            item.userId = this.getUserId();
            return yield model.create(item);
        });
    }
    updateById(model, id, newModel) {
        return __awaiter(this, void 0, void 0, function* () {
            delete newModel._id;
            newModel.userId = this.getUserId();
            return yield model.update({ _id: id, userId: this.getUserId() }, newModel, { overwrite: true }).exec();
        });
    }
    deleteById(model, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model.deleteOne({ _id: id, userId: this.getUserId() }).exec();
        });
    }
};
LoggedInService = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [])
], LoggedInService);
exports.LoggedInService = LoggedInService;
//# sourceMappingURL=logged-in.service.js.map