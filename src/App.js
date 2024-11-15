import {
  Button,
  TextField,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import "./styles.css";
import { useState } from "react";
import { Status, statusConfigs } from "./utils/constants";
import TaskItem from "./components/TaskItem";

export default function App() {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const _handleChange = ({ target: { value } }) => {
    setTaskTitle(value);
  };

  const _handleSubmit = (e) => {
    e.preventDefault();

    setTasks([
      ...tasks,
      {
        id: Math.random().toString(),
        name: taskTitle,
        description: "",
        status: Status.Pending,
      },
    ]);

    setTaskTitle("");
  };

  const _handleClickStatus = (task) => {
    setTasks((prevTasks) => {
      return prevTasks.map((prevTask) => {
        if (prevTask.id !== task.id) return prevTask;

        const statusConfigIndex = statusConfigs.findIndex(
          (statusConfig) => statusConfig.status === task.status
        );

        const nextStatusConfig = statusConfigs[statusConfigIndex + 1];

        if (!nextStatusConfig) return prevTask;

        return {
          ...prevTask,
          status: nextStatusConfig.status,
        };
      });
    });
  };

  const _handleClickDelete = (task) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((prevTask) => {
        return prevTask.id !== task.id;
      });
    });
  };

  const _handleUpdate = ({ taskId, input }) => {
    setTasks((prevTasks) => {
      return prevTasks.map((prevTask) => {
        if (prevTask.id !== taskId) return prevTask;

        return {
          ...prevTask,
          ...input,
        };
      });
    });
  };

  return (
    <div>
      <form onSubmit={_handleSubmit}>
        <TextField value={taskTitle} onChange={_handleChange} />
        <Button type="submit">Crear Tarea</Button>
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => {
              return (
                <TaskItem
                  onDelete={_handleClickDelete}
                  onUpdate={_handleUpdate}
                  onClickStatus={_handleClickStatus}
                  task={task}
                  key={task.id}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
