"use client";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { SaveToken } from "@/Token/SaveToken";
type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Page = () => {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await axios.post(
      "https://react-interview.crd4lc.easypanel.host/api/register",
      data
    );
    if (response.data.status) {
      console.log(response);
      SaveToken(response.data.data.token);
      redirect("/");
      return route.push("/");
    }
  };
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h3 className="title">Welcome to Microdeft</h3>
          <p className="subtitle">Create Your Account</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <input
                type="text"
                placeholder="User name"
                className="input"
                {...register("name", { required: true })}
              />
            </div>
            {errors.name && (
              <span className="error-message">Username is required</span>
            )}
            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                className="input"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email && (
              <span className="error-message">Email is required</span>
            )}

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                className="input"
                {...register("password", { required: true, minLength: 8 })}
              />
            </div>
            {errors.password?.type === "required" && (
              <p className="error-message">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="error-message">
                Password must be more than or 8 character
              </p>
            )}

            <div className="action-group">
              <button className="button">Registration</button>
            </div>
          </form>
        </div>

        <div className="card-footer">
          <span className="footer-text">Already have an account?</span>
          <Link href={"/login"} className="link">
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
