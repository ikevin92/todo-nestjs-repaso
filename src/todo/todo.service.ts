import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {

  private todos: Todo[] = [
    { id: 1, description: 'Piedra el alma', done: false },
    { id: 2, description: 'Piedra el tiempo', done: false },
    { id: 3, description: 'Piedra el espacio', done: true },
  ];

  create(createTodoDto: CreateTodoDto): Todo {
    const todo = new Todo();

    todo.id = Math.max(...this.todos.map(todo => todo.id)) + 1;
    todo.description = createTodoDto.description;

    this.todos.push(todo);
    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) throw new NotFoundException(`TODO with #${ id } not found`);

    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {

    const { done, description } = updateTodoDto;

    const todo = this.findOne(id);

    todo.done = done !== undefined && done;
    todo.description = description && description;

    this.todos = this.todos.map(dbTodo => dbTodo.id === id ? todo : dbTodo);

    return todo;
  }

  remove(id: number) {
    return `This action removes a #${ id } todo`;
  }
}
