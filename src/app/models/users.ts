import IComment from "./comments";
import ILike from "./likes";
import IPost from "./posts";
import IUserTag from "./userTags";

export default interface IUser {
    id:number;
    username:string;
    password:string;
    name: string;
    address:string;
    age: string;
    workplace:string;
    comments:IComment[] | null;
    posts:IPost[] | null;
    likes:ILike[] | null;
    userTaggedPost:IUserTag[] | null;
}