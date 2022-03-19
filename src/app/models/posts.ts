import IComment from "./comments";
import ITag from "./tags";
import IUser from "./users";
import IUserTag from "./userTags";

export default interface IPost {
    id:number;
    description: string;
    imageSorce:string;
    x_position: number;
    y_position: number;
    z_position: number;
    date:Date;
    likes?:any[]|null; //trying with null
    user?:IUser|null;
    userId:string;
    comments:IComment[]; //trying with null
    tags?:ITag[]|null; //trying with null
    userTaggedPost?:IUserTag[];
}