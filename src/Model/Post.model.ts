import * as mongoose from 'mongoose';
import Post from '../controllers/post/post.interface';



let PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String
});

export default mongoose.model<Post>('Post', PostSchema)