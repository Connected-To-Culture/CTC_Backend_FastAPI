import React, { useState, useEffect } from "react";
import "../styles/AddToCartModal.css";
import { useQuantityControls } from "../hooks/useQuantityControls";

const AddToCartModal = ({ isOpen, onClose, product, onAddToCart }) => {
  const [selectedVendors, setSelectedVendors] = useState({});
  const [vendors, setVendors] = useState([
    {
      id: "ctc-market",
      name: "CTC Market",
      price: 0,
      unit: "unit",
      stock: 0,
      inStock: false,
    },
  ]);
  const [loading, setLoading] = useState(false);

  // Use the quantity controls hook
  const {
    quantities,
    setQuantities,
    startQuantityIncrement,
    startQuantityDecrement,
    stopQuantityChange,
  } = useQuantityControls(vendors);

  // Fetch product data and inventory from backend
  useEffect(() => {
    if (isOpen && product) {
      fetchProductData();
    } else if (isOpen && !product) {
      // If no product is provided, show fallback vendor
      setVendors([
        {
          id: "ctc-market",
          name: "CTC Market",
          price: 0,
          unit: "unit",
          stock: 0,
          inStock: false,
        },
      ]);
      setSelectedVendors({});
      setQuantities({});
      setLoading(false);
    }
  }, [isOpen, product]);

  const fetchProductData = async () => {
    setLoading(true);

    // If no product ID, use fallback data
    if (!product?.id) {
      const fallbackVendors = [
        {
          id: "ctc-market",
          name: "CTC Market",
          price: product?.price || 0,
          unit: "unit",
          stock: 0,
          inStock: false,
        },
      ];
      setVendors(fallbackVendors);
      setSelectedVendors({});
      setQuantities({});
      setLoading(false);
      return;
    }

    try {
      // Fetch product details
      const productResponse = await fetch(
        `http://localhost:8000/getProduct/${product.id}`,
      );
      if (!productResponse.ok) {
        throw new Error("Failed to fetch product data");
      }
      const productData = await productResponse.json();

      // Fetch inventory data
      const inventoryResponse = await fetch(
        `http://localhost:8000/getInventory/${product.id}`,
      );
      let inventoryData = { quantity: 0, in_stock: false, unit: "unit" };

      if (inventoryResponse.ok) {
        inventoryData = await inventoryResponse.json();
      } else {
        console.warn("Failed to fetch inventory data, using defaults");
      }

      // Create vendor data from product and inventory
      // Only include CTC Market as fallback when no real vendor data is available
      let vendorData = [
        // Future vendors would be added here when database supports multiple vendors
      ];

      // If no vendors are available from database, use CTC Market as fallback
      if (vendorData.length === 0) {
        vendorData = [
          {
            id: "ctc-market",
            name: "CTC Market",
            price: productData.price_per_unit || 0,
            unit: productData.unit || inventoryData.unit || "unit",
            stock: inventoryData.quantity || 0,
            inStock:
              inventoryData.in_stock || inventoryData.quantity > 0 || false,
          },
        ];
      }

      setVendors(vendorData);

      // Initialize with first vendor selected and quantity 1 (only if in stock)
      const initialSelected = {};
      const initialQuantities = {};
      vendorData.forEach((vendor) => {
        if (vendor.inStock) {
          initialSelected[vendor.id] = true;
          initialQuantities[vendor.id] = 1;
        }
      });
      setSelectedVendors(initialSelected);
      setQuantities(initialQuantities);
    } catch (err) {
      console.error("Error fetching product data:", err);

      // Use CTC Market as placeholder when API fails - don't show error, just use fallback
      const placeholderVendors = [
        {
          id: "ctc-market",
          name: "CTC Market",
          price: product?.price || 0,
          unit: "unit",
          stock: 0,
          inStock: false,
        },
      ];
      setVendors(placeholderVendors);

      // Initialize with placeholder vendor (not selected since out of stock)
      setSelectedVendors({});
      setQuantities({});
    } finally {
      setLoading(false);
    }
  };

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

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleVendorToggle = (vendorId) => {
    setSelectedVendors((prev) => ({
      ...prev,
      [vendorId]: !prev[vendorId],
    }));
  };

  const calculateTotal = () => {
    // If we only have placeholder data (price is 0), show "Not Available"
    if (vendors.length === 1 && vendors[0].price === 0) {
      return null; // Return null to indicate total cannot be calculated
    }

    return vendors.reduce((total, vendor) => {
      if (selectedVendors[vendor.id] && quantities[vendor.id] > 0) {
        return total + vendor.price * quantities[vendor.id];
      }
      return total;
    }, 0);
  };

  const handleAddToCart = () => {
    const cartItems = vendors
      .filter(
        (vendor) => selectedVendors[vendor.id] && quantities[vendor.id] > 0,
      )
      .map((vendor) => ({
        productId: product?.id || product?.name,
        productName: product?.name || "Product",
        vendorId: vendor.id,
        vendorName: vendor.name,
        quantity: quantities[vendor.id],
        unit: vendor.unit,
        price: vendor.price,
        total: vendor.price * quantities[vendor.id],
      }));

    if (cartItems.length > 0) {
      onAddToCart(cartItems);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content add-to-cart-modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Add {product?.name || "Product"} to Cart</h2>

        <div className="product-image-section">
          {product?.image ? (
            <img
              src={product.image}
              alt={product?.name || "Product Image"}
              className="modal-product-image"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className="modal-product-image-placeholder"
            style={{ display: product?.image ? "none" : "flex" }}
          >
            <p>{product?.name || "Product Image"}</p>
          </div>
        </div>

        <div className="vendor-options">
          {loading ? (
            <div className="loading-state">
              <p>Loading product information...</p>
            </div>
          ) : (
            vendors.map((vendor) => (
              <div
                key={vendor.id}
                className={`vendor-item ${!vendor.inStock ? "out-of-stock" : ""}`}
              >
                <div className="vendor-header">
                  <label className="vendor-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedVendors[vendor.id] || false}
                      onChange={() => handleVendorToggle(vendor.id)}
                      disabled={!vendor.inStock}
                    />
                    <span className="checkmark"></span>
                    <span className="vendor-name">{vendor.name}</span>
                  </label>
                  <span className="vendor-price">
                    ${vendor.price.toFixed(2)} / {vendor.unit}
                  </span>
                </div>

                <div className="vendor-details">
                  <span className="stock-info">
                    {vendor.stock > 0
                      ? `${vendor.stock} in stock`
                      : "Out of stock"}
                  </span>
                  <div className="quantity-selector">
                    <button
                      className="quantity-btn"
                      onMouseDown={() => startQuantityDecrement(vendor.id)}
                      onMouseUp={() => stopQuantityChange(vendor.id)}
                      onMouseLeave={() => stopQuantityChange(vendor.id)}
                      disabled={!selectedVendors[vendor.id] || !vendor.inStock}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={quantities[vendor.id] || 0}
                      onChange={(e) =>
                        handleQuantityChange(
                          vendor.id,
                          parseInt(e.target.value) || 0,
                        )
                      }
                      min="0"
                      max={vendor.stock}
                      disabled={!selectedVendors[vendor.id] || !vendor.inStock}
                    />
                    <button
                      className="quantity-btn"
                      onMouseDown={() => startQuantityIncrement(vendor.id)}
                      onMouseUp={() => stopQuantityChange(vendor.id)}
                      onMouseLeave={() => stopQuantityChange(vendor.id)}
                      disabled={
                        !selectedVendors[vendor.id] ||
                        !vendor.inStock ||
                        quantities[vendor.id] >= vendor.stock
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total vendor-total-container">
                    <span
                      className={`vendor-subtotal-label ${(quantities[vendor.id] || 0) === 0 || !vendor.inStock ? "out-of-stock" : ""}`}
                    >
                      Vendor Sub Total:
                    </span>
                    <span
                      className={`vendor-subtotal-amount ${!vendor.inStock ? "hidden" : ""}`}
                    >
                      $
                      {(vendor.price * (quantities[vendor.id] || 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-total">
          <strong>
            Total:{" "}
            {calculateTotal() === null
              ? "Not Available"
              : `$${calculateTotal().toFixed(2)}`}
          </strong>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={calculateTotal() === null || calculateTotal() === 0}
          >
            Add {product?.name || "Product"} to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
