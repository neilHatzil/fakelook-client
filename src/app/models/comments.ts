import ITag from "./tags";
import IUser from "./users";
import IUserTagComment from "./userTagComment";

export default interface IComment {
    id:Number;
    content:string;
    user:IUser;
    userId?:number;
    postId?:number;
    tags:ITag[]; //just content
    userTaggedComment:IUserTagComment[]; //just userid
}