import { TextInput, Button, Stack, Group, Checkbox, Center, Loader, Alert } from '@mantine/core';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useFetchTodos } from '../../hooks/useFetchTodos';

export function Row() {
  const [inputValue, setInputValue] = useState('');
  const { todos, setTodos, loading, error } = useFetchTodos();

  const handleAddTodo = () => {
    if (!inputValue) return;
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: inputValue,
        completed: false,
        userId: 1,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Не удалось создать задачку');
        }
        return res.json();
      })
      .then((newTodo) => {
        setTodos((prev) => [{ ...newTodo, localId: Date.now() }, ...prev]);
        setInputValue('');
        notifications.show({
          title: '✅ Успех',
          message: 'Задача добавлена',
          color: 'green',
          autoClose: 2000,
        });
      })
      .catch((err) => {
        console.error('Ошибка', err);
        notifications.show({
          title: '❌ Ошибка',
          message: 'Не удалось добавить задачу',
          color: 'red',
          autoClose: 3000,
        });
      });
  };

  const toggleCompleted = (localId, apiId, currentCompleted) => {
    const newCompleted = !currentCompleted;

    fetch(`https://jsonplaceholder.typicode.com/todos/${apiId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: newCompleted }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Не удалось обновить');
        return res.json();
      })
      .then((updatedTodo) => {
        setTodos((prev) =>
          prev.map((todo) =>
            todo.localId === localId ? { ...todo, completed: updatedTodo.completed } : todo,
          ),
        );
        notifications.show({
          title: updatedTodo.completed ? '✅ Выполнено' : '↩️ Отменено',
          message: updatedTodo.completed
            ? 'Задача отмечена как выполненная'
            : 'Задача возвращена в работу',
          color: updatedTodo.completed ? 'teal' : 'blue',
          autoClose: 1500,
        });
      })
      .catch((err) => {
        console.error('Ошибка обновления', err);
      });
  };

  const removeTodo = (localId, apiId) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${apiId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Не удалось удалить');
        return res.json();
      })
      .then(() => {
        setTodos((prev) => prev.filter((todo) => todo.localId !== localId));
        notifications.show({
          title: '✅ Удалено',
          message: 'Задача удалена',
          color: 'gray',
          autoClose: 1500,
        });
      })
      .catch((err) => {
        console.error('Ошибка', err);
      });
  };

  if (loading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert color="red" title="Ошибка">
        {error}
      </Alert>
    );
  }

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
          <Group key={todo.localId} gap="xs" mb="xs">
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.localId, todo.id, todo.completed)}
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
              onClick={() => removeTodo(todo.localId, todo.id)}
            >
              X
            </Button>
          </Group>
        ))}
      </div>
    </Stack>
  );
}
