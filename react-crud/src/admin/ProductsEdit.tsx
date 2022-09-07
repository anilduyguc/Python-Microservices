import React, { PropsWithRef, SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "./interfaces/product";
import Wrapper from "./Wrapper";

const ProductsEdit = (props: PropsWithRef<any>) => {
  const [title, setTitle] = React.useState("");
  const [image, setImage] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    (async () => {
        const response =  await fetch(`http://localhost:8000/api/products/${id}`);
        const product = await response.json();
        
        setTitle(product.title);
        setImage(product.image);
    })();
  }, []);

  const submit = async (e: SyntheticEvent) => {
      console.log(id);
    e.preventDefault();
    await fetch(`http://localhost:8000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        image,
      }),
    });
    setRedirect(true);
  };
  if (redirect) navigate("/admin/products");
  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={title}
          />
        </div>
        <div className="form-group">
          <label>image</label>
          <input
            type="text"
            name="image"
            className="form-control"
            onChange={(e) => setImage(e.target.value)}
            defaultValue={image}
          />
        </div>
        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default ProductsEdit;
