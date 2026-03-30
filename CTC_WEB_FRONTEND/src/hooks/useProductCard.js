import { useAuth } from "../context/AuthContext";

const useProductCard = (options = {}) => {
  let onAddToCart = null;
  let showAddToCart = true;
  let layout = "vertical";
  let hideNameAndPrice = false;

  if (typeof options === "function") {
    onAddToCart = options;
  } else {
    ({
      onAddToCart = null,
      showAddToCart = true,
      layout = "vertical",
      hideNameAndPrice = false,
    } = options);
  }

  const { user } = useAuth();

  const renderProductCard = (product, index, metaElements = null) => (
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
            <p>
              {!hideNameAndPrice && product?.name
                ? product.name
                : "Product Image"}
            </p>
          </div>
          {/* Add to Cart overlay for authenticated customers */}
          {user && user.role === "customer" && onAddToCart && showAddToCart && (
            <div
              className="add-to-cart-overlay"
              onClick={() => onAddToCart(product)}
            >
              <span className="add-to-cart-text">Add to Cart</span>
            </div>
          )}
        </div>
        {layout === "horizontal" ? null : (
          <>
            {/* For non-allmodal layouts (vertical), render metaElements directly above the count.
                Support two formats for metaElements: a React node (legacy) or an object
                { name, price, vendors } where each value is a React node. */}
            {layout !== "allmodal" &&
              (() => {
                const isMetaObj =
                  metaElements &&
                  (metaElements.name ||
                    metaElements.price ||
                    metaElements.vendors);
                if (isMetaObj) {
                  return (
                    <>
                      {metaElements.name}
                      {metaElements.price}
                    </>
                  );
                }
                return metaElements
                  ? metaElements
                  : !hideNameAndPrice && (
                      <>
                        <h3 className="product-name">
                          {product?.name ? product.name : "Product Name"}
                        </h3>
                        <p className="product-price">
                          {product?.price_per_unit
                            ? `$${product.price_per_unit}`
                            : "Price"}
                          /{product?.unit ? product.unit : "unit"}
                        </p>
                      </>
                    );
              })()}
          </>
        )}
      </div>
      {layout === "horizontal" ? (
        <div className="product-details">
          {!hideNameAndPrice && (
            <>
              <h3 className="product-name">
                {product?.name ? product.name : "Product Name"}
              </h3>
              <p className="product-vendor">
                {product?.vendor_name || "CTC Market"}
              </p>
              <p className="product-price">
                {product?.price_per_unit
                  ? `$${product.price_per_unit}`
                  : "Price"}
                /{product?.unit ? product.unit : "unit"}
              </p>
            </>
          )}
        </div>
      ) : layout === "allmodal" ? (
        <>
          <div className="product-info">
            {/* For allmodal layout, render vendors on the left above the count when provided */}
            {metaElements && metaElements.vendors ? (
              metaElements.vendors
            ) : // fallback: show vendor_name if available or nothing
            product?.vendor_name ? (
              <div className="product-vendors">{product.vendor_name}</div>
            ) : null}

            <p className="product-count">Count: {product?.count || "N/A"}</p>
          </div>
          <div className="product-price-info">
            {metaElements && (metaElements.name || metaElements.price) ? (
              <>
                {metaElements.name}
                {metaElements.price}
              </>
            ) : (
              !hideNameAndPrice && (
                <>
                  <p className="product-price">
                    {product?.price_per_unit
                      ? `$${product.price_per_unit}`
                      : "Price"}
                  </p>
                  <p className="product-unit">
                    {product?.unit ? product.unit : "unit"}
                  </p>
                </>
              )
            )}
          </div>
        </>
      ) : null}
    </div>
  );

  return renderProductCard;
};

export default useProductCard;
