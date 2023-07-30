import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, setDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todos$: Observable<any>;
  firestore: Firestore = inject(Firestore);
  todos:Array<any>;
  todotext = '';

  constructor() {
    const itemCollection = collection(this.firestore, 'todos');
    this.todos$ = collectionData(itemCollection);

    this.todos$.subscribe( (newTodos) => {
      console.log('Todos updated', newTodos)
      this.todos = newTodos;
    });
  }

  addTodo(): void{
    const itemCollection = collection(this.firestore, 'todos');
    setDoc(doc(itemCollection), {name: this.todotext});
  }

}
