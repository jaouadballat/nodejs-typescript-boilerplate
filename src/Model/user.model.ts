import * as mongoose from 'mongoose';
import User from '../controllers/user/user.interface';



let UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String
});

export default mongoose.model<User>('User', UserSchema);