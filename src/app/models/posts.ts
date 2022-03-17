import IComment from "./comments";
import ITag from "./tags";
import IUser from "./users";
import IUserTag from "./userTags";

export default interface IPost {
    id:string; //no
    description: string;
    imageSorce:string;
    x_Position: number;
    y_Position: number;
    z_Position: number;
    date:Date;
    likes:any[];
    user:IUser|null;
    userId:string;
    comments:IComment[];
    tags:ITag[];
    userTaggedPost:IUserTag[];
}