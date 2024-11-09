'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function Component() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  const MAX_TODO_LENGTH = 100;
  const MAX_TODOS = 50;

  const addTodo = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmedTodo = newTodo.trim();
    
    if (trimmedTodo === '') return;
    if (trimmedTodo.length > MAX_TODO_LENGTH) {
      alert(`Todo must be less than ${MAX_TODO_LENGTH} characters`);
      return;
    }
    if (todos.length >= MAX_TODOS) {
      alert(`Maximum ${MAX_TODOS} todos allowed`);
      return;
    }

    setTodos(prevTodos => [...prevTodos, {
      id: Date.now(),
      text: trimmedTodo,
      completed: false
    }]);
    setNewTodo('');
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">To-Do List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTodo}
            onChange={() => setNewTodo(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTodo()}
          />
          <Button onClick={addTodo}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center space-x-2">
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}
              >
                {todo.text}
              </label>
              <Button variant="ghost" size="icon" onClick={() => removeTodo(todo.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}