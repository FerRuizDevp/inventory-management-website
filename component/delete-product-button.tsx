"use client";

import { deleteProduct } from "@/lib/actions/products";
import { useState } from "react";

export default function DeleteProductButton({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const [open, setOpen] = useState(false);

  async function handleConfirm() {
    const formData = new FormData();
    formData.set("id", productId);
    await deleteProduct(formData);
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className="text-sm text-violet-600 hover:text-red-600 active:text-red-800"
        onClick={() => setOpen(true)}
      >
        Delete
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete product?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete <strong>{productName}</strong>?
              <br />
              This can&apos;t be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 text-sm rounded-md bg-violet-600 text-white hover:bg-red-600 active:bg-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
