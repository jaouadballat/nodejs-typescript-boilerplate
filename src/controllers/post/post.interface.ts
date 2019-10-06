import { Document } from 'mongoose';

interface Post extends Document {
    author: string,
    content: string,
    title: string
}

export default Post;