import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule, HttpClient } from  '@angular/common/http';

import {NgForm} from '@angular/forms';
import { FormsModule }   from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, HttpClientModule,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

	title = 'notetodoA';
	todos:  {id: number, title: string, done: boolean}[] = [];

	get completedTodosCount(): number {
		return this.todos ? this.todos.filter(todo => todo.done === false).length : 0;
	}	

	httpClient = inject(HttpClient);
	ngOnInit() {
		this.httpClient.get('http://localhost:3000/api').subscribe((data: any) => {
			this.todos = data;
		});
	}

	onSubmit(f: NgForm) {
		if(f.valid){
			this.httpClient.post('http://localhost:3000/api', { title: f.value.title, done: false }).subscribe((data: any) => {
				this.todos.push(data);
			});			
			f.reset()
		}		
		
	}

	onToggle(id: number) {
		let targetid = this.todos.findIndex(todo => todo.id === id);
		this.httpClient.patch('http://localhost:3000/api/' + id, { title: this.todos[targetid].title, done: !this.todos[targetid].done }).subscribe((data: any) => {
			this.todos[targetid].done = !this.todos[targetid].done
		});
	}

	onDelete(id: number) {
		this.httpClient.delete('http://localhost:3000/api/' + id).subscribe((data: any) => {
			this.todos = this.todos.filter(todo => todo.id!== id);
		});
	}

}