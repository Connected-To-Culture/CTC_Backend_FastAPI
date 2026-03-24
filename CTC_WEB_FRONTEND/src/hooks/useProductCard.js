import { useAuth } from "../context/AuthContext";

const useProductCard = (options = {}) => {
  let onAddToCart = null;
  let showAddToCart = true;
  let layout = "vertical";

  if (typeof options === "function") {
    onAddToCart = options;
  } else {
    ({
      onAddToCart = null,
      showAddToCart = true,
      layout = "vertical",
    } = options);
  }

  const { user } = useAuth();

  const renderProductCard = (product, index) => (
    <div
      key={index || product.id}
      className={`product-container ${layout === "horizontal" ? "horizontal" : ""}`}
    >
      <div className="product-card">
        <div className="product-image">
          {product?.image ? (
            <img
              src={product.image}
              alt={product?.name || "Product Image"}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className="product-image-placeholder"
            style={{ display: product?.image ? "none" : "flex" }}
          >
            <p>{product?.name || "Product Image"}</p>
          </div>
          {/* Add to Cart overlay for authenticated customers */}
          {user && user.role === "customer" && onAddToCart && showAddToCart && (
            <button
              className="add-to-cart-overlay"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
      {layout === "horizontal" ? (
        <div className="product-details">
          <h3 className="product-name">
            {product?.name ? product.name : "Product Name"}
          </h3>
          <p className="product-vendor">
            {product?.vendor_name || "CTC Market"}
          </p>
          <p className="product-price">
            {product?.price_per_unit ? `$${product.price_per_unit}` : "Price"}/
            {product?.unit ? product.unit : "unit"}
          </p>
        </div>
      ) : layout === "allmodal" ? (
        <>
          <div className="product-info">
            <h3 className="product-name">
              {product?.name ? product.name : "Product Name"}
            </h3>
            <p className="product-vendor">
              {product?.vendor_name || "CTC Market"}
            </p>
            <p className="product-count">Count: {product?.count || "N/A"}</p>
          </div>
          <div className="product-price-info">
            <p className="product-price">
              {product?.price_per_unit ? `$${product.price_per_unit}` : "Price"}
            </p>
            <p className="product-unit">
              {product?.unit ? product.unit : "unit"}
            </p>
          </div>
        </>
      ) : (
        <>
          <h3 className="product-name">
            {product?.name ? product.name : "Product Name"}
          </h3>
          <p className="product-vendor">
            {product?.vendor_name || "CTC Market"}
          </p>
          <p className="product-price">
            {product?.price_per_unit ? `$${product.price_per_unit}` : "Price"}/
            {product?.unit ? product.unit : "unit"}
          </p>
        </>
      )}
    </div>
  );

  return renderProductCard;
};

export default useProductCard;
