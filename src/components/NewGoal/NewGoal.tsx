import React, { useState, ChangeEvent, FormEvent } from 'react';

import './NewGoal.css';

interface NewGoalProps {
  onAddGoal: (newGoal: { id: string; text: string }) => void;
}

const NewGoal: React.FC<NewGoalProps> = (props) => {
  const [enteredText, setEnteredText] = useState<string>('');

  const addGoalHandler = (event: FormEvent) => {
    event.preventDefault();

    const newGoal = {
      id: Math.random().toString(),
      text: enteredText,
    };

    setEnteredText('');

    props.onAddGoal(newGoal);
  };

  const textChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredText(event.target.value);
  };

  return (
    <form className="new-goal" onSubmit={addGoalHandler}>
      <input type="text" value={enteredText} onChange={textChangeHandler} />
      <button type="submit">Add Goal</button>
    </form>
  );
};

export default NewGoal;
