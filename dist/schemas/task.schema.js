"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var Types = mongoose_1.Schema.Types;
exports.TaskSchema = new mongoose_1.Schema({
    description: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        required: true
    },
    project: {
        type: Types.ObjectId,
        ref: 'project'
    },
    priority: {
        type: Number,
        default: 0
    },
    duedate: {
        type: Date
    },
    userId: {
        type: Types.ObjectId,
        ref: 'user',
        required: true
    }
});
//# sourceMappingURL=task.schema.js.map