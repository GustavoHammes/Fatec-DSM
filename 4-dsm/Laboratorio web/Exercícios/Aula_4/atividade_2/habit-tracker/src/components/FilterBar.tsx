import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector, selectFilter } from '../store/hooks';
import { setFilter, clearCompleted } from '../store/habitsSlice';
import { Category } from '../types';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

const CATEGORIES: Category[] = ['Todas', 'Saúde', 'Estudo', 'Lazer', 'Outro'];

const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(selectFilter);
  const habits = useAppSelector((s) => s.habits.habits);
  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      justifyContent="space-between"
      gap={2}
      mb={2}
    >
      {/* Filtros por categoria */}
      <Stack direction="row" flexWrap="wrap" gap={1}>
        <Typography variant="body2" color="text.secondary" alignSelf="center">
          Filtrar:
        </Typography>
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            size="small"
            variant={currentFilter === cat ? 'contained' : 'outlined'}
            onClick={() => dispatch(setFilter(cat))}
          >
            {cat}
          </Button>
        ))}
      </Stack>

      {/* Limpar concluídos */}
      <Button
        size="small"
        color="error"
        variant="outlined"
        startIcon={<DeleteSweepIcon />}
        disabled={completedCount === 0}
        onClick={() => dispatch(clearCompleted())}
      >
        Limpar concluídos ({completedCount})
      </Button>
    </Stack>
  );
};

export default FilterBar;
