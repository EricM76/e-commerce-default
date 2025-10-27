import React, { useState } from 'react';
import { Page } from '../../App';
import { User } from '../../types';
import DashboardHeader from './DashboardHeader';
import UserFormModal from './UserFormModal';
import EditIcon from '../icons/EditIcon';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';

interface UsersManagementPageProps {
  users: User[];
  onAdd: (user: Omit<User, 'id'>) => void;
  onUpdate: (user: User) => void;
  onDelete: (userId: number) => void;
  onNavigate: (page: Page) => void;
}

const UsersManagementPage: React.FC<UsersManagementPageProps> = ({ users, onAdd, onUpdate, onDelete, onNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleOpenAddModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDelete(userId);
    }
  };

  const handleFormSubmit = (userData: User | Omit<User, 'id'>) => {
    if ('id' in userData) {
      onUpdate(userData as User);
    } else {
      onAdd(userData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DashboardHeader title="Manage Users" onNavigate={onNavigate}>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center justify-center gap-x-2 rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 transition-colors"
          >
            <PlusIcon />
            Add User
          </button>
        </DashboardHeader>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 responsive-table">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td data-label="Name" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td data-label="Email" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td data-label="Actions" className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center justify-end md:justify-start space-x-4">
                        <button onClick={() => handleOpenEditModal(user)} className="text-indigo-600 hover:text-indigo-900"><EditIcon /></button>
                        <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900"><TrashIcon /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <UserFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleFormSubmit}
            userToEdit={editingUser}
        />
      )}
    </div>
  );
};

export default UsersManagementPage;
