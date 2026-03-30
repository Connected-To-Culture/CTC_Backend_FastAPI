import React, { useState, useEffect } from "react";
import "../styles/AllModal.css";
import useProductCard from "../hooks/useProductCard";
import useProductMeta from "../hooks/useProductMeta";

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
    hideNameAndPrice: true,
  });

  const productMeta = useProductMeta();

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

  const [availableEvents, setAvailableEvents] = useState([]);
  // Allow multiple events to be selected (modal supports select all)
  const [selectedEvents, setSelectedEvents] = useState(new Set());
  const [modalType, setModalType] = useState(null);

  // Temporary selection state used inside vendor/event dropdown modals
  const [tempSelectedVendors, setTempSelectedVendors] = useState(new Set());
  const [tempSelectedEventIds, setTempSelectedEventIds] = useState(new Set());

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
        const activeEvent = mockEvents.find(
          (e) => e.start <= today && e.end >= today,
        );
        if (activeEvent) {
          setSelectedEvents(new Set([activeEvent.id]));
        }
      }
      // Provide sensible fallbacks when no vendors or events are available
      if (!availableVendors || availableVendors.length === 0) {
        const fallbackVendor = { id: "ctc-market", name: "CTC Market" };
        setAvailableVendors([fallbackVendor]);
        setSelectedVendors(new Set([fallbackVendor.id]));
      }

      if (!availableEvents || availableEvents.length === 0) {
        const fallbackEvent = {
          id: "dc-farmers-2026",
          name: "DC Farmers Market (Summer 2026)",
          start: "2026-06-01",
          end: "2026-08-31",
        };
        setAvailableEvents([fallbackEvent]);
        if (!selectedEvents || selectedEvents.size === 0)
          setSelectedEvents(new Set([fallbackEvent.id]));
      }
    }
  }, [isOpen]);

  // Initialize temporary modal selections when modal opens
  useEffect(() => {
    if (modalType === "vendor") {
      setTempSelectedVendors(new Set(selectedVendors));
    } else if (modalType === "event") {
      setTempSelectedEventIds(new Set(selectedEvents));
    }
  }, [modalType, selectedVendors, selectedEvents]);

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
    const newSelected = new Set(selectedEvents);
    if (newSelected.has(eventId)) newSelected.delete(eventId);
    else newSelected.add(eventId);
    setSelectedEvents(newSelected);
    // close any open vendor/event modal by clearing modalType
    setModalType(null);
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

  // Helper function to render dropdown button (always enabled)
  const renderDropdownButton = (
    type,
    label,
    availableItems,
    selectedItems,
    onClick,
    defaultText = null,
  ) => {
    let buttonText;
    if (type === "vendor") {
      if (availableItems.length === 0) buttonText = "CTC Market";
      else if (selectedItems.size === 1)
        buttonText =
          availableItems.find((v) => v.id === [...selectedItems][0])?.name ||
          "Unknown Vendor";
      else buttonText = `${selectedItems.size} selected`;
    } else if (type === "event") {
      // selectedItems for events is a Set of selected event ids
      if (!selectedItems || selectedItems.size === 0)
        buttonText = defaultText || "Select Event";
      else if (selectedItems.size === 1) {
        const selId = [...selectedItems][0];
        buttonText =
          availableItems.find((e) => e.id === selId)?.name || "Select Event";
      } else buttonText = `${selectedItems.size} selected`;
    } else {
      buttonText = "Select";
    }

    return (
      <div className="vendor-dropdown-container" onClick={onClick}>
        <span className={`${type}-label`}>{label} </span>
        <span className="vendor-button-text">{buttonText}</span>
      </div>
    );
  };

  const handleOverlayClick = (e) => {
    // only close when clicking the overlay itself (not inner content)
    if (e.target === e.currentTarget) {
      setModalType(null);
      if (onClose) onClose();
    }
  };

  const handleDelete = () => {
    if (!onDelete) return;
    const selectedItemsArray = items.filter((item) =>
      selectedItems.has(keyExtractor(item)),
    );
    onDelete(selectedItemsArray);
    setSelectedItems(new Set());
    setSelectAll(false);
  };

  // Reusable dropdown content for vendor/event modals
  const DropdownContent = ({ type }) => {
    const isEventType = type === "event";
    const list = isEventType ? availableEvents : availableVendors;
    const tempSelected = isEventType
      ? tempSelectedEventIds
      : tempSelectedVendors;
    const setTemp = isEventType
      ? setTempSelectedEventIds
      : setTempSelectedVendors;

    const allSelected =
      list &&
      tempSelected &&
      list.length > 0 &&
      tempSelected.size === list.length;

    const sorted = (list || [])
      .slice()
      .sort((a, b) =>
        isEventType
          ? b.start.localeCompare(a.start)
          : b.name.localeCompare(a.name),
      );

    return (
      <div className="vendor-dropdown" onClick={() => setModalType(null)}>
        <div
          className="vendor-dropdown-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={() => setModalType(null)}>
            &times;
          </button>
          <h3>{isEventType ? "Select Event" : "Select Vendors"}</h3>

          <label
            className={`${type}-select-all`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <input
              type="checkbox"
              checked={allSelected}
              onChange={() => {
                if (allSelected) setTemp(new Set());
                else setTemp(new Set(list.map((v) => v.id)));
              }}
            />
            <span>
              {tempSelected && tempSelected.size > 0
                ? "Deselect All"
                : "Select All"}
            </span>
          </label>

          <div
            className={isEventType ? "event-grid" : "vendor-grid"}
            style={{
              gridTemplateColumns: `repeat(${Math.max(1, Math.ceil(list.length / 5))}, 1fr)`,
              gridAutoFlow: "column",
            }}
          >
            {sorted.map((item) => (
              <div
                key={item.id}
                className={isEventType ? "event-item" : "vendor-item"}
              >
                <label
                  className={
                    isEventType
                      ? "event-label-container"
                      : "vendor-label-container"
                  }
                >
                  <input
                    type="checkbox"
                    checked={tempSelected.has(item.id)}
                    onChange={() => {
                      setTemp((prev) => {
                        const copy = new Set(prev);
                        if (copy.has(item.id)) copy.delete(item.id);
                        else copy.add(item.id);
                        return copy;
                      });
                    }}
                    className={
                      isEventType ? "event-checkbox" : "vendor-checkbox"
                    }
                  />
                  <span
                    className={isEventType ? "event-label" : "vendor-label"}
                  >
                    {item.name}
                  </span>
                </label>
              </div>
            ))}
          </div>

          <div className="vendor-modal-actions">
            <button
              className="cancel-button"
              onClick={() => setModalType(null)}
            >
              Cancel
            </button>
            <button
              className="load-button"
              onClick={() => {
                if (isEventType) {
                  setSelectedEvents(new Set(tempSelectedEventIds));
                } else {
                  setSelectedVendors(new Set(tempSelectedVendors));
                }
                setModalType(null);
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Compute a short display string for selected events (used near the buttons)
  const selectedEventDisplay = (() => {
    if (!selectedEvents || selectedEvents.size === 0) return null;
    if (selectedEvents.size === 1) {
      const selId = [...selectedEvents][0];
      const sel = availableEvents.find((e) => e.id === selId);
      if (sel)
        return `${new Date(sel.start).toLocaleDateString()} - ${new Date(sel.end).toLocaleDateString()}`;
    }
    return `${selectedEvents.size} selected`;
  })();

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
            <div className="sort-options-center">
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
                  onChange={(e) =>
                    handlePriorityChange("count", e.target.value)
                  }
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
                  onChange={(e) =>
                    handlePriorityChange("price", e.target.value)
                  }
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
            </div>

            <div
              className={`sort-options-right ${userRole === "admin" ? "admin-layout" : ""}`}
            >
              {/* Render both buttons so DOM is stable; hide by auth when not applicable */}
              <div
                style={{
                  display:
                    userRole === "admin" || userRole === "customer"
                      ? "flex"
                      : "none",
                }}
              >
                {renderDropdownButton(
                  "vendor",
                  "Vendor",
                  availableVendors,
                  selectedVendors,
                  () => setModalType("vendor"),
                )}
              </div>
              <div
                style={{
                  display:
                    userRole === "admin" || userRole === "vendor"
                      ? "flex"
                      : "none",
                }}
              >
                {renderDropdownButton(
                  "event",
                  "Event",
                  availableEvents,
                  selectedEvents,
                  () => setModalType("event"),
                  isVendor ? "Current" : null,
                )}
              </div>
              {selectedEventDisplay && (
                <span className="event-date">{selectedEventDisplay}</span>
              )}
              {isVendor &&
                (!selectedEvents || selectedEvents.size === 0) &&
                availableEvents.length === 0 && (
                  <span className="event-date">
                    {new Date().toLocaleDateString()}
                  </span>
                )}
            </div>
          </div>
          {modalType && <DropdownContent type={modalType} />}
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
                  {renderProductCard({}, "fallback", {
                    name: productMeta.nameElement({}),
                    price: productMeta.priceElement({}),
                    vendors: productMeta.vendorsElement({}),
                  })}
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
                  <div className="item-content">
                    {renderProductCard(item, keyExtractor(item), {
                      name: productMeta.nameElement(item),
                      price: productMeta.priceElement(item),
                      vendors: productMeta.vendorsElement(item),
                    })}
                  </div>
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
