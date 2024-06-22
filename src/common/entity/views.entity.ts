import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "./post.entity";

@Entity("views")
export class ViewsEntiy {

    @PrimaryGeneratedColumn()
    view_id: number;

    @ManyToOne(()=> PostEntity, (post)=> post.views)
    @JoinColumn({name: "post_id"})
    post: PostEntity;

    @Column({name: "post_id", type: "int"})
    @JoinColumn({name: "post_id", referencedColumnName: "post_id"})
    post_id: number;

    @Column({name: "date", type: "date"})
    date: string;

    @Column({name: "views", type: "int"})
    views: number;

}