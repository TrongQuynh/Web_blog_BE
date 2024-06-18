import { CommentEntity, MediaEntity, PostEntity } from "src/common/entity";
import { HashtagEntity } from "src/common/entity/hashtag.entity";
// import { MediaResponse } from "./Media.response";

type HashTagResponse = {
    hashtag_id: number;
    hashtag_name: string;
}

type MediaResponse = {
    media_id: number;
    type: number;
    url: string;
}

export class PostDetailResponse{
    post_id: number;
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
    hastag: HashTagResponse[] = [];
    thumbnail: MediaResponse;
    user: {
        user_id: number;
        username: string;
        avatar: string;
    };
    comments: CommentEntity[];
    medias: MediaResponse[];

    constructor(postEntity: PostEntity) {
        this.user = {
            user_id: postEntity.user.user_id,
            username: postEntity.user.username,
            avatar: postEntity.user.avatar
        };
        this.hastag = this.mapHashtag(postEntity.hashtags);
        this.post_id = postEntity.post_id;
        this.title = postEntity.title;
        this.content = postEntity.content;
        this.created_at = postEntity.created_at;
        this.updated_at = postEntity.updated_at;
        this.comments = postEntity.comments;
        this.medias = this.mapMedia(postEntity.medias);
        this.thumbnail = this.handleMapThumbnail(postEntity.thumbnail_id, this.medias);
    }

    mapHashtag(hashtags: HashtagEntity[]): HashTagResponse[]{
        return hashtags.map(hashtag=>{
            return {
                hashtag_id: hashtag.hashtag_id,
                hashtag_name: hashtag.hashtag_name
            }
        })
    }

    mapMedia(medias: MediaEntity[]): MediaResponse[]{
        return medias.map(media=> {
            return {
                media_id: media.media_id,
                type: media.type,
                url: media.url
            }
        })
    }

    private handleMapThumbnail(thumbnail_id: string, _medias: MediaResponse[]): MediaResponse{
        return _medias.find(media=> media.media_id === +thumbnail_id);
    }

}