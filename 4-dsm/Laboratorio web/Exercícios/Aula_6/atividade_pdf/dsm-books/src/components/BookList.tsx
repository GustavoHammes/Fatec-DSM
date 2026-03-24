import { useBooks } from "../context/BooksContext";
import { Card, CardContent, Typography } from "@mui/material";

export default function Booklist() {
  const { books } = useBooks();

  return(
    <>
      {books.map((book, idx) => (
        <Card key={idx} sx={{ marginBottom: 2}}>
          <CardContent>
            <Typography variant="h6">{book.title}</Typography>
            <Typography variant="body2">
              {book.author} - {book.publisher} ({book.year}) | Disciplina: {book.course}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}