import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("reactions")
export class ReactionEntity {

    @PrimaryGeneratedColumn({name: "reaction_id"})
    reaction_id: number;

    @Column({name: "unicorn", type: "int", default: 0})
    unicorn: number;

    @Column({name: "heart", type: "int", default: 0})
    heart: number;

    @Column({name: "wow", type: "int", default: 0})
    wow: number;

    @Column({name: "rised_hand", type: "int", default: 0})
    rised_hand: number;

    @Column({name: "fire", type: "int", default: 0})
    fire: number;

    @Column({name: "post_id", type: "int", nullable: false})
    post_id: number;

}