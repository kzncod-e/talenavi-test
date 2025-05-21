import type React from "react";
import {
  useState,
  useEffect,
  type MouseEvent,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { X } from "lucide-react";
import type { User } from "../View/Home";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateUser: (updatedUser: User) => void;
  user: User | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  onUpdateUser,
  user,
}) => {
  const [formData, setFormData] = useState<Omit<User, "id">>({
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });

  // Update form data when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        avatar: user.avatar,
      });
    }
  }, [user]);

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

    if (user) {
      const updatedUser: User = {
        ...user,
        ...formData,
      };

      onUpdateUser(updatedUser);
      onClose();
    }
  };

  // Close modal when clicking outside
  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      onClick={handleOutsideClick}>
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">Edit User</h2>
          </div>
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
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
              placeholder="Enter first name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
              placeholder="Enter first name"
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
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
              placeholder="Enter email address"
            />
          </div>

          <div className="mb-4 flex items-center w-full gap-4">
            <div className="flex w-full items-center   gap-3  flex-1">
              {formData.avatar && (
                <img
                  src={formData.avatar}
                  alt={formData.first_name}
                  className="w-20 h-20 mt-5 rounded-full object-cover border border-gray-200"
                />
              )}
              <div className="flex w-full  flex-col">
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Avatar URL
                </label>
                <input
                  type="text"
                  id="avatar"
                  name="avatar"
                  value={formData.avatar || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Enter avatar URL"
                />
              </div>
            </div>
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
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
