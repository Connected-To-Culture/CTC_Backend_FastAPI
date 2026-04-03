import React from "react";

const useProductMeta = () => {
  const getName = (product) =>
    product?.name ?? product?.title ?? product?.product_name ?? "Product Name";

  const getPriceString = (product) =>
    product?.price_per_unit ? `$${product.price_per_unit}` : "Price";

  const getUnit = (product) => product?.unit ?? "unit";

  const formatPriceUnit = (product) =>
    `${getPriceString(product)}/${getUnit(product)}`;

  const getVendorNames = (product) => {
    // Prefer array of vendor objects or names if provided by backend
    if (Array.isArray(product?.vendors) && product.vendors.length) {
      return product.vendors.map((v) => {
        if (!v) return "CTC Market";
        if (typeof v === "string") return v;
        return v.name || v.vendor_name || "CTC Market";
      });
    }

    // Single vendor name field
    if (product?.vendor_name) return [product.vendor_name];

    // vendor object
    if (product?.vendor) {
      if (Array.isArray(product.vendor) && product.vendor.length)
        return product.vendor.map(
          (v) => v.name || v.vendor_name || "CTC Market",
        );
      if (product.vendor.name) return [product.vendor.name];
    }

    // Fallback
    return ["CTC Market"];
  };

  const nameElement = (product, className = "product-name") => (
    <h3 className={className}>{getName(product)}</h3>
  );

  const priceElement = (product, className = "product-price") => (
    <p className={className}>{formatPriceUnit(product)}</p>
  );

  const vendorsElement = (product, className = "product-vendors") => (
    <div className={className}>{getVendorNames(product).join(", ")}</div>
  );

  return {
    getName,
    getPriceString,
    getUnit,
    formatPriceUnit,
    getVendorNames,
    nameElement,
    priceElement,
    vendorsElement,
  };
};

export default useProductMeta;
