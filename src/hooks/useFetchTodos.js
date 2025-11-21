import { useState, useEffect } from 'react';

export function useFetchTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Не робит' + res.status);
        }
        return res.json();
      })
      .then((data) => {
        const todosWithLocalId = data.slice(0, 10).map((todo) => ({
          ...todo,
          localId: todo.id,
        }));
        setTodos(todosWithLocalId);
      })
      .catch((err) => {
        setError(err.message);
        console.error('Ошибка', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { todos, setTodos, loading, error };
}
