// TodosRoutes.js
import { Route, Routes } from 'react-router-dom';
import Todos from './Todos';
import CreateTodo from './CreateTodo';

const TodosRoutes = () => {
  return (
    <Routes>
      <Route path="/todos" element={<Todos />} />
      <Route path="/todos/create" element={<CreateTodo />} />
    </Routes>
  );
};

export default TodosRoutes;