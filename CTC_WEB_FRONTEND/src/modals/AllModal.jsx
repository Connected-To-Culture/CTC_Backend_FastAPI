import React, { useState, useEffect } from "react";
import "../styles/AllItemsModal.css";

const AllModal = ({
  isOpen,
  onClose,
  title,
  items = [],
  onLoad,
  onDelete,
  showDelete = false,
  itemType = "item",
  renderItem,
  keyExtractor,
}) => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedItems(new Set());
      setSelectAll(false);
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map(keyExtractor)));
    }
    setSelectAll(!selectAll);
  };

  const handleItemToggle = (itemKey) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemKey)) {
      newSelected.delete(itemKey);
    } else {
      newSelected.add(itemKey);
    }
    setSelectedItems(newSelected);
    setSelectAll(newSelected.size === items.length);
  };

  const handleLoad = () => {
    const selectedItemsArray = items.filter((item) =>
      selectedItems.has(keyExtractor(item)),
    );
    onLoad(selectedItemsArray);
    onClose();
  };

  const handleDelete = () => {
    const selectedItemsArray = items.filter((item) =>
      selectedItems.has(keyExtractor(item)),
    );
    onDelete(selectedItemsArray);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content all-modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{title}</h2>

        {items.length > 0 && (
          <div className="select-all-container">
            <label className="select-all-label">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="select-all-checkbox"
              />
              Select All {itemType}s
            </label>
          </div>
        )}

        <div className="items-list">
          {items.length === 0 ? (
            <p className="no-items">No {itemType}s available</p>
          ) : (
            items.map((item) => (
              <div key={keyExtractor(item)} className="item-row">
                <label className="item-label">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(keyExtractor(item))}
                    onChange={() => handleItemToggle(keyExtractor(item))}
                    className="item-checkbox"
                  />
                  <div className="item-content">
                    {renderItem ? (
                      renderItem(item)
                    ) : (
                      <span>{item.name || item.title}</span>
                    )}
                  </div>
                </label>
              </div>
            ))
          )}
        </div>

        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          {showDelete && selectedItems.size > 0 && (
            <button className="delete-button" onClick={handleDelete}>
              Delete Selected
            </button>
          )}
          <button
            className="load-button"
            onClick={handleLoad}
            disabled={selectedItems.size === 0}
          >
            Load Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllModal;
