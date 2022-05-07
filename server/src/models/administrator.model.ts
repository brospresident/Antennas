import mongoose from 'mongoose';
import Administrator from '../controllers/Administrators/administrator.interface';

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const adminModel = mongoose.model<Administrator & mongoose.Document>('Administrator', adminSchema);
export default adminModel;
