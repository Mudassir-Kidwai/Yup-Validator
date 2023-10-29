import { useForm } from "react-hook-form";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import FormSchema from "../validations/FormSchema";

const cars = [
  {
    value: "1",
    label: "Volvo",
  },
  {
    value: "2",
    label: "Audi",
  },
  {
    value: "3",
    label: "Toyota",
  },
  {
    value: "4",
    label: "Ferrari",
  },
];

export const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // api call
  };

  const handleCars = (e) => {
    const id = e.value;
    setValue("car_id", id);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="ex1">
        {/* ******************************************************************** */}
        {/* Field String, Email and Number */}
        <input
          className="ex2"
          type="text"
          placeholder="Full Name..."
          {...register("full_name")}
        />
        <p>{errors.full_name?.message}</p>
        <input
          {...register("email")}
          className="ex2"
          type="text"
          placeholder="Email..."
        />
        <p>{errors.email?.message}</p>
        <input
          {...register("age")}
          className="ex2"
          type="number"
          placeholder="Age..."
        />
        <p>{errors.age?.message}</p>
        {/* ******************************************************************** */}
        {/* Typical Regex Example */}
        <input
          {...register("password")}
          className="ex2"
          type="password"
          placeholder="Password..."
        />
        <p>{errors.password?.message}</p>
        <input
          {...register("confirm_password")}
          className="ex2"
          type="password"
          placeholder="Confirm Password..."
        />
        <p>{errors.confirm_password?.message}</p>

        {/* ******************************************************************** */}
        {/* Conditional Validation */}
        <Select
          {...register("car_id")}
          className="ex2"
          placeholder="Select a car"
          onChange={(e) => {
            handleCars(e);
          }}
          options={cars}
        />
        <p>{errors.car_id?.message}</p>
        <input
          {...register("first_field")}
          className="ex2"
          type="text"
          placeholder="First Field"
        />
        <p>{errors.first_field?.message}</p>
        <input
          {...register("second_field")}
          className="ex2"
          type="text"
          placeholder="Second Field"
        />
        <p>{errors.second_field?.message}</p>
        <input
          {...register("third_field")}
          className="ex2"
          type="text"
          placeholder="Third Field"
        />
        <p>{errors.third_field?.message}</p>
        <input
          {...register("fourth_field")}
          className="ex2"
          type="text"
          placeholder="Fourth Field"
        />
        <p>{errors.fourth_field?.message}</p>

        {/* ******************************************************************** */}
        {/* custom validation example */}
        <input
          {...register("amount")}
          className="ex2"
          placeholder="Add Amount"
        />
        <p>{errors.amount?.message}</p>
      </div>
      <input type="submit" />
    </form>
  );
};
