import React, { useState } from 'react';
import { VendorSelectionModal } from '../modals';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/helpers';
import { globalStyles, colors } from '../styles/globalStyles';

const CustomerHomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const { addToCart, cartItems } = useCart();

  // Mock data for vendors
  const vendors = [
    { id: 1, name: 'Fresh Farms', price: 5.99 },
    { id: 2, name: 'Green Grocer', price: 6.49 },
    { id: 3, name: 'Local Produce', price: 5.79 },
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
    <div style={globalStyles.container}>
      <h1 style={globalStyles.title}>New Arrivals</h1>
      <div style={styles.productCard} onClick={handleProductPress}>
        <h3>Apples</h3>
        <p>Average Price: {formatPrice(6.09)}</p>
      </div>
      {selectedVendor && (
        <p>Selected Vendor: {selectedVendor.name} - {formatPrice(selectedVendor.price)}</p>
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

const styles = {
  productCard: {
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
  },
};

export default CustomerHomeScreen;