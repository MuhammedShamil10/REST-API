import { useState } from "react";
import { useGetUserDetails } from "../api/users/useGetUserList";
import { useEditUser } from "../api/users/useUserEditUser";
import { UserInput } from "../components/inputforEditUser";
import { useCreateUser } from "../api/users/useCreateUser";
import { useDeleteUser } from "../api/users/useDeleteUser";

export const Users = () => {
  const [editUserList, setEditUserList] = useState({
    name: "",
    email: "",
    status: "",
    gender: "",
  });
  const { data: userListResponse } = useGetUserDetails();
  const { mutateAsync: editUser } = useEditUser();
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: deleteUser } = useDeleteUser();
  console.log(userListResponse, "userListResponse");

  const handleEditUser = (id: number) => {
    editUser({
      email: editUserList.email,
      name: editUserList.name,
      status: editUserList.status,
      gender: editUserList.gender,
      id,
    });
  };

  const handleCreateUser = () => {
    createUser({
      email: editUserList.email,
      name: editUserList.name,
      status: editUserList.status,
      gender: editUserList.gender,
    });
  };

  return (
    <div className="flex p-10 flex-wrap gap-10">
      {userListResponse?.map((option) => (
        <div className="flex flex-col items-center justify-center">
          <span>{option.name}</span>
          <span>{option.gender}</span>
          <span>{option.email}</span>
          <span>{option.status}</span>
          <UserInput
            label="Edit User"
            buttonLabel="Edit"
            editUserList={editUserList}
            setEditUserList={setEditUserList}
            onSubmit={() => handleEditUser(option.id)}
          />
          <button
            onClick={() => deleteUser(option.id)}
            className="font-medium text-white bg-red-600 p-2 w-48 border "
          >
            Delete
          </button>
        </div>
      ))}
      <UserInput
        label="Create User"
        buttonLabel="Create"
        editUserList={editUserList}
        setEditUserList={setEditUserList}
        onSubmit={handleCreateUser}
      />
    </div>
  );
};
