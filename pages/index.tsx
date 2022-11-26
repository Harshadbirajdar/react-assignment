import { useEffect, useState } from "react";
import Base from "../components/core/Base";
import TableLoading from "../components/skeleton/Table";
import { deleteUserApi, getAllUserApi } from "../service/user";
import useUserStore from "../store/user";
import { User } from "../types";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Button from "../components/core/Button";
import AddUser from "../components/AddUser";
import useDialogStore from "../store/dialog";
import toast from "react-hot-toast";
import EditUser from "../components/EditUser";
const Home = () => {
  const [activeUser, setActiveUser] = useState<string>("");
  const { setAddUserOpen, setEditUserOpen, isEditUserOpen } = useDialogStore();
  const { setAllUser, users } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    getAllUser();
  }, []);

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
  // delete User by id
  const deleteBtnClick = (id: string) => {
    deleteUserApi(id).then((response) => {
      toast.success(response.data.message);
      getAllUser();
    });
  };
  return (
    <Base>
      <div className="p-5 ">
        <AddUser />
        {isEditUserOpen && <EditUser id={activeUser} />}
        <Button
          className="flex w-auto ml-auto mb-5 mr-5"
          onClick={() => {
            setAddUserOpen(true);
          }}
        >
          {" "}
          <PlusCircleIcon className="w-6 mr-2" />
          Add User
        </Button>
        <div className=" overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  First Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Last Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Phone Number
                </th>
                <th scope="col" className="py-3 px-6">
                  Age
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableLoading colLength={5} />
              ) : users.length == 0 ? (
                <tr>
                  <td className="text-center py-6 px-2" colSpan={5}>
                    No User Found
                  </td>
                </tr>
              ) : (
                users.map((data: User) => (
                  <tr
                    key={data._id}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <td
                      scope="row"
                      className="py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data.firstName}
                    </td>
                    <td className="py-4 px-6">{data.lastName}</td>
                    <td className="py-4 px-6">{data.phoneNumber}</td>

                    <td className="py-4 px-6">{data.age}</td>
                    <td className="py-4 px-6 flex">
                      <PencilSquareIcon
                        onClick={() => {
                          // @ts-ignore
                          setActiveUser(data._id);
                          console.log();

                          setEditUserOpen(true);
                        }}
                        className="w-6 mr-3 cursor-pointer text-blue-500"
                      />
                      <TrashIcon
                        onClick={() => {
                          // @ts-ignore
                          deleteBtnClick(data._id);
                        }}
                        className="w-6 cursor-pointer text-red-500"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Base>
  );
};

export default Home;
