import axios from 'axios';
import {
  addTodoRequest,
  addTodoSuccess,
  addTodoError,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoError,
  toggleCompletedRequest,
  toggleCompletedSuccess,
  toggleCompletedError,
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosError,
} from './todos-actions';

// axios.defaults.baseURL = 'http://localhost:4040';

const fetchTodos = () => async dispatch => {
  dispatch(fetchTodosRequest());

  try {
    const { data } = await axios.get('/tasks');

    dispatch(fetchTodosSuccess(data));
  } catch (error) {
    dispatch(fetchTodosError(error));
  }

  // axios
  //   .get('/todos')
  //   .then(({ data }) => dispatch(fetchTodosSuccess(data)))
  //   .catch(error => dispatch(fetchTodosError(error)));
};

const addTodo = description => dispatch => {
  const todo = {
    description,
    completed: false,
  };

  dispatch(addTodoRequest());

  axios
    .post('/tasks', todo)
    .then(({ data }) => dispatch(addTodoSuccess(data)))
    .catch(error => dispatch(addTodoError(error.message)));
};

const deleteTodo = todoId => dispatch => {
  dispatch(deleteTodoRequest());

  axios
    .delete(`/tasks/${todoId}`)
    .then(() => dispatch(deleteTodoSuccess(todoId)))
    .catch(error => dispatch(deleteTodoError(error.message)));
};

const toggleCompleted = ({ id, completed }) => dispatch => {
  const update = { completed };

  dispatch(toggleCompletedRequest());

  axios
    .patch(`/tasks/${id}`, update)
    .then(({ data }) => dispatch(toggleCompletedSuccess(data)))
    .catch(error => dispatch(toggleCompletedError(error.message)));
};

export default {
  fetchTodos,
  addTodo,
  deleteTodo,
  toggleCompleted,
};
