import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'toDo';
  list: { id: number; name: string }[] = [];
  @ViewChild('taskInput', { static: true }) taskInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    const storedList = localStorage.getItem('taskList');
    if (storedList) {
      this.list = JSON.parse(storedList);
    }
  }

  addTask(item: string) {
    console.warn(item);
    this.list.push({ id: this.list.length, name: item });
    this.saveTasks();
  }

  removeTask(id: number) {
    this.list = this.list.filter((item) => item.id !== id);
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('taskList', JSON.stringify(this.list));
  }

  clearTasks() {
    localStorage.removeItem('taskList');
    this.list = [];
  }

  clearInput() {
    this.taskInput.nativeElement.value = '';
  }
}
