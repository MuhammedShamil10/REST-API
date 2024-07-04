import { useFormik } from 'formik';
import * as Yup from 'yup';

export const UserInput = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            gender: '',
            status: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            gender: Yup.string().required('Required'),
            status: Yup.string().required('Required'),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values,null,2));
        }
    })
  return (
    <div>
      <div>
        
      </div>
    </div>
  );
};
