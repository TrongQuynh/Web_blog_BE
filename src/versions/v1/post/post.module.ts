import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {PostEntity, CategoryEntity, UserEntity,CommentEntity, MediaEntity} from "src/common/entity";
import { GrpcService } from 'src/grpc/grpc.service';
import { GrpcModule } from 'src/grpc/grpc.module';
import { HashtagEntity } from 'src/common/entity/hashtag.entity';

@Module({
  controllers: [PostController],
  providers: [PostService, GrpcService],
  imports: [
    TypeOrmModule.forFeature([PostEntity, CategoryEntity, UserEntity, CommentEntity, HashtagEntity]),
    GrpcModule
  ]
})
export class PostModule {}
