import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productsActions";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";
import Pagination from 'react-js-pagination';

export default function Home() {

    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState)
    const [currentPage, setCurrentPage] = useState(1);
    
    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo)
    }

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-center" });
            return;
        }

        dispatch(getProducts(null, null, null, null, currentPage));

    }, [error, dispatch, currentPage]);

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'Buy Best Products'} />
                    <div style={{ 
                        backgroundColor: '#f8f9fa', 
                        padding: '2rem 0',
                        minHeight: '100vh'
                    }}>
                        <div className="container">
                            <h1 style={{ 
                                fontSize: window.innerWidth < 576 ? '1.5rem' : '2rem',
                                fontWeight: '600',
                                color: '#2c3e50',
                                textAlign: 'center',
                                marginBottom: '2rem'
                            }}>
                                Latest Products!
                            </h1>

                            <section id="products">
                                <div className="row" style={{ 
                                    gap: window.innerWidth < 768 ? '1rem' : '0',
                                    justifyContent: 'center'
                                }}>
                                    {products && products.map(product => (
                                        <Product 
                                            col={12} 
                                            colSm={6} 
                                            colMd={4} 
                                            colLg={3} 
                                            key={product._id} 
                                            product={product} 
                                        />
                                    ))}
                                </div>
                            </section>
                            
                            {productsCount > 0 && resPerPage > 0 && Math.ceil(productsCount / resPerPage) > 1 ?
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    marginTop: '3rem',
                                    padding: '0 1rem'
                                }}>
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resPerPage}
                                        totalItemsCount={productsCount}
                                        onChange={setCurrentPageNo}
                                        itemClass={'page-item'}
                                        linkClass={'page-link'}
                                        nextPageText={'Next'}
                                        firstPageText={'First'}
                                        lastPageText={'Last'}
                                        innerClass={'pagination'}
                                        activeClass={'active'}
                                        itemClassFirst={'page-item'}
                                        itemClassPrev={'page-item'}
                                        itemClassNext={'page-item'}
                                        itemClassLast={'page-item'}
                                        linkClassFirst={'page-link'}
                                        linkClassPrev={'page-link'}
                                        linkClassNext={'page-link'}
                                        linkClassLast={'page-link'}
                                        hideFirstLastPages={window.innerWidth < 576}
                                        hidePrevNext={window.innerWidth < 576}
                                    />
                                </div> : null
                            }
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}