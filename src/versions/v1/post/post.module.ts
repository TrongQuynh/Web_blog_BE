import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrpcService } from 'src/grpc/grpc.service';
import { GrpcModule } from 'src/grpc/grpc.module';
import { RedisModule } from 'src/config/redis/redis.module';
import { RedisService } from 'src/config/redis/redis.service';
import { ClearUserViewedBlacklistService } from 'src/common/service/cronjobs/clear-user-viewed-blacklist.service';

import { PostEntity, CategoryEntity, UserEntity, CommentEntity, HashtagEntity, ViewsEntiy, ReactionEntity, UserPostReactionEntity } from 'web-blog-shared-resource';

@Module({
  controllers: [PostController],
  providers: [PostService, GrpcService, RedisService, ClearUserViewedBlacklistService],
  imports: [
    TypeOrmModule.forFeature([PostEntity, CategoryEntity, UserEntity, CommentEntity, HashtagEntity, ViewsEntiy, ReactionEntity, UserPostReactionEntity]),
    GrpcModule,
    RedisModule
  ]
})
export class PostModule {}
