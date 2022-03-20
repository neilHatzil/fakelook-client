import IPost from "./posts";
import IUser from "./users";

export default interface IUserTag {
    //id:string;
    user:IUser;
    userId:number;
    postId:number;
    Post:IPost|null;
}