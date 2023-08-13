"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RemoveBtn({ id }) {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await axios
        .delete(`/api/courses?id=${id}`)
        .then((response) => {
          console.log("Delete successful");
          router.refresh();
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
