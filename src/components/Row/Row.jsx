import { TextInput, Button, Stack, Group, Checkbox } from '@mantine/core';
import { useState } from 'react';

export function Row() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    if (typeof inputValue === 'string' && inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        title: inputValue,
        completed: false,
      };
      setTodos((prev) => [...prev, newTodo]);
      setInputValue('');
    }
  };

  const toggleCompleted = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <Stack p="md" w={400} mx="auto">
      <TextInput
        value={inputValue}
        onChange={(event) => setInputValue(event.currentTarget.value)}
        placeholder="Add your task"
      />
      <Button onClick={handleAddTodo}>Add</Button>
      <div>
        {todos.map((todo) => (
          <Group key={todo.id} gap="xs" mb="xs">
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
              label={
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.title}
                </span>
              }
            />
            <Button
              size="compact-xs"
              variant="subtle"
              color="gray"
              onClick={() => removeTodo(todo.id)}
            >
              X
            </Button>
          </Group>
        ))}
      </div>
    </Stack>
  );
}
