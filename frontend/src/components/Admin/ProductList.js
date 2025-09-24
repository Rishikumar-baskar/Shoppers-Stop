import { Fragment, useEffect, useState } from "react"
import { Button, Form, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteProduct, getAdminProducts } from "../../actions/productActions"
import { clearError, clearProductDeleted } from "../../slices/productSlice"
import Loader from '../layouts/Loader';
import {toast } from 'react-toastify'
import Sidebar from "./Sidebar"

export default function ProductList() {
    const { products = [], loading = true, error, productsCount }  = useSelector(state => state.productsState)
    const { isProductDeleted, error:productError }  = useSelector(state => state.productState)
    const dispatch = useDispatch();

    // State for search and pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // Filter and paginate products
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product._id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalFilteredProducts = filteredProducts.length;
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);


    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    }

    // Handle entries per page change
    const handleEntriesChange = (e) => {
        setEntriesPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to first page when changing entries
    }

    // Calculate total pages
    const totalPages = Math.ceil(totalFilteredProducts / entriesPerPage);

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        if(error || productError) {
            toast(error || productError, {
                position: "bottom-center",
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
        if(isProductDeleted) {
            toast('Product Deleted Succesfully!',{
                type: 'success',
                position: "bottom-center",
                onOpen: () => dispatch(clearProductDeleted())
            })
            return;
        }

        dispatch(getAdminProducts)
    },[dispatch, error, isProductDeleted])


    return (
        <div className="row">
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>
        <div className="col-12 col-md-10 admin-main-content">
            <h1 className="my-4">Product List</h1>

            {loading ? <Loader/> :
            <Fragment>
                {/* Search and Show Entries Controls */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                        <label className="me-2 mb-0">Show</label>
                        <Form.Select
                            value={entriesPerPage}
                            onChange={handleEntriesChange}
                            style={{ width: '80px' }}
                            className="me-3"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </Form.Select>
                        <label className="mb-0">entries</label>
                    </div>

                    <div className="d-flex align-items-center">
                        <label className="me-2 mb-0">Search:</label>
                        <Form.Control
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{ width: '250px' }}
                        />
                    </div>
                </div>

                {/* Products Table */}
                <div className="table-responsive">
                    <Table striped bordered hover className="mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProducts.length > 0 ? (
                                paginatedProducts.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <Link to={`/admin/product/${product._id}`} className="btn btn-primary btn-sm me-2">
                                                <i className="fa fa-pencil"></i>
                                            </Link>
                                            <Button
                                                onClick={e => deleteHandler(e, product._id)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                <i className="fa fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        {searchTerm ? 'No products found matching your search.' : 'No products available.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

                {/* Custom Pagination */}
                {totalFilteredProducts > 0 && totalPages > 1 && (
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div>
                            Showing {startIndex + 1} to {Math.min(endIndex, totalFilteredProducts)} of {totalFilteredProducts} entries
                            {searchTerm && ` (filtered from ${products.length} total entries)`}
                        </div>

                        <div className="d-flex">
                            <Button
                                variant="outline-primary"
                                size="sm"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="me-1"
                            >
                                Previous
                            </Button>

                            {/* Page Numbers */}
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <Button
                                        key={pageNum}
                                        variant={currentPage === pageNum ? "primary" : "outline-primary"}
                                        size="sm"
                                        onClick={() => setCurrentPage(pageNum)}
                                        className="me-1"
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            })}

                            <Button
                                variant="outline-primary"
                                size="sm"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </Fragment>
            }
        </div>
    </div>
    )
}