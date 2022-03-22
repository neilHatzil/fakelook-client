
export default interface IFilter {
    startingDate:Date|null;
    endingDate:Date|null;
    publishers:string[]|null;
    tags:string[]|null;
    taggedUsers:string[]|null;
}