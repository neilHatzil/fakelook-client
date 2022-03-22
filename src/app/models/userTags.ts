import IComment from "./comments";
import IPost from "./posts";
import IUser from "./users";

export default interface IUserTag {
    //id:string;
    user:IUser;
    userId:number|null;
    postId:number|null;
    Post:IPost|null;
}

