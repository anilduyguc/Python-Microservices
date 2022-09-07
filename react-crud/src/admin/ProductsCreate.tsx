import React, { SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import Wrapper from './Wrapper';

const ProductsCreate = () => {
    const [title,setTitle] = React.useState('');
    const [image,setImage] = React.useState('');
    const [redirect,setRedirect] = React.useState(false);
    const navigate = useNavigate();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await fetch('http://localhost:8000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                image
            })
        });
        setRedirect(true);    
    }
    if (redirect) navigate('/admin/products')
    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" className="form-control" onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>image</label>
                    <input type="text" name="image" className="form-control"  onChange={e => setImage(e.target.value)}/>
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    )
}

export default ProductsCreate
