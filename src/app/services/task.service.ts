import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './../models/task.class';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskService {

	public API_URL: string = 'http://localhost:3000/tasks';

	constructor(
		public http: HttpClient
	) { }

	getAll(): Observable<Task[]> {
		return this.http.get(this.API_URL);
	}

	add(task: Task): Observable<Task> {
		return this.http.post(this.API_URL, {
			title: task.title,
			completed: task.completed
		});
	}

	update(task: Task): Observable<Task> {
		return this.http.put(`${this.API_URL}/${task.id}`, {
			title: task.title,
			completed: task.completed
		});
	}

	delete(id: number): Observable<Task> {
		return this.http.delete(`${this.API_URL}/${id}`);
	}

}
