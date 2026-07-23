import { useRef, useState } from "react";

import { uploadProfileImage } from "../../api/userApi";

type Props = {
  onUploadSuccess: () => void;
};

function ProfileImageUpload({
  onUploadSuccess,
}: Props) {

  const inputRef =
    useRef<HTMLInputElement>(null);

  const [loading, setLoading] =
    useState(false);

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      event.target.files?.[0];

    if (!file) return;

    try {

      setLoading(true);

      await uploadProfileImage(file);

      alert("Profile image updated.");

      onUploadSuccess();

    } catch (error: any) {

      alert(
        error?.response?.data?.detail ??
        "Unable to upload image."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="mt-6">

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleUpload}
      />

      <button
        onClick={() =>
          inputRef.current?.click()
        }
        disabled={loading}
        className="rounded-lg bg-slate-800 px-6 py-3 font-medium text-white hover:bg-slate-900"
      >

        {loading
          ? "Uploading..."
          : "Upload Profile Image"}

      </button>

    </div>

  );

}

export default ProfileImageUpload;

