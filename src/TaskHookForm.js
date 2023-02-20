import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      people: [],
    },
  });
  const notify = () => toast("Wow so easy!");

  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <div>
      <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-line">
          <label className="input-label" htmlFor="title">
            Başlık
          </label>
          <input
            className="input-text"
            id="title"
            name="title"
            type="text"
            {...register("title", {
              required: "Task başlığı yazmalısınız",
              minLength: 3,
              message: "Task başlığı en az 3 karakter olmalı",
            })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div className="form-line">
          <label className="input-label" htmlFor="description">
            Açıklama
          </label>
          <textarea
            className="input-textarea"
            rows="3"
            id="description"
            name="description"
            {...register("description", {
              required: "Task açıklaması yazmalısınız",
              minLength: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div className="form-line">
          <label className="input-label">İnsanlar</label>
          <div>
            {kisiler.map((p) => (
              <label className="input-checkbox" key={p}>
                <input type="checkbox" name="people" />
                {p}
              </label>
            ))}
          </div>
        </div>

        <div className="form-line">
          <button
            className="submit-button"
            type="submit"
            onClick={notify}
            disabled={!isValid}
          >
            Kaydet
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}
