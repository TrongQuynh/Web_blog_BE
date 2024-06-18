import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { PostEntity } from 'src/common/entity';
import { ListPost } from './response/ListPost.response';
import { PostSuggestion } from './response/PostSuggestion.response';
import { PostDetailResponse } from './response/PostDetail.response';
import { NewPostDTO } from './dto/NewPost.dto';
import { GrpcService } from 'src/grpc/grpc.service';
import { CatchException } from 'src/common/filters/common-exception.filter';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
        private readonly grpcService: GrpcService
    ){}

    async getListPost(skip: number, take: number){
        const _posts = await this.postRepository.find({ skip, take, order:{
            created_at: "DESC",
            updated_at: "DESC"
            // post_id: "DESC"
        }, relations: ["user", "comments", "hashtags"]});

        return  ListPost.mapListPost(_posts);
    }

    async getPostDetail(post_id: number): Promise<any>{
      try {

        const data: PostEntity | null = await this.postRepository.findOne({where: {post_id}, relations: ["user", "comments", "hashtags", "medias"]});
        
        if(data == null)  return null;

        this.handleUpdateViewOfPost(post_id);

        const postDetail = new PostDetailResponse(data);

        return postDetail;

      } catch (error) {
        console.log("[ERROR][getPostDetail]", error);
            return null;
      }
    }

    async getPostInTop(topType: "DAY" | "MONTH" | "YEAR"): Promise<any>{ 

    }

    async getPostSuggestion(): Promise<PostSuggestion[]>{
        return await this.postRepository.createQueryBuilder("post").orderBy("RAND()").limit(5).getMany();
    }

    private handleUpdateViewOfPost(postId: number): void{
        this.postRepository.increment({post_id: postId}, "views", 1);
    }

    async handleCreateNewPost(payload: NewPostDTO, user_id: number){
       try {
         // HANDLE SAVE INTO DB
         const newPost = this.postRepository.create({
            title: payload.title,
            content: payload.content,
            thumbnail_id: payload.thumbnail_id,
            user: {
                user_id
            },
            created_at: new Date(),
            updated_at: new Date()
        });

        const postDB = await this.postRepository.save(newPost);
        return postDB.post_id;

       } catch (error) {
            console.log("[ERROR][handleCreateNewPost]", error);
            throw new CatchException(error);
       }
        
    }

    // ===================== TEST =====================
    async test(){
        // this.postRepository
    }

}
