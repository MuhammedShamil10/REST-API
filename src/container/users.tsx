/* eslint-disable no-restricted-globals */
import { useGetUserDetails } from "../api/users/useGetUserList";
import { useEditUser } from "../api/users/useUserEditUser";
import { UserInput } from "../components/inputforEditUser";
import { useDeleteUser } from "../api/users/useDeleteUser";
import { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import a from "../assets/boy.png";
import b from "../assets/woman.png";
import { Outlet } from "react-router-dom";
import { PageContext, PageContextType } from "../components/paginationUserList";

export const Users = () => {
  //@ts-ignore
  const { page, setPage }: PageContextType | undefined =
    useContext(PageContext);

  const [editUserList, setEditUserList] = useState({
    name: "",
    email: "",
    status: "",
    gender: "",
  });
  const { data: userListResponse } = useGetUserDetails(page);
  const { mutateAsync: editUser } = useEditUser();
  const { mutateAsync: deleteUser } = useDeleteUser();

  const handleEditUser = (id: number) => {
    editUser({
      email: editUserList.email,
      name: editUserList.name,
      status: editUserList.status,
      gender: editUserList.gender,
      id,
    });
  };

  const handleNextPage = () => {
    setPage((prev: number) => Math.max(prev + 1));
  };

  const handlePrevPage = () => {
    setPage((prev: number) => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex p-10 flex-wrap gap-10 relative">
      {userListResponse ? (
        userListResponse?.map((option) => (
          <Card style={{ background: "#AFC9E4" }} className="w-[30%] px-2 py-5  rounded-lg">
            {option.gender === "male" ? (
              <CardMedia sx={{ width: 100, height: 100 }} image={a} />
            ) : (
              <CardMedia sx={{ width: 100, height: 100 }} image={b} />
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {option.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {option.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {option.status}
              </Typography>
            </CardContent>
            <CardActions>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (
                      confirm(`Are you sure want to delete user ${option.name}`)
                    ) {
                      deleteUser(option.id);
                    } else {
                      console.log("Canceled");
                    }
                  }}
                  className="font-medium text-white bg-red-600 p-2  border "
                >
                  Delete
                </button>
                <UserInput
                  label="Edit User"
                  buttonLabel="Edit"
                  editUserList={editUserList}
                  setEditUserList={setEditUserList}
                  onSubmit={() => {
                    handleEditUser(option.id);
                  }}
                />
              </div>
            </CardActions>
          </Card>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <div className="flex justify-center gap-5 w-full mt-10 fixed bottom-20 left-0">
        <button
          onClick={handlePrevPage}
          className="font-medium text-white w-32 bg-blue-600 p-2 mx-2 border"
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="font-medium text-white w-32 bg-blue-600 p-2 mx-2 border"
        >
          Next
        </button>
      </div>
      <Outlet />
    </div>
  );
};
