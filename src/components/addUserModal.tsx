"use client";

import type React from "react";

import {
  useState,
  type MouseEvent,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { X } from "lucide-react";
import type { User } from "../View/Home";
import { toast } from "react-toastify";
interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: User) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onAddUser,
}) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar: null,
  });

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
  };

  // Validate form

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Generate a random avatar if none provided
    const newUser: User = {
      ...formData,
      id: Date.now(),
      avatar:
        formData.avatar ||
        `/avatars/avatar${Math.floor(Math.random() * 4) + 1}.png`,
    };

    onAddUser(newUser);
    toast("🦄 Success create New user !", {
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
        onClose();
      },
    });
    setFormData({ first_name: "", last_name: "", email: "", avatar: null });
    onClose();
  };

  // Close modal when clicking outside
  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70  flex items-center justify-center p-4 z-50"
      onClick={handleOutsideClick}>
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Add New User</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1">
              First name
            </label>
            <input
              type="text"
              id="name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
              placeholder="Enter full name"
            />
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1">
              Last name
            </label>
            <input
              type="text"
              id="name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
              placeholder="Enter full name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
              placeholder="Enter email address"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700 mb-1">
              Avatar URL (Optional)
            </label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              value={formData.avatar || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter avatar URL or leave empty for random avatar"
            />
            <p className="mt-1 text-xs text-gray-500">
              Leave empty to use a random avatar
            </p>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black disabled:bg-gray-400 text-white rounded-md text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-black"
              disabled={
                !formData.first_name ||
                !formData.last_name ||
                !formData.email ||
                !formData.avatar
              }>
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
