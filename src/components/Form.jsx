import { useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const Form = ({ addTodo }) => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    state: "pendiente",
    priority: false,
  });

  const { title, description, state, priority } = todo;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El título y la descripción son obligatorios",
      });
    }

    addTodo({
      id: Date.now(),
      ...todo,
      state: state === "completado",
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Tarea agregada correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setTodo({
      ...todo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <form
      className="d-flex flex-column align-items-start gap-3"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Ingrese título de la tarea"
        className="form-control"
        name="title"
        value={title}
        onChange={handleChange}
      />
      <textarea
        className="form-control"
        placeholder="Ingrese la descripción de la tarea"
        name="description"
        value={description}
        onChange={handleChange}
      />
      <div className="form-check">
        <input
          type="checkbox"
          name="priority"
          className="form-check-input"
          id="inputCheck"
          checked={priority}
          onChange={handleChange}
        />
        <label htmlFor="inputCheck">Dar prioridad</label>
      </div>
      <select
        className="form-select"
        name="state"
        value={state}
        onChange={handleChange}
      >
        <option value="pendiente">Pendiente</option>
        <option value="completado">Completada</option>
      </select>
      <button type="submit" className="btn btn-primary">
        Agregar Tarea
      </button>
    </form>
  );
};

Form.propTypes = {
  addTodo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      priority: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default Form;
