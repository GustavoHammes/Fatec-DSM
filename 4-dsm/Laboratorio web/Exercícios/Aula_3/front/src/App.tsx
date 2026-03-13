import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./redux/store.ts";
import { addUser, incrementAge, removeUser } from "./redux/slices/userSlice.ts";
import type { User } from "./redux/slices/userSlice.ts";
import { useState } from "react";

export default function App() {
  const users = useSelector((state: RootState) => state.userObject.users);
  const [id, setId] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const handleSave = () => {
    const user: User = {
      id,
      name,
      age: parseInt(age),
    };
    dispatch(addUser(user));
    setId((prev: number) => prev + 1);
  };

  const handleAge = (id: number) => {
    dispatch( incrementAge(id) );
  };

  const handleRemove = (e: React.MouseEvent<HTMLSpanElement>, id: number) => {
    e.preventDefault();
    dispatch(removeUser(id));
  };

  return (
    <div>
      <div>
        <div>
          <label htmlFor="name">Nome:</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} />  
        </div>
        <div>
          <label htmlFor="age">Idade:</label>
          <input id="age" value={age} onChange={(e) => setAge(e.target.value)}/>
        </div>
        <div>
          <button onClick={handleSave}>Salvar</button>
        </div>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span onClick={() => handleAge(user.id)} onContextMenu={(e) => handleRemove(e, user.id)}>
              {user.name} - {user.age}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}