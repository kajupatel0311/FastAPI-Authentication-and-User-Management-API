import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import type { UserProfile } from "../../types/user";

import UserSearch from "../../components/users/UserSearch";
import UsersTable from "../../components/users/UsersTable";
import UserPagination from "../../components/users/UserPagination";
import EditUserModal from "../../components/users/EditUserModal";
import DeleteUserModal from "../../components/users/DeleteUserModal";

import {
  getUsers,
  updateUser,
  deleteUser,
} from "../../api/userApi";

function UsersPage() {

  const [users, setUsers] =
    useState<UserProfile[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [page, setPage] =
    useState(1);

  const [total, setTotal] =
    useState(0);

  const [selectedUser, setSelectedUser] =
    useState<UserProfile | null>(null);

  const [openEditModal, setOpenEditModal] =
    useState(false);

  const [openDeleteModal, setOpenDeleteModal] =
    useState(false);

  const [deleteUserData, setDeleteUserData] =
    useState<UserProfile | null>(null);

  const [savingUser, setSavingUser] =
    useState(false);

  const [deletingUser, setDeletingUser] =
    useState(false);

  const limit = 10;

  useEffect(() => {

    const timer = setTimeout(() => {

      loadUsers();

    }, 400);

    return () => clearTimeout(timer);

  }, [page, search]);

  async function loadUsers() {

    try {

      setLoading(true);

      const response =
        await getUsers(
          page,
          search,
          limit
        );

      setUsers(response.users);

      setTotal(response.total);

    } catch (error) {

      console.error(
        "Load Users Error:",
        error
      );

      toast.error(
        "Unable to load users."
      );

    } finally {

      setLoading(false);

    }

  }

  function handleSearch(
    value: string
  ) {

    setSearch(value);

    setPage(1);

  }

  function handleEdit(
    user: UserProfile
  ) {

    setSelectedUser(user);

    setOpenEditModal(true);

  }

  async function handleUpdateUser(
    id: string,
    data: {
      name: string;
      email: string;
      role: string;
    }
  ) {

    try {

      setSavingUser(true);

      await updateUser(
        id,
        data
      );

      toast.success(
        "User updated successfully."
      );

      setOpenEditModal(false);

      setSelectedUser(null);

      await loadUsers();

    } catch (error) {

      console.error(
        "Update User Error:",
        error
      );

      toast.error(
        "Unable to update user."
      );

    } finally {

      setSavingUser(false);

    }

  }

  function handleDelete(
    user: UserProfile
  ) {

    setDeleteUserData(user);

    setOpenDeleteModal(true);

  }

  async function confirmDelete() {

    if (!deleteUserData) {

      return;

    }

    try {

      setDeletingUser(true);

      await deleteUser(
        deleteUserData.id
      );

      toast.success(
        "User deleted successfully."
      );

      setOpenDeleteModal(false);

      setDeleteUserData(null);

      await loadUsers();

    } catch (error) {

      console.error(
        "Delete User Error:",
        error
      );

      toast.error(
        "Unable to delete user."
      );

    } finally {

      setDeletingUser(false);

    }

  }

  if (loading) {

    return (

      <div className="flex h-96 items-center justify-center">

        <h2 className="text-xl font-semibold">

          Loading users...

        </h2>

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Users

        </h1>

        <p className="mt-2 text-slate-500">

          Manage all registered users.

        </p>

      </div>

      <UserSearch
        value={search}
        onChange={handleSearch}
      />

      <UsersTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UserPagination
        page={page}
        total={total}
        limit={limit}
        onPageChange={setPage}
      />

      <EditUserModal
        open={openEditModal}
        user={selectedUser}
        loading={savingUser}
        onClose={() => {

          if (savingUser) {
            return;
          }

          setOpenEditModal(false);

          setSelectedUser(null);

        }}
        onSave={handleUpdateUser}
      />

      <DeleteUserModal
        open={openDeleteModal}
        userName={
          deleteUserData?.name ?? ""
        }
        loading={deletingUser}
        onClose={() => {

          if (deletingUser) {
            return;
          }

          setOpenDeleteModal(false);

          setDeleteUserData(null);

        }}
        onConfirm={confirmDelete}
      />

    </div>

  );

}

export default UsersPage;
