import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Header } from './components/Header/Header';
import { Row } from './components/Row/Row';

function App() {
  return (
    <MantineProvider>
      <Notifications position="top-right" limit={3} />
      <Header />
      <Row />
    </MantineProvider>
  );
}

export default App;
