import ITag from "./tags";
import IUser from "./users";
import IUserTag from "./userTags";

export default interface IComment {
    id:Number;
    content:string;
    user:IUser;
    userId?:number;
    postId?:number;
    tags:ITag[]; //just content
    userTaggedComment:IUserTag[]; //just userid
}