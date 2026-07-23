type DeleteUserModalProps = {
  open: boolean;
  userName: string;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

function DeleteUserModal({
  open,
  userName,
  loading,
  onClose,
  onConfirm,
}: DeleteUserModalProps) {

  if (!open) {

    return null;

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-4 text-2xl font-semibold">

          Delete User

        </h2>

        <p className="text-slate-600">

          Are you sure you want to delete

          <span className="font-semibold">

            {" "}{userName}

          </span>

          ?

        </p>

        <p className="mt-2 text-sm text-red-600">

          This action cannot be undone.

        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border px-5 py-2 transition disabled:cursor-not-allowed disabled:opacity-50"
          >

            Cancel

          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {loading
              ? "Deleting..."
              : "Delete"}

          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteUserModal;
