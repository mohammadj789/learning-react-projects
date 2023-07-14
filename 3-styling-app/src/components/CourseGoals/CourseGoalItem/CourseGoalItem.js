import React from "react";

import "./CourseGoalItem.css";

const CourseGoalItem = (props) => {
  // const [deleteText, setDeleteText] = useState('');

  const deleteHandler = () => {
    // setDeleteText('(Deleted!)');
    props.onDelete(props.id);
  };

  const newLocal = (
    <li className="goal-item" onClick={deleteHandler}>
      {props.children}
    </li>
  );
  return newLocal;
};

export default CourseGoalItem;
