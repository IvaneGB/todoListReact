import { useState } from "react";
import { statusConfigByStatus } from "../../utils/constants";
import "../../styles.css";
import { IconButton } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { TextField, TableRow, TableCell } from "@mui/material";

const TaskItem = ({ task, onClickStatus, onDelete, onUpdate }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState(task.name);

  const statusConfig = statusConfigByStatus[task.status];

  const _handleClickStatus = () => {
    onClickStatus?.(task);
  };

  const _handleClickDelete = () => {
    onDelete?.(task);
  };

  const _handleClickEdit = () => {
    setIsEditMode((prev) => !prev);
  };

  const _handleChange = ({ target: { value } }) => {
    setText(value);
  };

  const _handleSubmitChange = () => {
    onUpdate?.({
      taskId: task.id,
      input: {
        name: text,
      },
    });
    setIsEditMode(false);
  };

  return (
    <TableRow
      key={task.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>
        {isEditMode ? (
          <TextField value={text} onChange={_handleChange} />
        ) : (
          <div>{task.name}</div>
        )}
      </TableCell>
      <TableCell align="right">{task.description}</TableCell>

      <TableCell align="right">
        <div
          style={{ background: statusConfig.color }}
          onClick={_handleClickStatus}
        >
          {statusConfig?.label}
        </div>
      </TableCell>

      <TableCell align="right">
        <div className="action">
          {isEditMode ? (
            <IconButton onClick={_handleSubmitChange}>
              <SaveIcon />
            </IconButton>
          ) : (
            <IconButton onClick={_handleClickEdit}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton onClick={_handleClickDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TaskItem;
