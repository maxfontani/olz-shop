import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";

function NavBarGoToPage({ style, curPage, lastPage, setPage }) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: { page: 1 },
  });

  useLayoutEffect(() => {
    setValue("page", curPage);
  }, [curPage]);

  return (
    <form onSubmit={handleSubmit((data) => setPage(data.page))}>
      <div className={style}>
        <label>
          Страница <strong>{curPage}</strong> из {lastPage} | Перейти на{" "}
        </label>
        <input
          type="number"
          step="1"
          min="1"
          max={lastPage}
          {...register("page", {
            min: {
              value: 1,
              message: "Эта страница вне диапазона.",
            },
            max: {
              value: lastPage,
              message: "Эта страница вне диапазона.",
            },
            valueAsNumber: true,
          })}
        />{" "}
        <button type="submit">Go</button>
        {errors.page && <span>{errors.page.message}</span>}
      </div>
    </form>
  );
}

export default NavBarGoToPage;
