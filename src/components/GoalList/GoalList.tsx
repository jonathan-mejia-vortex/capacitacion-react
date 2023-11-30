import React from 'react';

import './GoalList.css';

interface Goal {
  id: string;
  text: string;
}

interface GoalListProps {
  goals: Goal[];
}

const GoalList: React.FC<GoalListProps> = (props) => {
  return (
    <ul className="goal-list">
      {props.goals.map((goal) => {
        return <li key={goal.id}>{goal.text}</li>;
      })}
    </ul>
  );
};

export default GoalList;
