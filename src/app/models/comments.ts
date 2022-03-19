import IUser from "./users";

export default interface IComment {
    //id:string;
    content:string;
    user:IUser;
}