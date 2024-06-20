import { useState } from "react";
import { useGetUserDetails } from "../api/users/useGetUserList";
import { useEditUser } from "../api/users/useUserEditUser";
import { EditUser } from "../components/inputforEditUser";

export const Users = () => {
  const [editUserList, setEditUserList] = useState({
    name: "",
    email: "",
    status: "",
    gender: "",
  });
  const { data: userListResponce } = useGetUserDetails();
  const { mutateAsync: editUser } = useEditUser();

  const handleEditUser = (id: number) => {
    editUser({
      email: editUserList.email,
      name: editUserList.name,
      status: editUserList.status,
      gender: editUserList.gender,
      id,
    });
  };

  return (
    <div className="flex p-10 flex-wrap gap-10">
      {userListResponce?.map((option) => (
        <div className="flex flex-col justify-center">
          <span>{option.name}</span>
          <span>{option.gender}</span>
          <span>{option.email}</span>
          <span>{option.status}</span>
          <EditUser
            label="Edit User"
            buttonLabel="Edit"
            editUserList={editUserList}
            setEditUserList={setEditUserList}
            onSubmit={() => handleEditUser(option.id)}
          />
        </div>
      ))}
      <button className="cursor-pointer border p-2 rounded-lg h-full bg-green-600 text-white font-medium">
        Add User
      </button>
    </div>
  );
};
