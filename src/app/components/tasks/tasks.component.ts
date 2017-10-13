import { Component, OnInit } from '@angular/core';
import { TaskService } from './../../services/task.service';
import { Task } from './../../models/task.class';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

	public tasks: Task[] = [];
	public subscription: Subscription;
	public subscriptionParams: Subscription;

	constructor(
		public taskService: TaskService,
		public activatedRoute: ActivatedRoute
	) { }

	ngOnInit() {
		this.subscription = this.taskService.getAll().subscribe((tasks: Task[]) => {
			// this.tasks = tasks;
			this.subscriptionParams = this.activatedRoute.params.subscribe((data: Params) => {
				let status = data.completed ? (data.completed == 'true' ? 1 : -1) : 0;
				this.tasks = tasks.filter(data => {
					if(status == 1){
						return data.completed == true;
					}else if(status == -1){
						return data.completed == false;
					}else{
						return data;
					}
				});
			});
		});
	}

	addTask(title: string) {
		let task = new Task(title);
		this.subscription = this.taskService.add(task).subscribe((data : Task) => {
			this.tasks.push(data);
		});
	}

	setStatus(task : Task){
		task.completed = !task.completed;
		this.subscription = this.taskService.update(task).subscribe((data : Task) => {
			this.updateData(data);
		});
	}

	onDelete(id : number){
		this.subscription = this.taskService.delete(id).subscribe((data : Task) => {
			this.updateDataAfterDelete(id);
		});
	}

	onUpdate(task : Task){
		this.subscription = this.taskService.update(task).subscribe((data : Task) => {
			this.updateData(data);
		});
	}

	updateDataAfterDelete(id){
		for (var i = 0; i < this.tasks.length; i++) {
			if(this.tasks[i].id == id){
				this.tasks.splice(i, 1);
				break;
			}
		}
	}

	updateData(data){
		for (var i = 0; i < this.tasks.length; i++) {
			if(this.tasks[i].id == data.id){
				this.tasks[i] = data;
				break;
			}
		}
	}

}
