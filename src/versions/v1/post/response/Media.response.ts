import { MediaEntity } from "src/common/entity";

export class MediaResponse {
    media_id: number;
    type: number;
    url: string;

    constructor(media: MediaEntity){
        this.media_id = media.comment_id;
        this.type = media.type;
        this.url = media.url;
    }
}