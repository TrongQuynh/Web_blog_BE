import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "./post.entity";

@Entity("hashtags")
export class HashtagEntity{

    @PrimaryGeneratedColumn()
    hashtag_id: number;

    @Column({name: "hashtag_name", type: "varchar"})
    hashtag_name: string;

    @Column({name: "thumbnail", type: "varchar"})
    thumbnail: string;

    @Column({name: "created_at", type: "datetime"})
    created_at: Date;

    @Column({name: "updated_at", type: "datetime"})
    updated_at: Date;

    @ManyToMany(()=> PostEntity, post=> post.hashtags)
    @JoinTable({
        name: "posts_hashtag",
        joinColumn: {
            name: "hashtag_id",
            referencedColumnName: "hashtag_id"
        },
        inverseJoinColumn: {
            name: "post_id",
            referencedColumnName: "post_id"
        }
    })
    posts: PostEntity[];
}