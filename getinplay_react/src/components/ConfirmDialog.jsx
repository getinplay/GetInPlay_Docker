import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.element.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
      onClick={onCancel}>
      <div
        ref={modalRef}
        className='bg-white p-5 rounded-lg shadow-lg w-90 max-w-full m-3'
        onClick={(e) => e.stopPropagation()}>
        <p className='text-xl font-bold text-gray-800'>{title}</p>
        <div className='text-gray-600 text-base 2xs:text-justify text-start my-3'>
          {message}
        </div>
        <div className='flex justify-end gap-3'>
          <button
            onClick={onCancel}
            className='cursor-pointer bg-gray-300 px-4 py-1 rounded-md'>
            No
          </button>
          <button
            onClick={onConfirm}
            className='cursor-pointer bg-[#4A5BE6] text-white px-4 py-1 rounded-md'>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
