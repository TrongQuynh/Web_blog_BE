import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, ViewEntity } from "typeorm";
import { UserEntity } from "./user.entity";
import { CategoryEntity } from "./category.entity";
import { CommentEntity } from "./comment.entity";
import { HashtagEntity } from "./hashtag.entity";
import { MediaEntity } from "./media.entity";
import { ViewsEntiy } from "./views.entity";
import { ReactionEntity } from "./reaction.entity";

@Entity("posts")
export class PostEntity{

    @PrimaryGeneratedColumn()
    post_id: number;

    @Column({name: "title", type: "nvarchar"})
    title: string;

    @Column({name: "content", type: "nvarchar"})
    content: string;

    @Column({name: "thumbnail_id", type: "int"})
    thumbnail_id: string;

    @Column({name: "created_at", type: "datetime"})
    created_at: Date;

    @Column({name: "updated_at", type: "datetime"})
    updated_at: Date;

    @OneToOne(()=> CategoryEntity)
    category: CategoryEntity;

    @OneToOne(()=> ReactionEntity)
    @JoinColumn({name: "post_id", referencedColumnName: "post_id"})
    reactions: ReactionEntity;

    @ManyToOne(()=> UserEntity, (user)=> user.user_id, {cascade: true})
    @JoinColumn({name: "user_id"})
    user: UserEntity;

    @OneToMany(()=> CommentEntity, (comment)=> comment.post)
    @JoinColumn({name: "comment_id"})
    comments: CommentEntity[];

    @OneToMany(()=> MediaEntity, (media)=> media.post)
    @JoinColumn([{ name: 'media_id', referencedColumnName: 'media_id' }])
    medias: MediaEntity[];

    @ManyToMany(()=>HashtagEntity, hashtag=> hashtag.posts)
    hashtags: HashtagEntity[];

    @OneToMany(()=> ViewsEntiy, (views)=> views.post)
    @JoinColumn({name: "post_id", referencedColumnName: "post_id"})
    views: ViewsEntiy[];

}