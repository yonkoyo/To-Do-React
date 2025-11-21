import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Header } from './components/Header/Header';
import { Row } from './components/Row/Row';

function App() {
  return (
    <MantineProvider>
      <Header />
      <Row />
    </MantineProvider>
  );
}

export default App;
