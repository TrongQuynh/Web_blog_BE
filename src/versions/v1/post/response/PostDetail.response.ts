// import { CommentEntity, MediaEntity, PostEntity } from "src/common/entity";
// import { HashtagEntity } from "src/common/entity/hashtag.entity";
// import { ReactionEntity } from "src/common/entity/reaction.entity";
// import { MediaResponse } from "./Media.response";

import { CommentEntity, MediaEntity, PostEntity, HashtagEntity, ReactionEntity, ReactionType } from "web-blog-shared-resource";

type HashTagResponse = {
    hashtag_id: number;
    hashtag_name: string;
}

type MediaResponse = {
    media_id: number;
    type: number;
    url: string;
}

type ReactionResponse = {
    unicorn: number;
    heart: number;
    wow: number;
    rised_hand: number;
    fire: number;
    my_reaction: number;
}

export class PostDetailResponse{
    post_id: number;
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
    hastag: HashTagResponse[] = [];
    thumbnail: MediaResponse | null = null;
    user: {
        user_id: number;
        username: string;
        avatar: string;
    };
    comments: CommentEntity[];
    medias: MediaResponse[];
    reactions: ReactionResponse;

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
        this.reactions = this.handleMapReaction(postEntity.reaction);
        
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

    private handleMapReaction(reactions: ReactionEntity): ReactionResponse{
        return {
            fire: reactions.fire || 0,
            heart: reactions.heart || 0,
            rised_hand: reactions.rised_hand || 0,
            unicorn: reactions.unicorn || 0,
            wow: reactions.wow || 0,
            my_reaction: ReactionType.NONE
        }
    }

    private handleMapThumbnail(thumbnail_id: string, _medias: MediaResponse[]): MediaResponse | null{
        return _medias.find(media=> media.media_id === +thumbnail_id) ?? null;
    }

}