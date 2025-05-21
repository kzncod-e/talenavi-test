"use client";

import type React from "react";
import type { MouseEvent } from "react";
import { AlertTriangle } from "lucide-react";
import type { User } from "../View/Home";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirmDelete: () => void;
  user: User | null;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirmDelete,
  user,
}) => {
  // Close modal when clicking outside
  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(false);
    }
  };
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      onClick={handleOutsideClick}>
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h2 id="delete-modal-title" className="text-lg font-semibold">
              Delete User
            </h2>
            {user?.avatar && (
              <img
                src={user.avatar}
                alt={user.first_name}
                className="w-10 h-10 rounded-full object-cover border border-gray-200 ml-2"
              />
            )}
          </div>

          <p id="delete-modal-description" className="mb-6 text-gray-600">
            Are you sure you want to delete{" "}
            <span className="font-medium">{user?.first_name}</span>? This action
            cannot be undone.
          </p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black">
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirmDelete();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-600">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
