import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
    imports: [PostModule]
})
export class V1Module {}
