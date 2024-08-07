import React, { useEffect, useState } from "react";
import { connectWeb3, getTasks } from "../contractFunctions";
import { Link } from "react-router-dom";
import "../App.css";
import successIcon from "./success-green-check-mark-icon.png"; // Import the image

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { accounts, contract } = await connectWeb3();
        const tasks = await getTasks(contract, accounts[0]);
        setTasks(tasks);
      } catch (error) {
        console.log(error.message);
        setError("kindly Login to metamask !");
      }
    };
    init();
  }, []);

  if (error) {
    return <div className="container">Welcome : {error}</div>;
  }

  return (
    <div className="container">
      <h1>All Tasks</h1>
      <Link to="/create" className="link">
        Create New Task
      </Link>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <div className="task-details">
              <p>Task: {task.task}</p>
              <p>
                Deadline:{" "}
                {new Date(task.deadline.toString() * 1000).toLocaleString(
                  "en-GB"
                )}
              </p>
              <p>Completed: {task.isCompleted ? "Yes" : "No"}</p>
              {!task.isCompleted && (
                <Link to={`/edit/${index}`} className="link">
                  Edit Task
                </Link>
              )}
            </div>
            {task.isCompleted && (
              <img src={successIcon} alt="Completed" className="success-icon" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
