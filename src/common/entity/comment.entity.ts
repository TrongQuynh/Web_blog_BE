import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "./post.entity";
import { UserEntity } from "./user.entity";

@Entity("comments")
export class CommentEntity{

    @PrimaryGeneratedColumn()
    comment_id: number;

    @Column({name: "content", type: "nvarchar"})
    content: string;

    @Column({name: "created_at", type: "datetime"})
    created_at: Date;

    @Column({name: "updated_at", type: "datetime"})
    updated_at: Date;

    @ManyToOne(()=> UserEntity, (user)=>user.comments)
    @JoinColumn({name: "user_id"})
    user: UserEntity;

    @ManyToOne(()=> PostEntity, (post)=> post.comments)
    @JoinColumn({name: "post_id"})
    post: PostEntity;
}