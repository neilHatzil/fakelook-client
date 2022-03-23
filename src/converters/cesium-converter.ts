import { cEntity } from "src/app/models/cEntity";
import IPost from "src/app/models/posts";

export class PostConverter{
    public static convertIPost(post:IPost):cEntity{        
        
        let entity:cEntity =
        {
            id: post.id.toString(),
            description: post.description,
            imageSrc: post.imageSorce,
            location: Cesium.Cartesian3.fromDegrees(post.x_Position,  post.y_Position),
            isShow: true
        };
        return entity
    }
}