import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ListPost } from './response/ListPost.response';
import { PostSuggestion } from './response/PostSuggestion.response';
import { PostDetailResponse } from './response/PostDetail.response';
import { NewPostDTO } from './dto/NewPost.dto';
import { GrpcService } from 'src/grpc/grpc.service';
import { CatchException } from 'src/common/filters/common-exception.filter';
import { RedisService } from 'src/config/redis/redis.service';
import { ViewsEntiy, PostEntity, UserEntity, UserPostReactionEntity } from 'web-blog-shared-resource';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,

        @InjectRepository(ViewsEntiy)
        private viewRepository: Repository<ViewsEntiy>,

        @InjectRepository(UserPostReactionEntity)
        private userPostRepository: Repository<UserPostReactionEntity>,

        private readonly grpcService: GrpcService,
        private readonly redisService: RedisService,
        
    ){}

    async getListPost(skip: number, take: number){

        const _posts = await this.postRepository.find({ skip, take, order:{
            created_at: "DESC",
            updated_at: "DESC"
            // post_id: "DESC"
        }, relations: ["user", "comments", "hashtags"]});

        return  ListPost.mapListPost(_posts);
    }

    async getPostDetail(post_id: number, user_id: number): Promise<any>{
      try {

        const data: PostEntity | null = await this.postRepository.findOne({where: {post_id}, relations: ["user", "hashtags", "medias", "reaction"]});

        const nowDay: Date = new Date();

        if(data == null)  return null;

        const isUserHaveInBlackListViewdPost = await this.redisService.isUserHaveInBlackListViewdPost(post_id, data.user.user_id);

        if(isUserHaveInBlackListViewdPost == false) this.handleUpdateViewOfPost(post_id, nowDay);

        this.redisService.handleAddUserToBlackListViewdPost(post_id, data.user.user_id);

        const userReaction: UserPostReactionEntity | null = await this.userPostRepository.findOne({where: {
            user_id,
            reaction_id: data.reaction.reaction_id
        }})

        const postDetail = new PostDetailResponse(data);

        if(userReaction) postDetail.reactions.my_reaction = userReaction.my_reaction;

        return postDetail;

      } catch (error) {
        console.log("[ERROR][getPostDetail]", error);
            return null;
      }
    }

    async getPostInTop(topType: string): Promise<any>{ 
        const today = new Date();

        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        let datePattern = `${month}/${day}/${year}`;

        if(topType == "MONTH") datePattern = `${month}/%/${year}`;
        if(topType == "YEAR") datePattern = `%/%/${year}`;
       
        return await this.postRepository.createQueryBuilder("post")
        .innerJoinAndSelect("post.views", "views", "views.post_id = post.post_id" )
        .orderBy("views.views", "DESC")
        .where("views.date LIKE :date", {date: datePattern})
        .getMany();
        
    }

    async getPostSuggestion(): Promise<PostSuggestion[]>{
        return await this.postRepository.createQueryBuilder("post").orderBy("RAND()").limit(5).getMany();
    }

    async handleCreateNewPost(payload: NewPostDTO, user_id: number){
       try {

        console.log(user_id);
        

         // HANDLE SAVE INTO DB
         const newPost = this.postRepository.create({
            title: payload.title,
            content: payload.content,
            thumbnail_id: payload.thumbnail_id ?? null,
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

    // ===================== SUPPORT ====================

    private async handleUpdateViewOfPost(postId: number, date: Date): Promise<any>{
        // this.postRepository.increment({post_id: postId}, "views", 1);
        const record: ViewsEntiy | null = await this.viewRepository.findOne({
            where: {
                post: {
                    post_id: postId
                },
                date: date.toLocaleDateString()
            }
        });

        if(record == null) {
            this.viewRepository.save({
                post_id: postId,
                views: 1,
                date: date.toLocaleDateString()
            });
            return;
        }

        record.views += 1;

        await this.viewRepository.save(record);
    }

}
