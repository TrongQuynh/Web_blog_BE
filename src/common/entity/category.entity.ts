import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("posts")
export class CategoryEntity{

    @PrimaryGeneratedColumn()
    category_id: number;

    @Column({name: "category_name", type: "nvarchar"})
    category_name: string;

    @Column({name: "thumbnail", type: "varchar"})
    thumbnail: string;

    @Column({name: "created_at", type: "datetime"})
    created_at: Date;

    @Column({name: "updated_at", type: "datetime"})
    updated_at: Date;

    // @Column({name: "user_id", type: "int"})
    @ManyToOne(()=>UserEntity, (user)=>user.user_id)
    user_id: number;
}