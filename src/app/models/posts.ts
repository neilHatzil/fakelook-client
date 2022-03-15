import IComment from "./comments";

export default interface IPost {
    id:string; //no
    text: string;
    image:string;
    location: { x: number; y: number; z: number };
    date:Date;
    isLiked:boolean;
    comments:IComment[];
}