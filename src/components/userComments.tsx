import { Modal } from "@mui/material";
import { SetStateAction, useState } from "react";
import Typography from "@mui/material/Typography";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";
import SentIcon from "../assets/sent.png";
import { UserGetPostComments } from "../api/type";

type InputProp = {
  label: string;
  userCommentResponse: UserGetPostComments | undefined;
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
};

export const UserCommentBox = ({
  label,
  picture,
  setInputComments,
  inputComments,
  userCommentResponse,
  onSubmit,
}: InputProp) => {
  const [open, setOpen] = useState(false);
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onSubmit(inputComments.body);
  };

  console.log(userCommentResponse, "getUserComments");

  return (
    <div>
      <div onClick={() => setOpen(true)}>
        <img src={picture} alt="" width={40} />
      </div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            onClick={() => setOpen(false)}
            variant="soft"
            sx={{ m: 1 }}
          />
          <Typography variant="h6" component="h2">
            {label}
          </Typography>
          <hr />
          {userCommentResponse?.map((item) => (
            <Typography className="pt-5 overflow-auto">{item.body}</Typography>
          ))}
          <div className="flex items-center border rounded-lg">
            <input
              onChange={(e) =>
                setInputComments({ ...inputComments, body: e.target.value })
              }
              className="border-none focus:outline-none w-full py-2 px-3"
              type="text"
            />
            <img
              onClick={handleSubmit}
              className="cursor-pointer"
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
