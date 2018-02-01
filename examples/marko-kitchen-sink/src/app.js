import EventEmitter from 'events';

let nextId = 0;

const getNextId = () => {
  nextId += 1;
  return nextId;
};

const store = new Map();
store.set('todos', [
  {
    title: 'Learn marko',
    completed: true,
    id: getNextId(),
  },
  {
    title: 'Build an awesome web app',
    completed: false,
    id: getNextId(),
  },
  {
    title: 'Profit',
    completed: false,
    id: getNextId(),
  },
]);

store.set('filter', 'all');

/**
 * This is the "class" definition for our Todo app. On the client-side
 * we create a single instance of this class. The TodoApp instances
 * expose methods that can be used to modify the internal application state.
 * When the internal state is changed, a "change" event is emitted
 * and the top-level UI component will rerender based on the new app state.
 */
class TodoApp extends EventEmitter {
  set todos(newTodos) {
    store.set('todos', newTodos);
    this.emitChange();
  }

  get todos() {
    return store.get('todos');
  }

  set filter(newFilter) {
    if (store.get('filter') === newFilter) {
      return;
    }
    store.set('filter', newFilter);
    this.emitChange();
  }

  get filter() {
    return store.get('filter');
  }

  emitChange() {
    this.emit('change', {
      todos: this.todos,
      filter: this.filter,
    });
  }

  /**
   * Private method for committing the changes to a todo item by
   * making a service call to the backend.
   *
   * @param {Object} todo The todo item to update on the backend
   */
  updateTodo(todoId, newProps) {
    this.todos = this.todos.slice(0);

    for (let i = 0; i < this.todos.length; i += 1) {
      const todo = this.todos[i];
      if (todo.id === todoId) {
        this.todos[i] = Object.assign({}, todo, newProps);
        break;
      }
    }
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => todo.completed !== true);
  }

  setTodoCompleted(todoId, completed) {
    this.updateTodo(todoId, { completed });
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter(todo => todo.id !== todoId);
  }

  toggleAllTodosCompleted(completed) {
    this.todos = this.todos.map(todo => {
      if (todo.completed === completed) {
        return todo;
      }
      return Object.assign({}, todo, { completed });
    });
  }

  addNewTodo(todoData) {
    this.todos = this.todos.concat({
      title: todoData.title,
      id: `c${getNextId()}`,
      completed: false,
    });
  }
}

export default new TodoApp();
