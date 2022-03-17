import IPost from "./posts";

export default interface IUserTag {
    id:string;
    user:string;
    userId:string;
    postId:string;
    Post:IPost|null;
}