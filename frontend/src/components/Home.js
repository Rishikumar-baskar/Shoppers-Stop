//import { Fragment } from "react/jsx-runtime";
//import { useEffect } from "react";
import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector} from "react-redux";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productsActions";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";
import Pagination from 'react-js-pagination';

export default function Home() {

const dispatch = useDispatch();
const {products, loading, error} = useSelector((state) => state.productsState)

useEffect (()=>{
    if(error){
        return toast.error(error,
        {position: "top-center"}
    );
    }
    
    dispatch(getProducts)

},[error,dispatch]);
    return (
        <Fragment>
            {loading ? <Loader/>:
          <Fragment>
            <MetaData title={'Buy Best Products'} />
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                    {products && products.map(product => (
                     <Product key={product._id} product={product}/>
                    ))}
                    

                   
                </div>
            </section>
            <div className="d-flex justify-content-center mt-5">
                <Pagination/>

            </div>

        </Fragment>
        }
        </Fragment>
        
    )
}