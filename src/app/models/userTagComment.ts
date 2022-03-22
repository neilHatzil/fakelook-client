import IComment from "./comments";
import IUser from "./users";

export default interface IUserTagComment {
    //id:string;
    user?:any;
    //userId:number|null;
    commentId?:number|null;
    //comment:IComment|null;
}