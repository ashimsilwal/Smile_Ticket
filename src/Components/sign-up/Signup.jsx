import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginVideo from "../../Assets/video1.mov";

import axios from "axios";

import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [visible, setVisible] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [signup_email, setSignup_email] = useState({
    message: "",
    success: "",
  });
  const [signup_full_name, setSignup_full_name] = useState({
    message: "",
    success: "",
  });

  const [signup_new_password, setSignup_new_password] = useState({
    message: "",
    success: "",
  });
  const [signup_confirm_password, setSignup_confirm_password] = useState({
    message: "",
    success: "",
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const defaultFunction = (e) => {
    e.preventDefault();
    setSignup_email("");
  };

  const navigate = useNavigate();
  const onSubmitForm = async (data) => {
    try {
      const signupForm = {
        full_name: data.full_name,
        email: data.signup_email,
        password: data.signup_new_password,
        confirmpassword: data.signup_confirm_password,
      };
      const response = await axios.post(
        `http://localhost:8080/api/v1/userregister`,
        signupForm,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      console.log(response);
      if (response.status === 200) {
        setTimeout(() => {
          toast.success("Signup Completed");
        }, 500);
        navigate("/login");
      }
    } catch (err) {
      setIsLoading(false);

      if (err?.response?.data?.errors) {
        console.log(err?.response);
        setError("signup_email", {
          type: "custom",
          message: err?.response?.data?.errors?.email?.message,
        });
        setError("signup_full_name", {
          type: "custom",
          message: err?.response?.data?.errors?.full_name?.message,
        });
        setError("signup_new_password", {
          type: "custom",
          message: err?.response?.data?.errors?.password?.message,
        });
        setError("signup_confirm_password", {
          type: "custom",
          message: err?.response?.data?.errors?.confrimpassword?.message,
        });
        setError("full_name", {
          type: "custom",
          message: err?.response?.data?.errors?.confrimpassword?.message,
        });
      } else {
        setSignup_full_name({
          message: err?.response?.data?.message,
          success: "false",
        });
        setSignup_email({
          message: err?.response?.data?.message,
          success: "false",
        });
        setSignup_new_password({
          message: err?.response?.data?.message,
          success: "false",
        });
        setSignup_confirm_password({
          message: err?.response?.data?.message,
          success: "false",
        });
      }
    }
  };

  return (
    <>
      <div className="bg-[#4fa021] flex justify-center h-[100vh]">
        <ToastContainer />

        <div className="flex border mx-52 my-28 rounded-xl bg-white justify-center items-center">
          <div className="w-[50%]  h-full object-cover border">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={loginVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="w-[50%]">
            <form action="" onSubmit={handleSubmit(onSubmitForm)}>
              <div>
                <div className="  bg-white border-2 border-green-600 px-10 py-30 rounded-lg   ">
                  <div className=" lg:mx-2 md:mx-40 mx-5">
                    <p className="flex justify-center py-6 text-hero text-3xl font-bold ">
                      Sign Up
                    </p>
                    <div className="z-20 ">
                      <div className="py-2">
                        <label
                          htmlFor="fullname"
                          className="text-sm text-gray-600 "
                        >
                          Full Name :
                        </label>
                        <input
                          id="full_name"
                          type="text"
                          placeholder="Full Name"
                          className={`w-full
    ${
      errors?.full_name
        ? "text-xs py-5 px-2 border-2 border-red-600 text-primary placeholder:text-slate-500 focus:border-2 bg-red-50 flex-grow"
        : "text-xs flex bg-white border border-black py-5 px-2 text-primary placeholder:text-slate-500 flex-grow focus:border-purple-500 focus:border-2"
    }`}
                          {...register("full_name", {
                            required: "Full Name is required",
                            onChange: defaultFunction,
                          })}
                        />
                      </div>
                      {console.log("aasasass")}
                      {errors.full_name && (
                        <p className="text-red-500 text-sm ml-2">
                          {errors.full_name.message}
                        </p>
                      )}
                      {signup_full_name?.message && (
                        <p
                          className={
                            signup_full_name?.success === `true`
                              ? " text-sm text-green-400 ml-2"
                              : "text-sm text-red-400 ml-2 my-2"
                          }
                        >
                          {signup_full_name?.message}
                        </p>
                      )}
                    </div>

                    <div className="z-20 ">
                      <div className="py-2">
                        <label
                          htmlFor="email"
                          className="text-sm text-gray-600 "
                        >
                          Email :
                        </label>
                        <input
                          id="email"
                          type="text"
                          placeholder="Email Address"
                          className={`w-full
    ${
      errors?.signup_email
        ? "text-xs py-5 px-2 border-2 border-red-600 text-primary placeholder:text-slate-500 focus:border-2 bg-red-50 flex-grow"
        : "text-xs flex bg-white border border-black py-5 px-2 text-primary placeholder:text-slate-500 flex-grow focus:border-purple-500 focus:border-2"
    }`}
                          {...register("signup_email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Please enter a valid email address",
                            },
                            onChange: defaultFunction,
                          })}
                        />
                      </div>
                      {errors.signup_email && (
                        <p className="text-red-500 text-sm ml-2">
                          {errors.signup_email.message}
                        </p>
                      )}
                      {signup_email?.message && (
                        <p
                          className={
                            signup_email?.success === `true`
                              ? " text-sm text-green-400 ml-2"
                              : "text-sm text-red-400 ml-2 my-2"
                          }
                        >
                          {signup_email?.message}
                        </p>
                      )}
                    </div>

                    <div className="py-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600 "
                      >
                        Password :
                      </label>
                      <div className="relative">
                        <input
                          type={isVisible ? "text" : "password"}
                          placeholder="Password"
                          id="password"
                          className={
                            errors?.signup_new_password
                              ? "text-xs rounded py-5 text-primary placeholder:text-slate-500 pr-10 px-2 border-red-600 border-2 w-full focus:border-2 bg-red-50 flex-grow"
                              : "text-xs flex bg-white text-primary border border-black placeholder:text-slate-500 py-5 px-2 pr-10 w-full flex-grow focus:border-purple-500 focus:border-2"
                          }
                          {...register("signup_new_password", {
                            required: "Password is required",
                            validate: (val) => {
                              if (watch("signup_new_password") !== val) {
                                return "Your passwords do not match";
                              }
                            },
                            pattern: {
                              value:
                                /^(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,50}$/,
                              message:
                                "Password must be at least 8 characters long and contain a number and a special character",
                            },
                          })}
                        />

                        {errors.signup_new_password && (
                          <p className="text-red-500 text-sm ml-2">
                            {errors.signup_new_password.message}
                          </p>
                        )}
                        {signup_new_password?.message && (
                          <p
                            className={
                              signup_new_password?.success === `true`
                                ? " text-sm text-green-400 ml-2"
                                : "text-sm text-red-400 ml-2 my-2"
                            }
                          >
                            {signup_new_password?.message}
                          </p>
                        )}
                        {isVisible === true ? (
                          <div
                            className="absolute cursor-pointer top-0 right-0 mt-5 mr-5 "
                            onClick={(e) => {
                              e.preventDefault();
                              setIsVisible(false);
                            }}
                          >
                            <VscEye />
                          </div>
                        ) : (
                          <>
                            <div
                              className="absolute cursor-pointer top-0 right-0 mt-5 mr-5"
                              onClick={(e) => {
                                e.preventDefault();
                                setIsVisible(true);
                              }}
                            >
                              <VscEyeClosed />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    {/* {errors?.signup_new_password?.type === "required" && (
                  <p className="text-sm mt-1 text-red-500 rounded-lg">
                    Password is required
                  </p>
                )} */}

                    <div className="py-2">
                      <label htmlFor="email" className="text-sm text-gray-600 ">
                        Confirm Password :
                      </label>
                      <div className="relative">
                        <input
                          type={
                            visible === "confirmpassword" ? "text" : "password"
                          }
                          placeholder="Confirm Password"
                          id="confirm_password"
                          className={
                            errors?.signup_confirm_password
                              ? "text-xs rounded py-5 text-primary placeholder:text-slate-500 pr-10 px-2 border-red-600 border-2 w-full focus:border-2 bg-red-50 flex-grow"
                              : "text-xs flex bg-white text-primary border border-black placeholder:text-slate-500 py-5 px-2 pr-10 w-full flex-grow focus:border-purple-500 focus:border-2"
                          }
                          {...register("signup_confirm_password", {
                            required: "Please confirm your password",
                            validate: (val) => {
                              if (watch("signup_new_password") !== val) {
                                return "Your passwords do not match";
                              }
                            },
                          })}
                        />

                        {errors.signup_confirm_password && (
                          <p className="text-red-500 text-sm ml-2">
                            {errors.signup_confirm_password.message}
                          </p>
                        )}
                        {signup_confirm_password?.message && (
                          <p
                            className={
                              signup_confirm_password?.success === `true`
                                ? " text-sm text-green-400 ml-2"
                                : "text-sm text-red-400 ml-2 my-2"
                            }
                          >
                            {signup_confirm_password?.message}
                          </p>
                        )}
                        {visible === "confirmpassword" ? (
                          <div
                            className="absolute cursor-pointer top-0 right-0 mt-5 mr-5"
                            onClick={(e) => {
                              e.preventDefault();
                              setVisible("");
                            }}
                          >
                            <VscEye />
                          </div>
                        ) : (
                          <div>
                            <div
                              className="absolute cursor-pointer top-0 right-0 mt-5 mr-5"
                              onClick={(e) => {
                                e.preventDefault();
                                setVisible("confirmpassword");
                              }}
                            >
                              <VscEyeClosed />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* {errors?.signup_confirm_password?.type === "required" && (
                  <p className="text-sm mt-1 text-start text-red-500 rounded-lg">
                    Confirm Password is required
                  </p>
                )} */}
                    {/* {errors?.signup_confirm_password?.type === "validate" && (
                  <p className="text-sm mt-1 text-start text-red-500 rounded-lg">
                    Confirm Password does not match
                  </p>
                )} */}

                    <div className="py-5">
                      <button
                        type="submit"
                        title="Signup"
                        className={`flex justify-center   `}
                        onClick={toggleModal}
                        disabled={!isValid}
                      />
                      <p className="text-center pr-20 flex gap-x-2 justify-center pt-4 ">
                        Already a member? |{" "}
                        <Link to="/login" className="text-blue-800 ">
                          {" "}
                          Login
                        </Link>
                      </p>
                    </div>
                    <div className="pb-0.5">
                      <div className="flex justify-center items-center w-full bg-[#4fa021] border mb-8">
                        <button
                          className="text-white bg-[#4fa021] p-2 rounded "
                          type="submit "
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
