export class NewestComment{
    comment_id: number;
    content: string;
    created_at: Date;
    medias: {
        media_id: number;
        type: number;
    }[]
    user: {
        user_id: number;
        username: string;
        avatar: string;
    };
    post:{
        post_id: number;
        title: string;
    }
    constructor(){}
    
} 

    

