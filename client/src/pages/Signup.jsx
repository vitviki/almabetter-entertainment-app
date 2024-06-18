import { useRef } from "react";
import { Link } from "react-router-dom";
import { MdMovie } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { FaFileUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/features/userSlice";

import Button from "../components/Button";
import { API_END_POINT } from "../constants/constants";

const signUpSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  picture: yup.string(),
});

const initialSignUpValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  picture: "",
};

const Signup = () => {
  const fileRef = useRef();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.user.isLoading);

  async function handleOnSubmit(values, onSubmitProps) {
    dispatch(setLoading(true));
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("profilePicturePath", values.picture.name);

    try {
      const res = await axios.post(
        `${API_END_POINT}/api/v1/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      onSubmitProps.resetForm();
      dispatch(setLoading(false));
    }
  }

  return (
    <div className="flex flex-col gap-10 mt-10">
      <MdMovie className="text-orange mx-auto text-5xl" />
      <Formik
        initialValues={initialSignUpValues}
        validationSchema={signUpSchema}
        onSubmit={handleOnSubmit}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:w-3/12 w-full p-8 mb-36 mx-auto items-start justify-center rounded-2xl bg-darkBlue"
          >
            <h1 className="md:heading-l heading-m text-white mb-2 md:text-left text-center">
              Sign Up
            </h1>
            <div className="flex flex-col w-full">
              <Field
                type="text"
                name="firstName"
                placeholder="First name"
                className="outline-none p-3 my-1 rounded-sm bg-transparent text-white placeholder:text-gray-400 md:text-base text-sm border-b-2 border-b-grayBlue"
              />
              <Field
                type="text"
                placeholder="Last name"
                name="lastName"
                className="outline-none p-3 my-1 rounded-sm bg-transparent text-white placeholder:text-gray-400 md:text-base text-sm border-b-2 border-b-grayBlue"
              />
              <Field
                type="email"
                placeholder="email"
                name="email"
                className="outline-none p-3 my-1 rounded-sm bg-transparent text-white placeholder:text-gray-400 md:text-base text-sm border-b-2 border-b-grayBlue"
              />
              <Field
                type="password"
                placeholder="password"
                name="password"
                className="outline-none p-3 my-1 mb-3 rounded-sm bg-transparent text-white placeholder:text-gray-400 md:text-base text-sm border-b-2 border-b-grayBlue"
              />
              <div className="w-full border-b-2 border-b-grayBlue p-3 my-1 mb-3 flex items-center gap-3">
                <label className=" bg-transparent text-gray-400 md:text-base text-sm ">
                  Profile Image
                </label>
                <input
                  type="file"
                  name="picture"
                  ref={fileRef}
                  onChange={(e) => setFieldValue("picture", e.target.files[0])}
                  hidden
                />
                <FaFileUpload
                  className="text-xl text-gray-400 cursor-pointer"
                  title="Upload profile image"
                  onClick={() => fileRef.current.click()}
                />
              </div>

              <Button
                type={"submit"}
                bgColor={"bg-orange"}
                text={`${isLoading ? "Please wait" : "Sign Up"}`}
              />
              <h3 className="md:heading-xs heading-2xs text-gray-400 mx-auto">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="text-orange">Login</span>
                </Link>
              </h3>
            </div>
          </form>
        )}
      </Formik>
      <Toaster />
    </div>
  );
};

export default Signup;
