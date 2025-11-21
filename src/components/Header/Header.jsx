import { Center, Title } from '@mantine/core';

export function Header() {
  return (
    <Title order={2} ta="center" mt="md">
      To-Do List
      <img src="imgs/to-do-list.png" alt="icon" style={{ width: '30px', marginLeft: '10px' }} />
    </Title>
  );
}
