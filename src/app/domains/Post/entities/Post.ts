import Entity from "@app/contracts/Entity";

export default class Post extends Entity {
    
    protected _id!:number;
    protected _title!:string;
    protected _content!:string;

    public get id() : number {
        return this._id;
    }

    public get title() : string {
        return this._title;
    }

    public get content() : string {
        return this._content;
    }
    
    public set id(id: number)  {
        this._id = id;
    }

    public set title(title: string)  {
        this._title = title;
    }

    public set content(content: string)  {
        this._content = content;
    }

}