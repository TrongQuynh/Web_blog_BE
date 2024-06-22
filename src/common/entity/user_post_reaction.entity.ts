import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { ReactionEntity } from "./reaction.entity";
import { UserEntity } from "./user.entity";

@Entity({name: "user_post_reaction"})
export class UserPostReactionEntity{

    @PrimaryColumn()
    user_id: number;

    @PrimaryColumn()
    reaction_id: number;

    @Column({name: "my_reaction", type: "int"})
    my_reaction: number;

    @OneToOne(()=> ReactionEntity)
    @JoinColumn({name: "reaction_id", referencedColumnName: "reaction_id"})
    reaction: ReactionEntity;

    @OneToOne(()=> UserEntity)
    @JoinColumn({name: "user_id", referencedColumnName: "user_id"})
    user: UserEntity;
}