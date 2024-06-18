import { Observable } from "rxjs"; 

export interface UploadService {
    UpdateUploadRecord(data: {target_id: number, _medias: number[] }): Observable<IUploadReponse>;
}

export interface IUploadReponse{
    isSuccess: boolean;
}