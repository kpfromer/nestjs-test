import { Schema } from 'mongoose';
import Types = Schema.Types;

export const TaskSchema = new Schema({
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
    required: true,
    select: false
  }
});
