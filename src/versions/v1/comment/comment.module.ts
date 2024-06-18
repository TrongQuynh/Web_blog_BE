import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity,CommentEntity} from "src/common/entity";

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [
    TypeOrmModule.forFeature([UserEntity, CommentEntity]),
  ]
})
export class CommentModule {}
