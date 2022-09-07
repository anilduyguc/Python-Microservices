import React from "react";
import { Product } from "../admin/interfaces/product";

const Main = () => {
  const [products, setProducts] = React.useState([] as Product[]);
  React.useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8001/api/products");

      const data = await response.json();

      setProducts(data);
    })();
  }, []);
  const like = async (id: number) => {
    await fetch(`http://localhost:8001/api/products/${id}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    setProducts(
      products.map((p: Product) => {
        if (p.id === id) {
          p.likes++;
        }

        return p;
      })
    );
    console.log(products);
  };
  return (
    <div>
      <main>
        <div className="album py-5 bg-light">
          <div className="container">
            {products.map((product: Product) => {
              return (
                <div
                  className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
                  key={product.id}
                >
                  <div className="col">
                    <div className="card shadow-sm">
                      <img src={product.image} height={180} />
                      <div className="card-body">
                        <p className="card-text">{product.title}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => like(product.id)}
                            >
                              Like
                            </button>
                          </div>
                          {/* {
                              (product.likes === 0) &&  <small className="text-muted">No Likes</small>
                          }
                          {
                            (product.likes === 1)  &&
                            <small className="text-muted">Liked by {product.likes} people</small>
                          }
                          {
                              (product.likes > 1)  && <small className="text-muted">Liked by {product.likes} people</small>
                          } */}
                          <small className="text-muted">
                            Liked by {product.likes} people
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
