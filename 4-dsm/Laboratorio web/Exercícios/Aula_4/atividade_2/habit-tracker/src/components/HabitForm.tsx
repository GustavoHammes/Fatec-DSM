import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '../store/hooks';
import { addHabit, editHabit } from '../store/habitsSlice';
import { Habit } from '../types';

const CATEGORIES = ['Saúde', 'Estudo', 'Lazer', 'Outro'];

interface Props {
  editingHabit?: Habit | null;
  onClose?: () => void;
}

const HabitForm: React.FC<Props> = ({ editingHabit, onClose }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Saúde');
  const [nameError, setNameError] = useState(false);

  // Abre automaticamente quando editingHabit é passado
  useEffect(() => {
    if (editingHabit) {
      setName(editingHabit.name);
      setCategory(editingHabit.category);
      setOpen(true);
    }
  }, [editingHabit]);

  const handleClose = () => {
    setOpen(false);
    setName('');
    setCategory('Saúde');
    setNameError(false);
    onClose?.();
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setNameError(true);
      return;
    }

    if (editingHabit) {
      dispatch(editHabit({ id: editingHabit.id, name: name.trim(), category }));
    } else {
      dispatch(addHabit({ name: name.trim(), category }));
    }

    handleClose();
  };

  return (
    <>
      {!editingHabit && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{ mb: 3 }}
        >
          Adicionar Hábito
        </Button>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editingHabit ? 'Editar Hábito' : 'Novo Hábito'}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Nome do hábito *"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(false);
              }}
              error={nameError}
              helperText={nameError ? 'O nome é obrigatório.' : ''}
              fullWidth
              autoFocus
            />
            <TextField
              select
              label="Categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
            >
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingHabit ? 'Salvar' : 'Adicionar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HabitForm;
