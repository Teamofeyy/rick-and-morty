import React from "react";

type FiltersModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const FiltersModal: React.FC<FiltersModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-30">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 top-16 bg-white rounded-t-xl p-4 overflow-auto">
        <div className="flex justify-end">
          <button className="px-3 py-1" onClick={onClose} aria-label="Close filters">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FiltersModal;



