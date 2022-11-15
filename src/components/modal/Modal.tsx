import { Portal } from 'components/elements';

type ModalType = {
  title: string;
  body: string;
  isOpen: boolean;
  onClose: () => void;
};

function Modal({ title, body, isOpen, onClose }: ModalType) {
  function handleClick() {
    onClose();
  }

  if (!isOpen) return null;

  return (
    <Portal className="backdrop-blur-sm">
      <div className="modal-open">
        <div className="modal-box relative mx-auto">
          <button
            type="button"
            onClick={() => handleClick()}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="py-4">{body}</p>
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
