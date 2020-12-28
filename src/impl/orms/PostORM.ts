import Post from "@app/domains/Post/entities/Post";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'posts'})
export default class PostORM {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    content!: string;
    
    toEntity(): Post {
        const post = new Post;

        post.id = this.id;
        post.title = this.title;
        post.content = this.content;
        

        return post;
    }
}
