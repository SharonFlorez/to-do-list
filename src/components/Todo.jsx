import PropTypes from "prop-types";

const Todo = ({ todo, deleteTodo, updateTodo }) => {
  const { title, description, state, priority, id } = todo;

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-start">
        <section>
          <h5 className={`${state && "text-decoration-line-through"}`}>
            {title}
          </h5>
          <p className={`${state && "text-decoration-line-through"}`}>
            {description}
          </p>
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteTodo(id)}
            >
              Eliminar
            </button>
            <button
              className="btn btn-sm btn-warning"
              onClick={() => updateTodo(id)}
            >
              Actualizar
            </button>
          </div>
        </section>
        <section className="d-flex flex-column gap-2">
          <span className="badge text-bg-primary">
            {priority && "Prioritario"}
          </span>
          <span className="badge text-bg-success">{state && "Completada"}</span>
        </section>
      </div>
    </li>
  );
};

Todo.propTypes = {
  todo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      priority: PropTypes.bool.isRequired,
    })
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
};

export default Todo;
