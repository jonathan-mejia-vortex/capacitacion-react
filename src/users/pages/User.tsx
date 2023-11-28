import React from "react";
import UsersList from "../components/UsersList";
import User from "../../../model/User";

const Users = () => {
  const IMG_PATH: string = window.location.origin + '/img/pikachu.jpg';

  const DUMMY_USERS: User[] = [
    {
      id: "u1",
      image: IMG_PATH,
      name: "User 1",
      places: 40,
    },
    {
      id: "u2",
      image: IMG_PATH,
      name: "User 2",
      places: 1,
    },
  ];

  return <UsersList items={DUMMY_USERS} />;
};

export default Users;
