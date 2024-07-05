/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import { useEditUser } from "../api/users/useUserEditUser";
import { UserInput } from "../components/inputforEditUser";
import { useDeleteUser } from "../api/users/useDeleteUser";
import { useGetSingleUserDetails } from "../api/users/useGetSingleUser";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import a from "../assets/boy.png";
import b from "../assets/woman.png";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export const SingleUser = () => {
  const { userId } = useParams();
  const id = Number(userId);

  const navigate = useNavigate();

  const [editUserList, setEditUserList] = useState({
    name: "",
    email: "",
    status: "",
    gender: "",
  });

  const { data: userResponse, refetch } = useGetSingleUserDetails(id);

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [refetch, userId]);

  useEffect(() => {
    refetch();
  });

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

  return (
    <>
      <div className="flex p-10 flex-wrap gap-10">
        {userResponse ? (
          <Card style={{ background: "#AFC9E4" }} className="w-[40%] p-5">
            {userResponse.gender === "male" ? (
              <CardMedia sx={{ width: 100, height: 100 }} image={a} />
            ) : (
              <CardMedia sx={{ width: 100, height: 100 }} image={b} />
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {userResponse.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userResponse.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userResponse.status}
              </Typography>
            </CardContent>
            <CardActions>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigate("/admin/1/users/all");
                    if (
                      confirm(
                        `Are you sure want to delete user ${userResponse.name}`
                      )
                    ) {
                      deleteUser(userResponse.id);
                    } else {
                      console.log("Canceled");
                    }
                  }}
                  className="font-medium text-white bg-red-600 p-2 border"
                >
                  Delete
                </button>
                <UserInput
                  label="Edit User"
                  buttonLabel="Edit"
                  setEditUserList={setEditUserList}
                  onSubmit={() => {
                    handleEditUser(userResponse.id);
                    refetch();
                  }}
                />
              </div>
            </CardActions>
          </Card>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};
