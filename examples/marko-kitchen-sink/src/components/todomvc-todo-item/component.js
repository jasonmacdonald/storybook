import todoApp from '../../app';

export default class ToDoItem {
  onCreate() {
    this.state = {
      isEditing: false,
      editingTitle: '',
    };
  }

  saveEdit() {
    if (this.state.isEditing) {
      todoApp.updateTodo(this.input.id, {
        title: this.getEl('titleInput').value,
      });
      this.state.isEditing = false;
    }
  }

  cancelEdit() {
    this.state.isEditing = false;
  }

  handleCheckboxChange(event, input) {
    todoApp.setTodoCompleted(this.input.id, !!input.checked);
  }

  handleLabelDblClick() {
    Object.assign(this.state, {
      isEditing: true,
      editingTitle: this.input.title,
    });
  }

  removeTodo() {
    todoApp.removeTodo(this.input.id);
  }

  onUpdate() {
    if (this.state.isEditing) {
      const inputEl = this.getEl('titleInput');
      inputEl.focus();
      const val = inputEl.value;
      inputEl.value = '';
      inputEl.value = val;
    }
  }

  handleInputKeyDown(event) {
    if (event.keyCode === 13 /* ENTER */) {
      this.saveEdit();
    } else if (event.keyCode === 27 /* ESC */) {
      this.cancelEdit();
    }
  }

  handleDetach(event, node) {
    event.preventDefault();
    node.classList.add('animate');
    const height = node.offsetHeight;
    Object.assign(node.style, {
      maxHeight: `${height}px`,
    });

    setTimeout(() => {
      Object.assign(node.style, {
        maxHeight: '0px',
        opacity: 0,
      });

      setTimeout(() => {
        event.detach();
      }, 250);
    }, 0);
  }

  handleAttach(event, node) {
    const clone = node.cloneNode(true);

    Object.assign(clone.style, {
      position: 'absolute',
      top: '-200px',
      left: '-200px',
    });

    node.parentNode.appendChild(clone);
    const height = clone.offsetHeight;
    clone.parentNode.removeChild(clone);
    node.classList.remove('animate');

    Object.assign(node.style, {
      maxHeight: '0px',
      opacity: 0,
    });

    setTimeout(() => {
      node.classList.add('animate');
      Object.assign(node.style, {
        maxHeight: `${height}px`,
        opacity: 1,
      });
    }, 10);
  }
}
