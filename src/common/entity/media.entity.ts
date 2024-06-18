import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "./post.entity";


@Entity("medias")
export class MediaEntity{
    @PrimaryGeneratedColumn()
    media_id: number;

    @Column({name: "type", type: "int"})
    type: number;

    @Column({name: "media_name", type: "varchar"})
    media_name: string;

    @Column({name: "created_at", type: "datetime"})
    created_at: Date;

    @Column({name: "url", type: "varchar"})
    url: string;

    @Column({name: "post_id", type: "int", nullable: true})
    post_id: number;
    
    @Column({name: "comment_id", type: "int", nullable: true})
    comment_id: number

    @ManyToOne(()=> PostEntity, (post)=> post.post_id)
    @JoinColumn({name: "post_id"})
    post: PostEntity;
}