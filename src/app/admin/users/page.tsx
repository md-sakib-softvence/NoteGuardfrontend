"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import AnimatedContainer from "@/components/common/AnimatedContainer";
import {
  Search,
  UserPlus,
  Edit3,
  Trash2,
  Eye,
  X,
  Check,
  Ban,
  CheckCircle,
  Shield,
  User,
  Loader2,
  Copy,
  Calendar,
  Mail,
  Tag,
  AlertTriangle,
  Users,
  MessageSquare,
  FileText,
} from "lucide-react";
import {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
  useGetUserPostsQuery,
} from "@/store/Api/User/user.api";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";

const AVAILABLE_INTERESTS = [
  "Technology",
  "Business",
  "Design",
  "Security",
  "Personal Development",
  "Health & Fitness",
];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);

  // Queries & Mutations
  const { data, isLoading } = useGetAllUsersQuery({
    searchTerm: debouncedSearch || undefined,
  });
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserProfileMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPostsModalOpen, setIsPostsModalOpen] = useState(false);

  // Active selected user for Edit, Detail, Delete
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { data: postsData, isLoading: isPostsLoading } = useGetUserPostsQuery(
    selectedUser?._id || "",
    {
      skip: !isPostsModalOpen || !selectedUser?._id,
    }
  );

  // Form states for Add User
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    interests: [] as string[],
  });

  // Form states for Edit User
  const [editUserData, setEditUserData] = useState({
    name: "",
    email: "",
    role: "user",
    status: "active",
  });

  const users: any[] = data?.data?.result || [];

  // Summary statistics
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const inactiveUsers = users.filter((u) => u.status === "inactive").length;
  const adminCount = users.filter(
    (u) => u.role === "admin" || u.role === "superAdmin"
  ).length;

  // Handlers
  const handleOpenAddModal = () => {
    setNewUserData({
      name: "",
      email: "",
      password: "",
      role: "user",
      interests: [],
    });
    setIsAddModalOpen(true);
  };

  const handleToggleInterest = (interest: string) => {
    setNewUserData((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      };
    });
  };

  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserData.name.trim() || !newUserData.email.trim() || !newUserData.password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await createUser({
        name: newUserData.name.trim(),
        email: newUserData.email.trim(),
        password: newUserData.password,
        role: newUserData.role,
        interests: newUserData.interests,
      }).unwrap();

      toast.success(`User "${newUserData.name}" created successfully!`);
      setIsAddModalOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create user.");
    }
  };

  const handleOpenEditModal = (user: any) => {
    setSelectedUser(user);
    setEditUserData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
      status: user.status || "active",
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      await updateUser({
        id: selectedUser._id,
        payload: {
          name: editUserData.name.trim(),
          email: editUserData.email.trim(),
          role: editUserData.role,
          status: editUserData.status,
        },
      }).unwrap();

      toast.success(`User "${editUserData.name}" updated successfully!`);
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update user.");
    }
  };

  const handleOpenDetailModal = (user: any) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const handleOpenPostsModal = (user: any) => {
    setSelectedUser(user);
    setIsPostsModalOpen(true);
  };

  const handleOpenDeleteModal = (user: any) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser._id).unwrap();
      toast.success(`User "${selectedUser.name}" has been removed.`);
      setIsDeleteModalOpen(false);
      setIsDetailModalOpen(false);
      setSelectedUser(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete user.");
    }
  };

  const handleToggleStatus = async (user: any) => {
    const nextStatus = user.status === "active" ? "inactive" : "active";
    try {
      await updateUser({
        id: user._id,
        payload: { status: nextStatus },
      }).unwrap();
      toast.success(`User "${user.name}" status changed to ${nextStatus}.`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update user status");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("User ID copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            User Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create, update, inspect, and control registered accounts across NoteGuard
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 dark:text-white placeholder:text-gray-400 shadow-sm"
            />
          </div>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            Add User
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Total Registered</span>
          <div className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
            {isLoading ? "..." : totalUsers}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            Active Accounts
          </span>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {isLoading ? "..." : activeUsers}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-rose-500 font-medium">Inactive Accounts</span>
          <div className="text-2xl font-bold text-rose-500 mt-1">
            {isLoading ? "..." : inactiveUsers}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-indigo-500 font-medium">Administrators</span>
          <div className="text-2xl font-bold text-indigo-500 mt-1">
            {isLoading ? "..." : adminCount}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <AnimatedContainer
        delay={0.1}
        className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">User Profile</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Interests</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-slate-400">
                    <Loader2 className="w-7 h-7 animate-spin mx-auto mb-3 text-blue-500" />
                    Loading registered users from MongoDB...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-slate-400">
                    <User className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-100 dark:border-blue-800">
                          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                          user.status === "active"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50"
                            : "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-800/50"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            user.status === "active" ? "bg-emerald-500" : "bg-red-500"
                          }`}
                        ></span>
                        {user.status || "active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        {user.role === "superAdmin" || user.role === "admin" ? (
                          <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800/50">
                            <Shield className="w-3 h-3" />
                            {user.role}
                          </span>
                        ) : (
                          <span className="text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                            User
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                      {user.interests && user.interests.length > 0 ? (
                        <div className="flex items-center gap-1 flex-wrap max-w-xs">
                          {user.interests.slice(0, 2).map((interest: string) => (
                            <span
                              key={interest}
                              className="px-2 py-0.5 rounded text-[11px] bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                            >
                              {interest}
                            </span>
                          ))}
                          {user.interests.length > 2 && (
                            <span className="text-[10px] text-gray-400">
                              +{user.interests.length - 2}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-xs">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* Detail button */}
                        <button
                          onClick={() => handleOpenDetailModal(user)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* View Posts button */}
                        <button
                          onClick={() => handleOpenPostsModal(user)}
                          className="p-1.5 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30 cursor-pointer"
                          title="View User Posts"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>

                        {/* Edit button */}
                        <button
                          onClick={() => handleOpenEditModal(user)}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/30 cursor-pointer"
                          title="Edit User"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Toggle Status */}
                        {user.role !== "superAdmin" && (
                          <button
                            onClick={() => handleToggleStatus(user)}
                            className="p-1.5 text-gray-400 hover:text-amber-500 transition-colors rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/30 cursor-pointer"
                            title={
                              user.status === "active" ? "Deactivate User" : "Activate User"
                            }
                          >
                            {user.status === "active" ? (
                              <Ban className="w-4 h-4" />
                            ) : (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            )}
                          </button>
                        )}

                        {/* Delete button */}
                        {user.role !== "superAdmin" && (
                          <button
                            onClick={() => handleOpenDeleteModal(user)}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AnimatedContainer>

      {/* ------------------------------------------------------------- */}
      {/* 1. CREATE USER MODAL                                          */}
      {/* ------------------------------------------------------------- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                    Create New User
                  </h2>
                  <p className="text-xs text-gray-400">
                    Register a new account into the NoteGuard platform
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={newUserData.name}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="user@example.com"
                  value={newUserData.email}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="Min 6 characters"
                    value={newUserData.password}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, password: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Role
                  </label>
                  <select
                    value={newUserData.role}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, role: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 dark:text-white"
                  >
                    <option value="user">User (Standard)</option>
                    <option value="admin">Admin (Manager)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_INTERESTS.map((interest) => {
                    const selected = newUserData.interests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => handleToggleInterest(interest)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                          selected
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-gray-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-blue-400"
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Create User
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. UPDATE USER MODAL                                          */}
      {/* ------------------------------------------------------------- */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                    Edit User: {selectedUser.name}
                  </h2>
                  <p className="text-xs text-gray-400">Update account role, status, or details</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateUserSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editUserData.name}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={editUserData.email}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Role
                  </label>
                  <select
                    value={editUserData.role}
                    disabled={selectedUser.role === "superAdmin"}
                    onChange={(e) =>
                      setEditUserData({ ...editUserData, role: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 dark:text-white disabled:opacity-50"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    {selectedUser.role === "superAdmin" && (
                      <option value="superAdmin">superAdmin</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={editUserData.status}
                    disabled={selectedUser.role === "superAdmin"}
                    onChange={(e) =>
                      setEditUserData({ ...editUserData, status: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 dark:text-white disabled:opacity-50"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. USER DETAILS MODAL ("Detail")                              */}
      {/* ------------------------------------------------------------- */}
      {isDetailModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                User Details
              </h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Header profile info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl font-bold border border-blue-200 dark:border-blue-800">
                  {selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                    {selectedUser.name}
                  </h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                    <Mail className="w-3.5 h-3.5" />
                    {selectedUser.email}
                  </p>
                </div>
              </div>

              {/* Data fields */}
              <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">User ID</span>
                  <button
                    onClick={() => copyToClipboard(selectedUser._id)}
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-mono hover:underline cursor-pointer"
                    title="Click to copy ID"
                  >
                    {selectedUser._id}
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Role</span>
                  <span className="font-semibold capitalize text-slate-800 dark:text-white">
                    {selectedUser.role}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Account Status</span>
                  <span
                    className={`font-semibold uppercase tracking-wider px-2 py-0.5 rounded text-[10px] ${
                      selectedUser.status === "active"
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                        : "bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400"
                    }`}
                  >
                    {selectedUser.status || "active"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Member Since
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {selectedUser.createdAt
                      ? new Date(selectedUser.createdAt).toLocaleString()
                      : "N/A"}
                  </span>
                </div>
              </div>

              {/* Interests section */}
              <div>
                <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-blue-500" />
                  Chosen Interests
                </span>
                {selectedUser.interests && selectedUser.interests.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedUser.interests.map((interest: string) => (
                      <span
                        key={interest}
                        className="text-xs px-2.5 py-1 bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-300 rounded-lg border border-blue-100 dark:border-slate-700"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">No interests recorded.</p>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    handleOpenEditModal(selectedUser);
                  }}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Details
                </button>
                {selectedUser.role !== "superAdmin" && (
                  <button
                    onClick={() => {
                      setIsDetailModalOpen(false);
                      handleOpenDeleteModal(selectedUser);
                    }}
                    className="text-xs font-medium text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Account
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. DELETE CONFIRMATION MODAL                                  */}
      {/* ------------------------------------------------------------- */}
      {isDeleteModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xl max-w-sm w-full p-6 space-y-4 animate-in fade-in zoom-in duration-200 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Delete User Account?
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Are you sure you want to permanently delete{" "}
                <span className="font-semibold text-slate-800 dark:text-white">
                  &ldquo;{selectedUser.name}&rdquo;
                </span>{" "}
                ({selectedUser.email})? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-sm"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete User
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. USER POSTS MODAL                                           */}
      {/* ------------------------------------------------------------- */}
      {isPostsModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                    {selectedUser.name}&apos;s Posts
                  </h2>
                  <p className="text-xs text-gray-400">View all content authored by this user</p>
                </div>
              </div>
              <button
                onClick={() => setIsPostsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {isPostsLoading ? (
                <div className="py-12 text-center text-slate-400 flex flex-col items-center">
                  <Loader2 className="w-8 h-8 animate-spin mb-3 text-emerald-500" />
                  Loading posts...
                </div>
              ) : !postsData?.data || postsData.data.length === 0 ? (
                <div className="py-12 text-center text-slate-400 flex flex-col items-center">
                  <FileText className="w-10 h-10 mb-3 opacity-30 text-slate-400" />
                  <p>No posts found for this user.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {postsData.data.map((post: any) => (
                    <div
                      key={post._id}
                      className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-700"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-semibold text-slate-800 dark:text-white text-sm">
                          {post.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 shrink-0">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                        {post.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-100 dark:border-slate-800 text-right shrink-0">
              <button
                onClick={() => setIsPostsModalOpen(false)}
                className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
