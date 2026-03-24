import React, { useState, useEffect } from "react";
import "../styles/AllModal.css";
import useProductCard from "../hooks/useProductCard";

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
  availableItemTypes = [],
  sectionVisibility = {},
  userRole = null,
  onItemTypeToggle,
}) => {
  const renderProductCard = useProductCard({
    showAddToCart: false,
    layout: "allmodal",
  });

  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItemTypes, setSelectedItemTypes] = useState(new Set());

  // Sorting and filtering state
  const [sortOptions, setSortOptions] = useState({
    count: "most",
    price: "expensive",
    restock: "newest",
  });
  const [sortPriorities, setSortPriorities] = useState({
    count: "N/A",
    price: "N/A",
    restock: "N/A",
  });
  const [availableVendors, setAvailableVendors] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState(new Set());
  const [showVendorModal, setShowVendorModal] = useState(false);

  const [availableEvents, setAvailableEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const isVendor = userRole === "vendor";

  useEffect(() => {
    if (isOpen) {
      setSelectedItems(new Set());
      setSelectAll(false);
      // Initialize selected item types based on available visible types
      const visibleTypes = availableItemTypes
        .filter(
          (type) =>
            userRole === "admin" || sectionVisibility[type.id] !== false,
        )
        .map((type) => type.id);
      setSelectedItemTypes(new Set(visibleTypes));

      if (isVendor) {
        // Mock events - replace with actual API call
        const mockEvents = [
          {
            id: 1,
            name: "Spring Festival",
            start: "2026-03-01",
            end: "2026-03-31",
          },
          {
            id: 2,
            name: "Summer Market",
            start: "2026-06-01",
            end: "2026-06-30",
          },
          {
            id: 3,
            name: "Winter Event",
            start: "2026-12-01",
            end: "2026-12-31",
          },
        ];
        setAvailableEvents(mockEvents);

        // Determine active event
        const today = new Date().toISOString().split("T")[0];
        let activeEvent = mockEvents.find(
          (e) => e.start <= today && e.end >= today,
        );
        if (!activeEvent) {
          const upcoming = mockEvents
            .filter((e) => e.start > today)
            .sort((a, b) => a.start.localeCompare(b.start));
          activeEvent = upcoming[0];
        }
        if (!activeEvent) {
          const recent = mockEvents.sort((a, b) => b.end.localeCompare(a.end));
          activeEvent = recent[0];
        }
        setSelectedEvent(activeEvent || null);
      }
    }
  }, [isOpen, availableItemTypes, sectionVisibility, userRole, isVendor]);

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

  const handleItemTypeToggle = (itemTypeId) => {
    const newSelected = new Set(selectedItemTypes);
    if (newSelected.has(itemTypeId)) {
      newSelected.delete(itemTypeId);
    } else {
      newSelected.add(itemTypeId);
    }
    setSelectedItemTypes(newSelected);
    if (onItemTypeToggle) {
      onItemTypeToggle(Array.from(newSelected));
    }
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

  // Sorting and filtering handlers
  const handleSortToggle = (sortType) => {
    setSortOptions((prev) => ({
      ...prev,
      [sortType]:
        prev[sortType] ===
        (sortType === "count"
          ? "most"
          : sortType === "price"
            ? "expensive"
            : "newest")
          ? sortType === "count"
            ? "least"
            : sortType === "price"
              ? "cheap"
              : "oldest"
          : sortType === "count"
            ? "most"
            : sortType === "price"
              ? "expensive"
              : "newest",
    }));
  };

  const handlePriorityChange = (sortType, priority) => {
    setSortPriorities((prev) => ({
      ...prev,
      [sortType]: priority,
    }));
  };

  const isPriorityTaken = (priority) => {
    return Object.values(sortPriorities).includes(priority);
  };

  const handleVendorToggle = (vendorId) => {
    const newSelected = new Set(selectedVendors);
    if (newSelected.has(vendorId)) {
      newSelected.delete(vendorId);
    } else {
      newSelected.add(vendorId);
    }
    setSelectedVendors(newSelected);
  };

  const handleEventToggle = (eventId) => {
    const event = availableEvents.find((e) => e.id === eventId);
    setSelectedEvent(event);
    setShowEventModal(false);
  };

  const handleLoad = () => {
    const selectedItemsArray = items.filter((item) =>
      selectedItems.has(keyExtractor(item)),
    );
    onLoad(selectedItemsArray);
    onClose();
  };

  const handleSelectAllToggle = () => {
    if (selectAll) {
      setSelectedItems(new Set());
      setSelectAll(false);
    } else {
      const allKeys = items.map(keyExtractor);
      setSelectedItems(new Set(allKeys));
      setSelectAll(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="all-modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{title}</h2>

        {/* Item Type Filter Header */}
        {availableItemTypes.length > 0 && (
          <div className="item-type-filters">
            <div className="filter-grid">
              {availableItemTypes
                .filter(
                  (type) =>
                    userRole === "admin" ||
                    sectionVisibility[type.id] !== false,
                )
                .map((type) => (
                  <div key={type.id} className="filter-item">
                    <label className="filter-label-container">
                      <input
                        type="checkbox"
                        checked={selectedItemTypes.has(type.id)}
                        onChange={() => handleItemTypeToggle(type.id)}
                        className="filter-checkbox"
                      />
                      <span className="filter-label">{type.name}</span>
                    </label>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Sorting and Filtering Section */}
        <div className="sorting-filters">
          <h3>Sort & Filter</h3>

          {/* Sort Options */}
          <div className="sort-options">
            <div className="sort-option">
              <button
                className="sort-button"
                onClick={() => handleSortToggle("count")}
              >
                Count: {sortOptions.count}
              </button>
              <select
                className="priority-select"
                value={sortPriorities.count}
                onChange={(e) => handlePriorityChange("count", e.target.value)}
              >
                <option value="N/A">N/A</option>
                <option
                  value="1"
                  disabled={
                    isPriorityTaken("1") && sortPriorities.count !== "1"
                  }
                >
                  1
                </option>
                <option
                  value="2"
                  disabled={
                    isPriorityTaken("2") && sortPriorities.count !== "2"
                  }
                >
                  2
                </option>
                <option
                  value="3"
                  disabled={
                    isPriorityTaken("3") && sortPriorities.count !== "3"
                  }
                >
                  3
                </option>
              </select>
            </div>

            <div className="sort-option">
              <button
                className="sort-button"
                onClick={() => handleSortToggle("price")}
              >
                Price: {sortOptions.price}
              </button>
              <select
                className="priority-select"
                value={sortPriorities.price}
                onChange={(e) => handlePriorityChange("price", e.target.value)}
              >
                <option value="N/A">N/A</option>
                <option
                  value="1"
                  disabled={
                    isPriorityTaken("1") && sortPriorities.price !== "1"
                  }
                >
                  1
                </option>
                <option
                  value="2"
                  disabled={
                    isPriorityTaken("2") && sortPriorities.price !== "2"
                  }
                >
                  2
                </option>
                <option
                  value="3"
                  disabled={
                    isPriorityTaken("3") && sortPriorities.price !== "3"
                  }
                >
                  3
                </option>
              </select>
            </div>

            <div className="sort-option">
              <button
                className="sort-button"
                onClick={() => handleSortToggle("restock")}
              >
                Restock: {sortOptions.restock}
              </button>
              <select
                className="priority-select"
                value={sortPriorities.restock}
                onChange={(e) =>
                  handlePriorityChange("restock", e.target.value)
                }
              >
                <option value="N/A">N/A</option>
                <option
                  value="1"
                  disabled={
                    isPriorityTaken("1") && sortPriorities.restock !== "1"
                  }
                >
                  1
                </option>
                <option
                  value="2"
                  disabled={
                    isPriorityTaken("2") && sortPriorities.restock !== "2"
                  }
                >
                  2
                </option>
                <option
                  value="3"
                  disabled={
                    isPriorityTaken("3") && sortPriorities.restock !== "3"
                  }
                >
                  3
                </option>
              </select>
            </div>
            {/* Vendor/Event Selection */}
            <div className="vendor-dropdown-container">
              <span className={isVendor ? "event-label" : "vendor-label"}>
                {isVendor ? "Event " : "Vendor "}
              </span>
              <button
                className={`vendor-button ${(isVendor ? availableEvents : availableVendors).length <= 1 ? "disabled" : ""}`}
                onClick={() =>
                  (isVendor ? availableEvents : availableVendors).length > 1 &&
                  (isVendor ? setShowEventModal : setShowVendorModal)(true)
                }
                disabled={
                  (isVendor ? availableEvents : availableVendors).length <= 1
                }
              >
                {isVendor
                  ? selectedEvent
                    ? selectedEvent.name
                    : "Current"
                  : availableVendors.length === 0
                    ? "CTC Market"
                    : selectedVendors.size === 1
                      ? availableVendors.find(
                          (v) => v.id === [...selectedVendors][0],
                        )?.name || "Unknown Vendor"
                      : `${selectedVendors.size} selected`}
              </button>
              {isVendor && selectedEvent && (
                <span className="event-date">
                  {`${new Date(selectedEvent.start).toLocaleDateString()} - ${new Date(selectedEvent.end).toLocaleDateString()}`}
                </span>
              )}
              {isVendor && !selectedEvent && availableEvents.length === 0 && (
                <span className="event-date">
                  {new Date().toLocaleDateString()}
                </span>
              )}
              {(isVendor ? showEventModal : showVendorModal) && (
                <div
                  className="vendor-dropdown"
                  onClick={() =>
                    (isVendor ? setShowEventModal : setShowVendorModal)(false)
                  }
                >
                  <div
                    className="vendor-dropdown-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="modal-close"
                      onClick={() =>
                        (isVendor ? setShowEventModal : setShowVendorModal)(
                          false,
                        )
                      }
                    >
                      &times;
                    </button>
                    <h3>{isVendor ? "Select Event" : "Select Vendors"}</h3>
                    <div className={isVendor ? "event-grid" : "vendor-grid"}>
                      {(() => {
                        const itemsPerColumn = 5;
                        const sortedItems = (
                          isVendor ? availableEvents : availableVendors
                        ).sort((a, b) =>
                          isVendor
                            ? b.start.localeCompare(a.start)
                            : b.name.localeCompare(a.name),
                        );
                        const columns = [];
                        for (
                          let i = 0;
                          i < sortedItems.length;
                          i += itemsPerColumn
                        ) {
                          columns.push(
                            sortedItems.slice(i, i + itemsPerColumn),
                          );
                        }
                        return columns.map((column, colIndex) => (
                          <div
                            key={colIndex}
                            className={
                              isVendor ? "event-column" : "vendor-column"
                            }
                          >
                            {Array.from(
                              { length: 5 - column.length },
                              (_, i) => (
                                <div
                                  key={`filler-${colIndex}-${i}`}
                                  className="filler-item"
                                ></div>
                              ),
                            )}
                            {column.map((item) => (
                              <div
                                key={item.id}
                                className={
                                  isVendor ? "event-item" : "vendor-item"
                                }
                              >
                                <label
                                  className={
                                    isVendor
                                      ? "event-label-container"
                                      : "vendor-label-container"
                                  }
                                >
                                  <input
                                    type="checkbox"
                                    checked={
                                      isVendor
                                        ? selectedEvent?.id === item.id
                                        : selectedVendors.has(item.id)
                                    }
                                    onChange={() =>
                                      isVendor
                                        ? handleEventToggle(item.id)
                                        : handleVendorToggle(item.id)
                                    }
                                    className={
                                      isVendor
                                        ? "event-checkbox"
                                        : "vendor-checkbox"
                                    }
                                  />
                                  <span
                                    className={
                                      isVendor ? "event-label" : "vendor-label"
                                    }
                                  >
                                    {item.name}
                                  </span>
                                </label>
                              </div>
                            ))}
                          </div>
                        ));
                      })()}
                    </div>
                    <div className="vendor-modal-actions">
                      <button
                        className="cancel-button"
                        onClick={() =>
                          (isVendor ? setShowEventModal : setShowVendorModal)(
                            false,
                          )
                        }
                      >
                        Cancel
                      </button>
                      <button
                        className="load-button"
                        onClick={() =>
                          (isVendor ? setShowEventModal : setShowVendorModal)(
                            false,
                          )
                        }
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selection Actions Section */}
        <div className="selection-actions">
          <button
            className="select-toggle-button"
            onClick={handleSelectAllToggle}
            disabled={items.length === 0}
          >
            {selectAll ? "Deselect All" : "Select All"} {itemType}s
          </button>
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

        <div className="items-list">
          {items.length === 0 ? (
            <div key="fallback" className="item-row">
              <label className="item-label">
                <input
                  type="checkbox"
                  checked={selectedItems.has("fallback")}
                  onChange={() => handleItemToggle("fallback")}
                  className="item-checkbox"
                />
                <div className="item-content">
                  {renderProductCard({}, "fallback")}
                </div>
              </label>
            </div>
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
                  <div className="item-content">{renderProductCard(item)}</div>
                </label>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllModal;
