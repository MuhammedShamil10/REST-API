import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginFormValidationSchema } from "../utils/auth";

export const LoginPage = () => {
  return (
    <div>
      <div>
        <h1 className="mb-6 font-bold font-serif te">Login Page</h1>
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "" }}
          validationSchema={loginFormValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="flex flex-col justify-center items-center">
            <div className="flex flex-col">
              <label htmlFor="firstName">First Name:</label>
              <Field
                className="p-2 border rounded-lg"
                name="firstName"
                type="text"
              />
              <ErrorMessage name="firstName" />
            </div>

            <label htmlFor="lastName">Last Name:</label>
            <Field
              className="p-2 border rounded-lg"
              name="lastName"
              type="text"
            />
            <ErrorMessage name="lastName" />

            <label htmlFor="email">Email Address:</label>
            <Field
              className="p-2 border rounded-lg"
              name="email"
              type="email"
            />
            <ErrorMessage name="email" />

            <button
              className="border p-2 bg-green-600 rounded-lg text-white mt-2"
              type="submit"
            >
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
