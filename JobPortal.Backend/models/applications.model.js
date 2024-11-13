import mongoose from "mongoose";

const applicationSchema=mongoose.Schema({
    Job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }

},
{
    timestamps:true
    });
    export const Application=
    mongoose.model('Application',applicationSchema);
    