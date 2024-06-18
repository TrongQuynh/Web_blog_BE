import { IsArray, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class NewPostDTO{
    @IsString({message: "title field can not empty"})
    @IsNotEmpty()
    title: string;

    @IsString({message: "content field can not empty"})
    @IsNotEmpty()
    @MinLength(5)
    content: string;

    @IsArray({message: "medias field must be array"})
    // @ArrayNotEmpty()
    // @ArrayMinSize(1) // At least one media ID is required
    // @IsNumber({}, { each: true, message: "" }) // Each item in the array should be a number
    medias: number[]; // HOLD LIST MEDIA ID,

    @IsOptional()
    @IsString()
    thumbnail_id: string;
}