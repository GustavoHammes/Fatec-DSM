import React from 'react';
import { Container, Divider, Paper, Stack, Typography } from '@mui/material';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import FilterBar from './components/FilterBar';
import { useAppSelector } from './store/hooks';

const App: React.FC = () => {
  const total = useAppSelector((s) => s.habits.habits.length);
  const done = useAppSelector((s) => s.habits.habits.filter((h) => h.completed).length);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" gap={1.5} mb={3}>
        <SelfImprovementIcon color="primary" sx={{ fontSize: 36 }} />
        <Stack>
          <Typography variant="h5" fontWeight={700}>
            Controle de Hábitos Diários
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {done}/{total} hábitos concluídos hoje
          </Typography>
        </Stack>
      </Stack>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        {/* Botão de adicionar */}
        <HabitForm />

        <Divider sx={{ mb: 2 }} />

        {/* Filtros e limpar */}
        <FilterBar />

        {/* Lista de hábitos */}
        <HabitList />
      </Paper>
    </Container>
  );
};

export default App;
