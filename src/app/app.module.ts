import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

import { TaskService } from './services/task.service';

const taskRoutes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
    },
    {
        path: 'tasks',
        component: TasksComponent
    }
    // task/:id
    // task/:id/edit
];

@NgModule({
    declarations: [
        AppComponent,
        TasksComponent,
        TaskListComponent,
        TaskItemComponent,
        TaskFormComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(taskRoutes)
    ],
    providers: [TaskService],
    bootstrap: [AppComponent]
})
export class AppModule { }
