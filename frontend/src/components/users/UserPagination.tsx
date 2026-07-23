type UserPaginationProps = {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
};

function UserPagination({
  page,
  total,
  limit,
  onPageChange,
}: UserPaginationProps) {

  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) {
    return null;
  }

  return (

    <div className="mt-6 flex items-center justify-between">

      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <span className="font-medium">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>

    </div>

  );

}

export default UserPagination;
