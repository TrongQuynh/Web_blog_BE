import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "./post.entity";
import { CommentEntity } from "./comment.entity";

@Entity("users")
export class UserEntity{
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({name: "username", type: "nvarchar"})
    username: string;

    @Column({name: "avatar", type: "nvarchar"})
    avatar: string;

    @Column({name: "email", type: "nvarchar", unique: true})
    email:string;

    @Column({name: "password", type: "nvarchar"})
    password: string;

    @Column({name: "role", type: "int", default: 0})
    role: number;

    @Column({name: "access_token", type: "varchar", nullable: true})
    access_token: string;

    @Column({name: "refresh_token", type: "varchar", nullable: true})
    refresh_token: string;

    @OneToMany(()=>PostEntity, (post)=> post.user)
    posts: PostEntity[]

    @OneToMany(()=>CommentEntity, (comment)=> comment.user)
    comments: CommentEntity[]
}