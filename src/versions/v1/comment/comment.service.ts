import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/common/entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {

    constructor(@InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>){}

    async getNewestComments(){
        return await this.commentRepository.find({order: { created_at: "DESC" }, relations: ["post", "user"]});
    }

}
