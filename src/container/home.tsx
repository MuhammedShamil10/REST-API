import { useGetUserPost } from "../api/users/useGetUsersPost";
import Social from "../assets/social.jpg";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import userProfile from "../assets/profile-user.png";
import comment from "../assets/comments.png";
import { UserCommentBox } from "../components/userComments";
import { useState } from "react";
import { usePostUserComments } from "../api/users/usePostUserComment";
import { useDeleteUserComment } from "../api/users/useDeleteUserComment";

export const Home = () => {
  const [value, setValue] = useState<number | null>(2);
  const { data: userPostResponse } = useGetUserPost();
  const { mutateAsync: createComment } = usePostUserComments();
  const { mutateAsync: deleteUserComment } = useDeleteUserComment();
  const [inputComments, setInputComments] = useState({
    body: "",
  });

  const handleNewComment = (id: number) => {
    createComment({
      body: inputComments.body,
      email: "s@gmail.com",
      name: "sample",
      id: id,
    });
  };

  const handleDeleteComment = (id: number) => {
    deleteUserComment(id);
  };

  return (
    <div className="w-full p-5 overflow-auto">
      <div className="flex flex-col-reverse items-center justify-center gap-5 p-5 w-full">
        <div className="flex flex-col text-center w-2/4">
          <h1 className=" text-[#3b95f6] text-3xl font-semibold font-sans">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </h1>
          <p className="text-slate-900">
            comes from a line in section 1.10.32.
          </p>
        </div>
        <div>
          <img src={Social} alt="social" width={500} />
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-xl rounded-3xl p-2 w-max">
          New post for you
        </h2>
        <div className="flex p-10 flex-wrap gap-10">
          {userPostResponse ? (
            userPostResponse?.map((option) => (
              <Card
                style={{ background: "#AFC9E4" }}
                className="flex flex-col justify-between w-[30%] px-2 py-5"
              >
                <CardContent>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  <Typography
                    className="font-semibold pb-2 underline"
                    variant="body2"
                    color="text.secondary"
                  >
                    <span className="text-xl">{option.title}</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.body}
                  </Typography>
                </CardContent>
                <CardActions className="flex justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <CardMedia
                      sx={{ width: 40, height: 40 }}
                      image={userProfile}
                    />
                    <span className="text-sm">
                      Posted by:
                      <Typography
                        className="text-sm"
                        gutterBottom
                        component="div"
                      >
                        {option.id}
                      </Typography>
                    </span>
                  </div>
                  <div className="cursor-pointer">
                    <UserCommentBox
                      label="Comments"
                      postId={option.id}
                      picture={comment}
                      inputComments={inputComments}
                      setInputComments={setInputComments}
                      handleDeleteComment={handleDeleteComment}
                      onSubmit={() => handleNewComment(option.id)}
                    />
                  </div>
                </CardActions>
              </Card>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};
