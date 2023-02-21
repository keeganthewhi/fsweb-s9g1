import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      people: [],
    },
  });

  // const onSubmit = (data) => {
  //     submitFn({
  //       ...data,
  //       id: nanoid(5),
  //       status: "yapılacak",
  //     });
  //     basariliEklemeToastify();
  //     console.log(data);
  // };
  console.log(errors);

  function mySubmit(data) {
    console.log(data);
    toast("Wow so easy!");
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    // e.preventDefault();
    // submitFn({
    //   ...formData,
    //   id: nanoid(5),
    //   status: "yapılacak",
    // });
    // setFormData({
    //   title: "",
    //   description: "",
    //   people: [],
    // });
  }

  return (
    <div>
      <form className="taskForm" onSubmit={handleSubmit(mySubmit)}>
        <div className="form-line">
          <label className="input-label" htmlFor="title">
            Başlık
          </label>
          <input
            className="input-text"
            id="title"
            type="text"
            {...register("title", {
              required: "Task başlığı yazmalısınız",
              minLength: {
                value: 3,
                message: "Task başlığı en az 3 karakter olmalı",
              },
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
            {...register("description", {
              required: "Task açıklaması yazmalısınız",
              minLength: {
                value: 10,
                message: "Task açıklaması en az 10 karakter olmalı",
              },
            })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div className="form-line">
          <label className="input-label">İnsanlar</label>
          <div>
            {kisiler.map((p) => (
              <label className="input-checkbox" key={p}>
                <input
                  type="checkbox"
                  {...register("people", {
                    required: "Lütfen en az 1 kişi seçin",
                    // required: {
                    //   value: true,
                    //   message: "En az 1 kişi seçin",
                    // },
                    validate: {
                      maxKisi: (kisiler) =>
                        kisiler.length <= 3 || "En fazla 3 kişi seçebilirsiniz",
                    },
                  })}
                  value={p}
                />
                {p}
              </label>
            ))}
          </div>
          {errors.people && <p>{errors.people.message}</p>}
        </div>

        <div className="form-line">
          <button className="submit-button" type="submit" disabled={!isValid}>
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
