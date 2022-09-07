import React from "react";
import { Product } from "./interfaces/product";
import Wrapper from "./Wrapper";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    return () => {
      (async () => {
        const response = await fetch("http://localhost:8000/api/products");
        const data = await response.json();
        setProducts(data);
      })();
    };
  }, []);
  const deleteProduct = async (id: number) => {
    if (window.confirm(`Are you sure you want to delete product: ${id}`)) {
      await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((pro: Product) => pro.id !== id));
    }
  };

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link to="/admin/products/create">   
            <button className="btn btn-sm btn-outline-secondary">Add</button>
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Likes</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <img
                      src={product.image}
                      alt={`image: ${product.id}`}
                      height="80"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.likes}</td>
                  <td>
                    <div className="btn-group me-2">
                      <a
                        href="#"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Delete
                      </a>
                      <a
                        href="#"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                      >
                        Edit
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Products;
