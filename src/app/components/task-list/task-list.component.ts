import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './../../models/task.class';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

	@Input('tasks') tasks: Task[];
	@Output('setStatus') setStatus = new EventEmitter<Task>();
	@Output('delete') delete = new EventEmitter<number>();
	@Output('update') update = new EventEmitter<Task>();

	// 0 : all, -1 : false, 1 : true
	public status: number = 0;
	public subscription: Subscription;

	constructor(
		public activatedRoute: ActivatedRoute
	) { }

	ngOnInit() {
		this.subscription = this.activatedRoute.params.subscribe((data: Params) => {
			this.status = data.completed ? (data.completed == 'true' ? 1 : -1) : 0;
		});
	}

}
