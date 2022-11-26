import useDialogStore from "../store/dialog";
import Button from "./core/Button";
import Input from "./core/Input";
import MyDialog from "./core/MyDailog";
import { useForm } from "react-hook-form";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { User } from "../types";
import {
  getAllUserApi,
  getUserByIdApi,
  updateUserByIdApi,
} from "../service/user";
import toast from "react-hot-toast";
import useUserStore from "../store/user";
import { useEffect, useState } from "react";
import UserFormLoading from "./skeleton/UserForm";
const EditUser = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      age: "",
    },
  });
  const { isEditUserOpen, setEditUserOpen } = useDialogStore();
  const { setAllUser } = useUserStore();

  // update Button Click
  const onUpdateClick = (data: User) => {
    setLoading(true);
    if (parseInt(data.age) == 0)
      return setError("age", { message: "Please enter a valid age" });
    updateUserByIdApi(id, data)
      .then((response) => {
        setLoading(false);
        toast.success("User updated successfully");
        getAllUser();
        setEditUserOpen(false);
        reset();
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const getUserById = () => {
    setUserLoading(true);
    getUserByIdApi(id)
      .then((response) => {
        console.log(response.data);
        const { data }: { data: User } = response.data;
        Object.keys(data).map((key) => {
          // @ts-ignore
          setValue(key, data[key]);
        });
        setUserLoading(false);
      })
      .catch(() => {
        setEditUserOpen(false);
        setUserLoading(false);
      });
  };
  // get All User
  const getAllUser = () => {
    getAllUserApi()
      .then((response) => {
        console.log(response.data.data);
        setLoading(false);

        setAllUser(response.data.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getUserById();
  }, []);
  return (
    <div>
      <MyDialog
        closeModal={() => {
          setEditUserOpen(false);
        }}
        isOpen={isEditUserOpen}
        title="Add User"
      >
        {userLoading ? (
          <UserFormLoading />
        ) : (
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
              onClick={handleSubmit(onUpdateClick)}
            >
              <ArrowPathIcon className="w-6 mr-2" /> Update User
            </Button>
          </div>
        )}
      </MyDialog>
    </div>
  );
};

export default EditUser;
