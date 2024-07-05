import { Box, Modal } from "@mui/material";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { EditUserList } from "../type";
import { useFormik } from "formik";
import { loginFormValidationSchema } from "../utils/auth";

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
};

export const UserInput = ({
  label,
  onSubmit,
  buttonLabel,
  setEditUserList,
}: InputProp) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
      status: "",
    },
    validationSchema: loginFormValidationSchema,
    onSubmit: (values) => {
      onSubmit(values.name, values.email, values.gender, values.status);
      setEditUserList(values);

      alert("Successfully");
      handleClose();
    },
  });

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: 2,
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
            <form
              id="myForm"
              className="flex flex-col items-center gap-2"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col items-center">
                <label htmlFor="name">Name: </label>
                <input
                  className="border bg-slate-100 p-2 rounded-md"
                  placeholder="Enter Name"
                  required
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="flex flex-col items-center">
                <label htmlFor="email">Email: </label>
                <input
                  className="border bg-slate-100 p-2 rounded-md"
                  placeholder="Enter Email"
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="gender">Gender: </label>
                <input
                  onChange={formik.handleChange}
                  id="male"
                  name="gender"
                  value="male"
                  type="radio"
                  checked={formik.values.gender === "male"}
                />
                <label htmlFor="male">Male</label>
                <input
                  onChange={formik.handleChange}
                  id="female"
                  name="gender"
                  value="female"
                  type="radio"
                  checked={formik.values.gender === "female"}
                />
                <label htmlFor="female">Female</label>
                {formik.touched.gender && formik.errors.gender ? (
                  <div>{formik.errors.gender}</div>
                ) : null}
              </div>
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="status">Status: </label>
                <input
                  onChange={formik.handleChange}
                  id="active"
                  name="status"
                  value="active"
                  type="radio"
                  checked={formik.values.status === "active"}
                />
                <label htmlFor="active">Active</label>
                <input
                  onChange={formik.handleChange}
                  id="inactive"
                  name="status"
                  value="inactive"
                  type="radio"
                  checked={formik.values.status === "inactive"}
                />
                <label htmlFor="inactive">Inactive</label>
                {formik.touched.status && formik.errors.status ? (
                  <div>{formik.errors.status}</div>
                ) : null}
              </div>
              <button
                disabled={
                  !formik.values.name ||
                  !formik.values.email ||
                  !formik.values.gender ||
                  !formik.values.status
                }
                type="submit"
                className="bg-green-600 mt-2 p-2 rounded-lg text-white font-bold"
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
