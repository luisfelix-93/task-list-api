import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskCode:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    timeSpent:{
        type: String,
        required: true
    },
    notes:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    }
  }
  );

export default mongoose.model('Task', taskSchema);