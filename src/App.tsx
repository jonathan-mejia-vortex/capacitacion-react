import React, { useState } from 'react';

import GoalList from './components/GoalList/GoalList';
import NewGoal from './components/NewGoal/NewGoal';
import './App.css';

interface Goal {
  id: string;
  text: string;
}

const App: React.FC = () => {
  const [courseGoals, setCourseGoals] = useState<Goal[]>([
    { id: 'cg1', text: 'Finish the Course' },
    { id: 'cg2', text: 'Learn all about the Course Main Topic' },
    { id: 'cg3', text: 'Help other students in the Course Q&A' }
  ]);

  const addNewGoalHandler = (newGoal: Goal) => {
    setCourseGoals((prevCourseGoals) => [...prevCourseGoals, newGoal]);
  };

  return (
    <div className="course-goals">
      <h2>Course Goals</h2>
      <NewGoal onAddGoal={addNewGoalHandler} />
      <GoalList goals={courseGoals} />
    </div>
  );
};

export default App;

