import mongoose from "mongoose";
import { title } from "process";

const monoSchema = new mongoose.Schema({
    lat:{
        type: Number,
        required: true
    },
    lng:{
        type: Number,
        required: true
    },
    isSend:{
        type: Boolean,
        default: false
    },
    genre:{
        type: String,
        require: true,
        default: ""
    },
    age:{
        type: Number,
        require: true,
        default: 0
    },
    creationDate:{
        type: Date,
        default: Date.now
    }

});

export const monoModel = mongoose.model("Mono", monoSchema);