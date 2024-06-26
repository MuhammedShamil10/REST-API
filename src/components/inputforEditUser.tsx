import { Box, Modal } from "@mui/material";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { EditUserList } from "../type";

type InputProp = {
  onSubmit: (
    name: string,
    email: string,
    gender: string,
    status: string
  ) => void;
  label: string;
  buttonLabel: string;
  setEditUserList: React.Dispatch<React.SetStateAction<EditUserList>>;
  editUserList: EditUserList;
};

export const UserInput = ({
  label,
  onSubmit,
  buttonLabel,
  editUserList,
  setEditUserList,
}: InputProp) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onSubmit(
      editUserList.email,
      editUserList.gender,
      editUserList.name,
      editUserList.status
    );
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="border text-white rounded-md bg-blue-600"
      >
        {buttonLabel}
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {label}
          </Typography>
          <Typography sx={{ mt: 2 }} className="flex flex-col justify-center">
            <form className="flex flex-col items-center gap-2" action="">
              <div className="flex flex-col items-center">
                <label htmlFor="">Name: </label>
                <input
                  className="border bg-slate-100 p-2 rounded-md"
                  placeholder="Enter Name"
                  required
                  type="text"
                  id={editUserList.name}
                  value={editUserList.name}
                  onChange={(e) =>
                    setEditUserList({ ...editUserList, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col items-center">
                <label htmlFor="">email: </label>
                <input
                  className="border bg-slate-100 p-2 rounded-md"
                  placeholder="Enter Email"
                  type="email"
                  id={editUserList.email}
                  value={editUserList.email}
                  onChange={(e) =>
                    setEditUserList({ ...editUserList, email: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="">Gender: </label>
                <input
                  onChange={(e) =>
                    setEditUserList({ ...editUserList, gender: e.target.value })
                  }
                  id="Male"
                  name="age"
                  value="Male"
                  type="radio"
                />
                <label htmlFor="Male">Male</label>
                <input
                  onChange={(e) =>
                    setEditUserList({ ...editUserList, gender: e.target.value })
                  }
                  id="Female"
                  name="age"
                  value="Female"
                  type="radio"
                />
                <label htmlFor="Female">Female</label>
              </div>
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="">Status: </label>
                <input
                  onChange={(e) =>
                    setEditUserList({ ...editUserList, gender: e.target.value })
                  }
                  id="Active"
                  name="Active"
                  value="Active"
                  type="radio"
                />
                <label htmlFor="Active">Active</label>
                <input
                  onChange={(e) =>
                    setEditUserList({ ...editUserList, gender: e.target.value })
                  }
                  id="Inactive"
                  name="Inactive"
                  value="Inactive"
                  type="radio"
                />
                <label htmlFor="Inactive">Inactive</label>
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-green-600 mt-2 p-2 rounded-lg text-white font-bold "
              >
                Submit
              </button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
