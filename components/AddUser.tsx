import useDialogStore from "../store/dialog";
import Button from "./core/Button";
import Input from "./core/Input";
import MyDialog from "./core/MyDailog";
import { useForm } from "react-hook-form";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { User } from "../types";
import { addNewUserApi } from "../service/user";
import toast from "react-hot-toast";
import useUserStore from "../store/user";
import { useState } from "react";
const AddUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      age: "",
    },
  });
  const { setAddUserOpen, isAddUserOpen } = useDialogStore();
  const { setAllUser, users } = useUserStore();

  // Add Button Click
  const onAddClick = (data: User) => {
    setLoading(true);
    if (parseInt(data.age) == 0)
      return setError("age", { message: "Please enter a valid age" });
    addNewUserApi(data)
      .then((response) => {
        setLoading(false);
        const { message, data } = response.data;
        toast.success(message);
        setAddUserOpen(false);
        reset();
        // update new addedd user without given api call
        setAllUser([...users, data]);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <div>
      <MyDialog
        closeModal={() => {
          setAddUserOpen(false);
        }}
        isOpen={isAddUserOpen}
        title="Add User"
      >
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              {...register("firstName", {
                required: {
                  value: true,
                  message: "Please enter a First Name",
                },
              })}
              error={errors.firstName?.message}
              label="First Name *"
            />
            <Input
              {...register("lastName", {
                required: {
                  value: true,
                  message: "Please enter a Last Name",
                },
              })}
              label="Last Name *"
              error={errors.lastName?.message}
            />
          </div>
          <Input
            {...register("phoneNumber", {
              required: {
                value: true,
                message: "Please enter a phone Number",
              },
              minLength: {
                value: 10,
                message: "Please enter a vaild phone Number",
              },
              pattern: {
                value: /^[0-9]*$/,
                message: "Please enter a vaild phone Number",
              },
            })}
            type="tel"
            label="Phone Number *"
            error={errors.phoneNumber?.message}
          />
          <Input
            {...register("age", {
              required: {
                value: true,
                message: "Please enter a age",
              },
              pattern: {
                value: /^[0-9]*$/,
                message: "Please enter a vaild age",
              },
              maxLength: {
                value: 3,
                message: "Please enter a vaild a age",
              },
            })}
            label="Age"
            error={errors.age?.message}
          />
          <Button
            loading={loading}
            className=" flex justify-center"
            onClick={handleSubmit(onAddClick)}
          >
            <PlusCircleIcon className="w-6 mr-2" /> Add User
          </Button>
        </div>
      </MyDialog>
    </div>
  );
};

export default AddUser;
