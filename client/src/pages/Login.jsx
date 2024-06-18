import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Formik, Field } from "formik";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { MdMovie } from "react-icons/md";
import Button from "../components/Button";
import { setUser, setLoading } from "../redux/features/userSlice";
import { API_END_POINT } from "../constants/constants";

const loginSchema = yup.object().shape({
  email: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialLoginValues = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((store) => store.user.isLoading);

  async function handleOnSubmit(values, onSubmitProps) {
    dispatch(setLoading(true));
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    try {
      const res = await axios.post(
        `${API_END_POINT}/api/v1/user/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(setUser(res.data.user));
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      onSubmitProps.resetForm();
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-10 mt-20">
      <MdMovie className="text-orange mx-auto text-5xl" />
      <Formik
        initialValues={initialLoginValues}
        validationSchema={loginSchema}
        onSubmit={handleOnSubmit}
      >
        {({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:w-3/12 w-full p-8 mx-auto items-start justify-center rounded-2xl bg-darkBlue"
          >
            <h1 className="md:heading-l heading-m text-white mb-2">Sign In</h1>
            <div className="flex flex-col w-full">
              <Field
                type="email"
                placeholder="email"
                name="email"
                className="outline-none p-3 my-1 rounded-sm bg-transparent text-white md:text-base text-sm border-b-2 border-b-grayBlue"
              />
              <Field
                type="password"
                placeholder="password"
                name="password"
                className="outline-none p-3 my-1 rounded-sm bg-transparent text-white md:text-base text-sm border-b-2 border-b-grayBlue"
              />
              <Button
                type={"submit"}
                bgColor={"bg-orange"}
                text={`${isLoading ? "Please wait" : "Sign In"}`}
              />

              <h3 className="md:heading-xs heading-2xs text-gray-400 mx-auto">
                Don't have an account?{" "}
                <Link to="/signup">
                  <span className="text-orange">Sign Up</span>
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

export default Login;
