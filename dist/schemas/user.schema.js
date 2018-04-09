"use strict";
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
const class_validator_1 = require("class-validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const validator = new class_validator_1.Validator();
exports.UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: email => validator.isEmail(email),
    },
});
exports.UserSchema.methods.matchPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(password, this.password);
    });
};
exports.UserSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt.hash(this.password, saltRounds);
    });
});
//# sourceMappingURL=user.schema.js.map