import { PostEntity } from "src/common/entity";
import { HashtagEntity } from "src/common/entity/hashtag.entity";

type HashTagResponse = {
    hashtag_id: number;
    hashtag_name: string;
}

export class ListPost {
    post_id: number;
    title: string;
    content: string;
    thumbnail_id: string;
    created_at: Date;
    updated_at: Date;
    no_of_comment: number = 0;
    hastag: HashTagResponse[] = [];
    user: {
        user_id: number;
        username: string;
        avatar: string;
    };

    constructor(postEntity: PostEntity) {
        this.user = {
            user_id: postEntity.user.user_id,
            username: postEntity.user.username,
            avatar: postEntity.user.avatar
        };
        this.hastag = this.mapHashtag(postEntity.hashtags);
        this.no_of_comment = postEntity.comments.length;
        this.post_id = postEntity.post_id;
        this.title = postEntity.title;
        this.content = postEntity.content;
        this.created_at = postEntity.created_at;
        this.updated_at = postEntity.updated_at;
        this.thumbnail_id = postEntity.thumbnail_id;
    }

    static mapListPost(_posts: PostEntity[]): ListPost[] {
        return _posts.map(post => new ListPost(post));
    }

    mapHashtag(hashtags: HashtagEntity[]): HashTagResponse[]{
        return hashtags.map(hashtag=>{
            return {
                hashtag_id: hashtag.hashtag_id,
                hashtag_name: hashtag.hashtag_name
            }
        })
    }

}