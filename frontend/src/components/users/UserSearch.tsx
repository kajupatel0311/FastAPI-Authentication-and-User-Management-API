type UserSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

function UserSearch({
  value,
  onChange,
}: UserSearchProps) {

  return (

    <div className="mb-6">

      <input
        type="text"
        placeholder="Search by name or email..."
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500"
      />

    </div>

  );

}

export default UserSearch;
