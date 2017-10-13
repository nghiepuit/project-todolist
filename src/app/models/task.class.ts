export class Task{

	public id : number;
	public title : string;
	public completed : boolean;

	constructor(title : string){
		this.title = title;
		this.completed = false;
	}

}