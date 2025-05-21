"use client";

import { useEffect, useMemo, useState } from "react";
import { Edit, Trash2, User, Users } from "lucide-react";
import { OrbitProgress } from "react-loading-indicators";
import AddUserModal from "../components/addUserModal";
import DeleteConfirmationModal from "../components/deleteConfirmationModal";
import EditUserModal from "../components/editUserModal";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
// Mock data for pagination

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
function App() {
  // const [users] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(0);
  const [sortBy, setSortBy] = useState("Name");

  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    if (isLoggedIn) {
      setToken(isLoggedIn);
    }
    if (!isLoggedIn) {
      navigate("/sign-in");
    }
  }, [token]);
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/sign-in");
  };
  const fetctUserr = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://reqres.in/api/users?page=${currentPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "reqres-free-v1",
          },
        }
      );
      const result = await res.json();
      if (res.ok) {
        console.log("User fetched successfully", result);
        setUsers(result.data);
        setTotalPages(result.total_pages);
        setTotalUsers(result.total);
        setUsersPerPage(result.per_page);
      } else {
        console.log("Failed to fetch user", result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetctUserr();
  }, [currentPage]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleAddUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
    setIsModalOpen(false);
  };
  const handleUpdateUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleDeleteUser = (id: number) => {
    setCurrentUser(users.find((user) => user.id === id) || null);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (currentUser) {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== currentUser.id)
      );
    }
    setCurrentUser(null);
    setIsDeleteModalOpen(false);

    toast("🦄 user deleted successfully !", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: () => {
        // console.log("Toast closed");

        setIsDeleteModalOpen(false);
      },
    });
  };
  const filteredAndSortedUsers = useMemo(() => {
    return [...users]
      .filter((user) => {
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        const email = user.email.toLowerCase();
        const query = debouncedQuery.toLowerCase();
        return fullName.includes(query) || email.includes(query);
      })
      .sort((a, b) => {
        if (sortBy === "Name") {
          const fullNameA = `${a.first_name} ${a.last_name}`.toLowerCase();
          const fullNameB = `${b.first_name} ${b.last_name}`.toLowerCase();
          return fullNameA.localeCompare(fullNameB);
        } else if (sortBy === "Email") {
          return a.email.toLowerCase().localeCompare(b.email.toLowerCase());
        }
        return 0;
      });
  }, [users, debouncedQuery, sortBy]);
  return (
    <>
      <NavBar onSignOut={handleSignOut} />
      <div className="flex justify-center mt-12 p-4 sm:p-8 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-lg shadow-md w-full max-w-4xl p-4 sm:p-6">
          {/* Header - Responsive */}
          <header className="flex justify-between items-center mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <Users size={20} />
              <h1 className="text-lg sm:text-xl font-semibold">
                User Management
              </h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-black text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium flex items-center gap-1">
              <span>+</span> Add User
            </button>
          </header>

          {/* Search and Sort - Responsive */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={handleSort}
                className="px-2 py-1 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black">
                <option>Name</option>
                <option>Email</option>
              </select>
            </div>
          </div>
          {isLoading ? (
            <>
              <div className=" flex justify-center items-center">
                <OrbitProgress
                  color="#030303"
                  size="large"
                  text=""
                  textColor=""
                />
              </div>
            </>
          ) : (
            <>
              {/* Table - Responsive */}
              <div className="border border-gray-200 rounded-md overflow-hidden mb-4">
                {/* Desktop Table View */}
                <div className="hidden sm:block">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                        <th className="px-4 py-3 text-left w-20">Avatar</th>
                        <th className="px-4 py-3 text-left">Full Name</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left w-24">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAndSortedUsers.map((user) => (
                        <tr key={user.id} className="border-t border-gray-200">
                          <td className="px-4 py-3">
                            <img
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.avatar}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {user?.first_name} {user.last_name}
                          </td>
                          <td className="px-4 py-3 text-sm">{user.email}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setCurrentUser(user);
                                  setIsEditModalOpen(true);
                                }}
                                className="text-gray-500 hover:text-gray-900">
                                <Edit size={16} />
                              </button>
                              <button
                                className="text-gray-500 hover:text-gray-900"
                                onClick={() => handleDeleteUser(user.id)}>
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="sm:hidden">
                  {filteredAndSortedUsers.map((user) => (
                    <div key={user.id} className="border-t border-gray-200 p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.avatar}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium">
                            {user.first_name} {user.last_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => {
                            setCurrentUser(user);
                            setIsEditModalOpen(true);
                          }}
                          className="text-gray-500 hover:text-gray-900 p-1">
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteUser(user.id);
                          }}
                          className="text-gray-500 hover:text-gray-900 p-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination - Responsive */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm text-gray-500">
                <div className="order-2 sm:order-1">
                  Showing 1 to {usersPerPage} of {totalUsers} users
                </div>
                <div className="flex gap-1 order-1 sm:order-2">
                  <button
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-200 rounded-md disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}>
                    &lt;
                  </button>

                  {/* Show fewer page numbers on mobile */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      // On mobile, show current page and adjacent pages
                      if (window.innerWidth < 640) {
                        return (
                          Math.abs(page - currentPage) <= 1 ||
                          page === 1 ||
                          page === totalPages
                        );
                      }
                      return true;
                    })
                    .map((page, index, array) => {
                      // Add ellipsis
                      if (index > 0 && page - array[index - 1] > 1) {
                        return (
                          <span
                            key={`ellipsis-${page}`}
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-400">
                            ...
                          </span>
                        );
                      }
                      return (
                        <button
                          key={page}
                          className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border rounded-md ${
                            currentPage === page
                              ? "bg-black text-white border-black"
                              : "bg-white text-gray-700 border-gray-200"
                          }`}
                          onClick={() => handlePageChange(page)}>
                          {page}
                        </button>
                      );
                    })}

                  <button
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-200 rounded-md disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}>
                    &gt;
                  </button>
                </div>
              </div>
            </>
          )}
          <AddUserModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddUser={handleAddUser}
          />
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onUpdateUser={handleUpdateUser}
            user={currentUser}
          />
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={setIsDeleteModalOpen}
            onConfirmDelete={handleConfirmDelete}
            user={currentUser}
          />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

export default App;
