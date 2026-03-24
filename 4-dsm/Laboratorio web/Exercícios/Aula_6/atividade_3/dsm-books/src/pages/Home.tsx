import { Typography } from "@mui/material";
import Booklist from "../components/BookList";

export default function Home() {
  return (
    <>
      <Typography variant="h4" gutterBottom>Referências Bibliográficas</Typography>
      <Booklist />
    </>
  );
}