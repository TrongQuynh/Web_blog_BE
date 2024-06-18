import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { PostEntity } from "./post.entity";
import { HashtagEntity } from "./hashtag.entity";

@Entity("hashtags")
export class PostHashtagEntity{

    @PrimaryColumn({ name: 'hashtag_id', type:"int" })
    hashtag_id: number;

    @PrimaryColumn({ name: 'post_id', type:"int" })
    post_id: number;

    @ManyToOne( ()=> PostEntity, post=> post.hashtags)
    @JoinColumn([{ name: 'post_id', referencedColumnName: 'post_id' }])
    posts: PostEntity[];


    @ManyToOne(()=>HashtagEntity, hashtag=> hashtag.posts)
    @JoinColumn([{ name: 'hashtag_id', referencedColumnName: 'hashtag_id' }])
    hashtags: HashtagEntity[];

}