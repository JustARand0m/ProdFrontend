import { Component, OnInit } from '@angular/core';
import { TodoInterface } from 'src/app/core/models/todo-interface';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { AddTodoComponent } from 'src/app/components/add-todo/add-todo.component';
import { TodosService } from 'src/app/core/services/todos.service';
import { DeleteTodoComponent } from 'src/app/components/delete-todo/delete-todo.component';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ConnectionService } from 'src/app/core/services/connection.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public todos$: Observable<TodoInterface[]>;
  public importanceStates: string[] = ['Very urgent', 'In the next view days', 'Someday', 'Done'];

  constructor(private todoService: TodosService,
              private bottomSheet: MatBottomSheet,
              private matDialog: MatDialog,
              private connetion: ConnectionService,
              private store: Store<{todos: TodoInterface[]}>) {
    this.todos$ = store.pipe(
      select('todos'),
      map(result => result.todos)
    );
    this.todos$.subscribe();
    this.todoService.get().subscribe();
  }

  ngOnInit() {
  }

  /**
   * This gets triggered when the add-Todo button is pressed.
   * An bottom sheet will get opened where the todo information should get entered, than there will be a
   * new todo added to the store.
   */
  public addTodo() {
    const ref = this.bottomSheet.open(AddTodoComponent, {data: {importance: this.importanceStates}});
    ref.afterDismissed().subscribe((todo) => {
      if (todo) {
        this.todoService.save(todo).subscribe();
      }
    });
  }

  /**
   * This gets triggered when the trashcan gets clicked This will open a dialog which asks the user
   * if he really wants to delete it an than delete the todo form the store.
   * 
   * @param todo the todo which gets deleted
   */
  public deleteTodo(todo) {
    const dialogRef = this.matDialog.open(DeleteTodoComponent, {
      width: '80%',
      maxWidth: '30rem',
      data: todo.todoMsg,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.todoService.delete(todo.id).subscribe();
      }
    });
  }

  /**
   * This method gets triggered when the checkbox state gets changed.
   * 
   * @param todo the todo object which just got its isDone property changed
   */
  public doneTodo(todo: TodoInterface) {
    this.todoService.update(todo).subscribe();
  }

  /**
   * This method get triggered when the edit button gets clicked. It opens the add todo dialog and than
   * lets you alter the todo.
   * 
   * @param curr_todo The edited todo
   */
  public editTodo(curr_todo: TodoInterface) {
    const ref = this.bottomSheet.open(AddTodoComponent, {data: {importance: this.importanceStates, todo: curr_todo}});
    ref.afterDismissed().subscribe((todo) => {
      this.todoService.update(todo).subscribe();
    });
  }
}
