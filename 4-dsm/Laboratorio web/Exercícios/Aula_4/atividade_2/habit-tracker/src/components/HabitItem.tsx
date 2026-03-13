import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Checkbox,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Habit } from '../types';
import { useAppDispatch } from '../store/hooks';
import { deleteHabit, toggleCompleted } from '../store/habitsSlice';
import HabitForm from './HabitForm';

const CATEGORY_COLORS: Record<string, 'success' | 'primary' | 'secondary' | 'default'> = {
  Saúde: 'success',
  Estudo: 'primary',
  Lazer: 'secondary',
  Outro: 'default',
};

interface Props {
  habit: Habit;
}

const HabitItem: React.FC<Props> = ({ habit }) => {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          opacity: habit.completed ? 0.6 : 1,
          transition: 'opacity 0.2s',
          borderLeft: habit.completed ? '4px solid #4caf50' : '4px solid transparent',
        }}
      >
        <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {/* Checkbox + Nome */}
            <Stack direction="row" alignItems="center" gap={1}>
              <Tooltip title={habit.completed ? 'Desmarcar' : 'Marcar como concluído'}>
                <Checkbox
                  checked={habit.completed}
                  onChange={() => dispatch(toggleCompleted(habit.id))}
                  color="success"
                />
              </Tooltip>
              <Typography
                variant="body1"
                sx={{
                  textDecoration: habit.completed ? 'line-through' : 'none',
                  color: habit.completed ? 'text.secondary' : 'text.primary',
                }}
              >
                {habit.name}
              </Typography>
            </Stack>

            {/* Categoria + Ações */}
            <Stack direction="row" alignItems="center" gap={1}>
              <Chip
                label={habit.category}
                size="small"
                color={CATEGORY_COLORS[habit.category] ?? 'default'}
              />
              <Tooltip title="Editar">
                <IconButton size="small" onClick={() => setEditing(true)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Excluir">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => dispatch(deleteHabit(habit.id))}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {editing && (
        <HabitForm editingHabit={habit} onClose={() => setEditing(false)} />
      )}
    </>
  );
};

export default HabitItem;
