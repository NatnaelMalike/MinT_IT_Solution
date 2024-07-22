import mongoose from "mongoose";

const visitorSchema = mongoose.Schema({
    ipAddress: {type: String, required: true, unique:true},
    visitCount: { type: Number, default: 1 },
    lastVisit: { type: Date, default: Date.now },
});

const Visitor = new mongoose.model("Visitor", visitorSchema);

export { Visitor };

