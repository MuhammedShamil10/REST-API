import { Modal } from "@mui/material";
import { SetStateAction, useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";
import SentIcon from "../assets/sent.png";
import remove from "../assets/remove.png";
import { useGetUserComments } from "../api/users/useGetUserComment";

type InputProp = {
  label: string;

  picture: any;
  setInputComments: React.Dispatch<
    SetStateAction<{
      body: string;
    }>
  >;
  inputComments: {
    body: string;
  };
  onSubmit: (body: string) => void;
  handleDeleteComment: (id: number) => void;
  postId: number;
};

export const UserCommentBox = ({
  label,
  postId,
  picture,
  onSubmit,
  inputComments,
  setInputComments,
  handleDeleteComment,
}: InputProp) => {
  const { data: userCommentResponse } = useGetUserComments(postId);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onSubmit(inputComments.body);
    setInputComments({body: ''})
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
      setInputComments({ body: "" });
    }
  }, [open, setInputComments]);

  return (
    <div>
      <div onClick={() => setOpen(true)}>
        <img src={picture} alt="" width={40} />
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className="flex justify-center h-auto w-full p-2 rounded-lg"
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            boxShadow: "lg",
            width: "100%",
          }}
        >
          <ModalClose
            onClick={() => setOpen(false)}
            variant="soft"
            sx={{ m: 1 }}
          />
          <Typography className="p-2" variant="h6" component="h2">
            {label}
          </Typography>
          {userCommentResponse?.map((item) => (
            <div className="flex flex-row justify-between items-center px-9 py-1 overflow-auto">
              <div className="flex flex-col w-full  gap-1 border bg-slate-600 rounded-md pb-1">
                <span className="bg-neutral-500 text-sm text-white rounded-md p-1">
                  User - {item.post_id}
                </span>
                <p className="pt-5 overflow-auto text-white">{item.body}</p>
              </div>
              <img
                onClick={() => handleDeleteComment(item.id)}
                className="cursor-pointer"
                src={remove}
                alt="trash-icon"
                width={20}
              />
            </div>
          ))}
          <div className="flex items-center border rounded-lg absolute bottom-0 w-full p-2">
            <input
              value={inputComments.body}
              ref={inputRef}
              onChange={(e) =>
                setInputComments({ ...inputComments, body: e.target.value })
              }
              className="border-none focus:outline-none w-full py-2 px-3"
              type="text"
            />
            <img
              onClick={handleSubmit}
              className="cursor-pointer p-1"
              src={SentIcon}
              alt=""
              width={25}
            />
          </div>
        </Sheet>
      </Modal>
    </div>
  );
};
