import React, { useEffect, useState } from "react";
import SummaryApi from "../common/API";
import { toast } from "react-toastify";
import moment from "moment";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import RoleChangeModal from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 8;

  const fetchAllUser = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();
    // console.log(dataResponse);
    if (dataResponse.success) {
      setAllUser(dataResponse.data);
    } else {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleRoleChange = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleRoleSubmit = async (userId, role) => {
    // Make API call to update the role
    // console.log(newRole)
    const response = await fetch(`${SummaryApi.updateRole.url}/${userId}`, {
      method: SummaryApi.updateRole.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    });

    const dataResponse = await response.json();
    if (dataResponse.success) {
      toast.success("Role updated successfully");
      fetchAllUser();
    } else {
      toast.error(dataResponse.message);
    }
    handleModalClose();
  };

  const totalPages = Math.ceil(allUser.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedUsers = allUser.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-1">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Created Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((el, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {el?.name}
                </th>
                <td className="px-6 py-4">
                  {el?.role}
                </td>
                <td className="px-6 py-4">{el?.email}</td>
                <td className="px-6 py-4">
                  <img
                    src={el?.profilepic}
                    className="w-8 h-8 rounded-full"
                    alt={el?.name}
                  />
                </td>
                <td className="px-6 py-4">
                  {moment(el?.createdAt).format("ll")}
                </td>
                <td className="px-6 py-4 flex space-x-4">
                  <button
                    onClick={() => handleRoleChange(el)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:text-blue-800 dark:hover:text-blue-300 ml-2"
                  >
                    <FaEdit className="text-2xl"/>
                  </button>
                  <Link
                    to={""}
                    className="font-medium text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-300"
                  >
                    <MdDelete className="text-2xl" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-600 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-gray-900">
              {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, allUser.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-gray-900">
              {allUser.length}
            </span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            {currentPage > 1 && (
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    currentPage === index + 1 &&
                    "text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            {currentPage < totalPages && (
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
      {selectedUser && (
        <RoleChangeModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleRoleSubmit}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default AllUsers;
