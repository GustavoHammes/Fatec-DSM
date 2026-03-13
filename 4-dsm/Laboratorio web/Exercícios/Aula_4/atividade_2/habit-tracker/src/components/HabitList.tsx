import React from 'react';
import { Stack, Typography } from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useAppSelector, selectFilteredHabits } from '../store/hooks';
import HabitItem from './HabitItem';

const HabitList: React.FC = () => {
  const habits = useAppSelector(selectFilteredHabits);

  if (habits.length === 0) {
    return (
      <Stack alignItems="center" justifyContent="center" py={6} gap={1} color="text.secondary">
        <ChecklistIcon sx={{ fontSize: 48, opacity: 0.3 }} />
        <Typography variant="body1">Nenhum hábito encontrado.</Typography>
        <Typography variant="body2">Adicione um hábito para começar!</Typography>
      </Stack>
    );
  }

  return (
    <Stack gap={1.5}>
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </Stack>
  );
};

export default HabitList;
