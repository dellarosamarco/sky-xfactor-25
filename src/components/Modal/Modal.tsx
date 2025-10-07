import { MouseEvent, ReactNode } from "react";
import "./Modal.scss";

type ModalProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onClose?: () => void;
  children?: ReactNode;
};

const Modal = ({
  isOpen,
  title,
  description,
  primaryActionLabel = "Chiudi",
  onPrimaryAction,
  onClose,
  children,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = () => {
    onClose?.();
  };

  const handleContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handlePrimaryAction = () => {
    if (onPrimaryAction) {
      onPrimaryAction();
    }

    onClose?.();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={handleContentClick}
      >
        <div className="modal__content">
          <h2 id="modal-title" className="modal__title">
            {title}
          </h2>

          {description && <p className="modal__description">{description}</p>}
          {children}
        </div>

        <div className="modal__actions">
          <button type="button" className="button" onClick={handlePrimaryAction}>
            {primaryActionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
