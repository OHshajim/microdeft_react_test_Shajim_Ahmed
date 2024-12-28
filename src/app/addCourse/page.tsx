"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

type Inputs = {
  title: string;
  description: string;
  badge_text: string;
  badge_color: string;
  instructor_name: string;
};

const Page = () => {
  const route = useRouter();
  const [cookieValue, setCookieValue] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (name: string) => {
      const match = document?.cookie?.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? match[2] : null;
    };
    const token = getCookie("authToken");
    setCookieValue(token);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    const response = await axios.post(
      "https://react-interview.crd4lc.easypanel.host/api/course",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieValue}`,
        },
      }
    );
    console.log(response);
    if (response.data.status) {
      Swal.fire({
        title: "Success",
        text: "Your course successfully added !!!",
        icon: "success",
        confirmButtonText: "done",
      });
      route.push("/");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h3 className="title">Add Course on Microdeft</h3>
          <p className="subtitle">Give us some basic information</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <input
                type="text"
                placeholder="title"
                className="input"
                {...register("title", { required: true })}
              />
            </div>
            {errors.title && (
              <span className="error-message">Title is required</span>
            )}
            <div className="input-group">
              <textarea
                placeholder="description"
                className="input"
                {...register("description", { required: true })}
              />
            </div>
            {errors.description && (
              <span className="error-message">Description is required</span>
            )}

            <div className="input-group">
              <input
                type="text"
                placeholder="Badge"
                className="input"
                {...register("badge_text", { required: true })}
              />
            </div>
            {errors.badge_text && (
              <p className="error-message">Badge is required</p>
            )}
            <div className="input-group">
              <p>Badge Color</p>
              <input
                type="color"
                placeholder="badge color"
                className="input-color"
                {...register("badge_color", { required: true })}
              />
            </div>
            {errors.badge_color && (
              <p className="error-message">Badge Color is required</p>
            )}
            <div className="input-group">
              <input
                type="text"
                placeholder="instructor_name"
                className="input"
                {...register("instructor_name", { required: true })}
              />
            </div>
            {errors.instructor_name && (
              <p className="error-message">instructor_name Color is required</p>
            )}

            <div className="action-group">
              <button className="button">Registration</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
