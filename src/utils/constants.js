import { keyBy } from "es-toolkit";

export const Status = {
  Pending: "PENDING",
  Doing: "DOING",
  Done: "DONE",
};

export const statusConfigs = [
  {
    status: Status.Pending,
    label: "Pendiente",
    color: "#F43F58",
  },
  {
    status: Status.Doing,
    label: "En progreso",
    color: "#FBB306",
  },
  {
    status: Status.Done,
    label: "Completado",
    color: "#38DAA3",
  },
];

export const statusConfigByStatus = keyBy(
  statusConfigs,
  ({ status }) => status
);
