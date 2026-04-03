import { useState, useCallback } from "react";

/**
 * Custom hook for managing quantity controls with mouse-down continuous increment/decrement
 * @param {Array} vendors - Array of vendor objects with id, stock, etc.
 * @param {Object} initialQuantities - Initial quantities object
 * @returns {Object} - { quantities, setQuantities, startQuantityIncrement, startQuantityDecrement, stopQuantityChange }
 */
export const useQuantityControls = (vendors, initialQuantities = {}) => {
  const [quantities, setQuantities] = useState(initialQuantities);
  const [quantityIntervals, setQuantityIntervals] = useState({});

  const handleQuantityChange = useCallback(
    (vendorId, newQuantity) => {
      const vendor = vendors.find((v) => v.id === vendorId);
      const maxStock = vendor?.stock || 0;
      const quantity = Math.max(0, Math.min(newQuantity, maxStock));
      setQuantities((prev) => ({
        ...prev,
        [vendorId]: quantity,
      }));
    },
    [vendors],
  );

  const handleQuantityIncrement = useCallback(
    (vendorId) => {
      const currentQty = quantities[vendorId] || 0;
      const vendor = vendors.find((v) => v.id === vendorId);
      const maxStock = vendor?.stock || 0;
      if (currentQty < maxStock) {
        handleQuantityChange(vendorId, currentQty + 1);
      }
    },
    [quantities, vendors, handleQuantityChange],
  );

  const handleQuantityDecrement = useCallback(
    (vendorId) => {
      const currentQty = quantities[vendorId] || 0;
      if (currentQty > 0) {
        handleQuantityChange(vendorId, currentQty - 1);
      }
    },
    [quantities, handleQuantityChange],
  );

  const startQuantityIncrement = useCallback(
    (vendorId) => {
      // Clear any existing interval for this vendor
      if (quantityIntervals[vendorId]) {
        clearInterval(quantityIntervals[vendorId]);
      }

      // Immediately increment once
      handleQuantityIncrement(vendorId);

      // Start interval for continuous incrementing every 500ms
      const interval = setInterval(() => {
        handleQuantityIncrement(vendorId);
      }, 500);

      setQuantityIntervals((prev) => ({
        ...prev,
        [vendorId]: interval,
      }));
    },
    [quantityIntervals, handleQuantityIncrement],
  );

  const startQuantityDecrement = useCallback(
    (vendorId) => {
      // Clear any existing interval for this vendor
      if (quantityIntervals[vendorId]) {
        clearInterval(quantityIntervals[vendorId]);
      }

      // Immediately decrement once
      handleQuantityDecrement(vendorId);

      // Start interval for continuous decrementing every 500ms
      const interval = setInterval(() => {
        handleQuantityDecrement(vendorId);
      }, 500);

      setQuantityIntervals((prev) => ({
        ...prev,
        [vendorId]: interval,
      }));
    },
    [quantityIntervals, handleQuantityDecrement],
  );

  const stopQuantityChange = useCallback(
    (vendorId) => {
      if (quantityIntervals[vendorId]) {
        clearInterval(quantityIntervals[vendorId]);
        setQuantityIntervals((prev) => {
          const newIntervals = { ...prev };
          delete newIntervals[vendorId];
          return newIntervals;
        });
      }
    },
    [quantityIntervals],
  );

  return {
    quantities,
    setQuantities,
    startQuantityIncrement,
    startQuantityDecrement,
    stopQuantityChange,
  };
};
