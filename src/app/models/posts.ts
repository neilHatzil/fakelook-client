import IComment from "./comments";
import ILike from "./likes";
import ITag from "./tags";
import IUser from "./users";
import IUserTag from "./userTags";

export default interface IPost {
    id:number;
    description: string;
    imageSorce:string;
    x_Position: number;
    y_Position: number;
    z_Position: number;
    date:Date;
    likes?:ILike[]|null; 
    user?:IUser|null;
    userId:number;
    comments:IComment[];
    tags?:ITag[]|null;
    userTaggedPost?:IUserTag[]|null;
}