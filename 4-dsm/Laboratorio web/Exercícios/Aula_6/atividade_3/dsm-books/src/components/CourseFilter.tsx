import { useBooks } from "../context/BooksContext";
import { MenuItem, Select, Typography, Box } from "@mui/material";
import { useState } from "react";

export default function CourseFilter() {
  const { books } = useBooks();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const courses = [...new Set(books.map((book) => book.course))];
  const semesters = [...new Set(books.map((book) => book.semester))].sort((a, b) => a - b);

  const filteredBooks = books.filter((book) => {
    const matchesCourse = selectedCourse === "" || book.course === selectedCourse;
    const matchesSemester = selectedSemester === "" || String(book.semester) === selectedSemester;
    return matchesCourse && matchesSemester;
  });

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Filtrar Livros
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            Disciplina
          </Typography>
          <Select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">Todas</MenuItem>
            {courses.map((course) => (
              <MenuItem key={course} value={course}>
                {course}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            Semestre
          </Typography>
          <Select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">Todos</MenuItem>
            {semesters.map((semester) => (
              <MenuItem key={semester} value={String(semester)}>
                {semester}º Semestre
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      {filteredBooks.length === 0 ? (
        <Typography color="text.secondary">
          Nenhum livro encontrado para os filtros selecionados.
        </Typography>
      ) : (
        filteredBooks.map((book, idx) => (
          <Typography key={idx}>
            {book.title} — {book.course} — {book.semester}º Semestre
          </Typography>
        ))
      )}
    </>
  );
}