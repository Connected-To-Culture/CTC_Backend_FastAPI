import React, { useState } from "react";
import { VendorSelectionModal } from "../modals";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/helpers";

const CustomerHomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const { addToCart, cartItems } = useCart();

  // Mock data for vendors
  const vendors = [
    { id: 1, name: "Fresh Farms", price: 5.99 },
    { id: 2, name: "Green Grocer", price: 6.49 },
    { id: 3, name: "Local Produce", price: 5.79 },
  ];

  const handleProductPress = () => {
    // When a product with multiple vendors is pressed
    setModalVisible(true);
  };

  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor);
    addToCart({ ...vendor, quantity: 1 });
  };

  return (
    <div className="container">
      <h1 className="title">New Arrivals</h1>
      <div className="product-card" onClick={handleProductPress}>
        <h3 className="product-title">Apples</h3>
        <p className="product-price">Average Price: {formatPrice(6.09)}</p>
      </div>
      {selectedVendor && (
        <p>
          Selected Vendor: {selectedVendor.name} -{" "}
          {formatPrice(selectedVendor.price)}
        </p>
      )}
      <p>Cart Items: {cartItems.length}</p>

      <VendorSelectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        vendors={vendors}
        onSelectVendor={handleVendorSelect}
      />
    </div>
  );
};

export default CustomerHomeScreen;
