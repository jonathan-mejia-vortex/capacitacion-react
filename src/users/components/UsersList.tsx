import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import User from '../../../model/User';
import "./UsersList.css";

type Props = {
    items: User[]
}

const UsersList = (props: Props) => {
  const IMG_PATH: string = window.location.origin + "/img/pikachu.jpg"

  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((user: User) => (
        <UserItem 
          key={user.id}
          id={user.id}
          // image={user.image}
          image={IMG_PATH}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;
