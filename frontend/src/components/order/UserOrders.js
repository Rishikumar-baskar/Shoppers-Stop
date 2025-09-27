import { Fragment, useEffect } from 'react'
import MetaData from '../layouts/MetaData';
import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux';
import { userOrders as userOrdersAction } from '../../actions/orderActions';
import { Link } from 'react-router-dom';

export default function UserOrders() {
    const dispatch = useDispatch();
    const { userOrders = [] } = useSelector(state => state.orderState);

    useEffect(() => {
        dispatch(userOrdersAction());  // Call the action here!
    }, [dispatch]);

    // Debug logs removed - orders should now display correctly

    const setOrders = () => {
        const data = {
            columns: [
                { label: "Order ID", field: 'id', sort: "asc" },
                { label: "Number of Items", field: 'numOfItems', sort: "asc" },
                { label: "Amount", field: 'amount', sort: "asc" },
                { label: "Status", field: 'status', sort: "asc" },
                { label: "Actions", field: 'actions', sort: "asc" }
            ],
            rows: []
        }

        userOrders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus.includes('Delivered') ? 
                    <p style={{color: 'green'}}>{order.orderStatus}</p> :
                    <p style={{color: 'red'}}>{order.orderStatus}</p>,
                actions: (
                    <Link to={`/order/${order._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
                )
            });
        });

        return data;
    }

    return (
        <Fragment>
            <MetaData title="My Orders" />
            <div style={{ 
                minHeight: '100vh', 
                backgroundColor: '#f8f9fa', 
                padding: '2rem 0' 
            }}>
                <div className="container">
                    <h1 style={{ 
                        fontSize: window.innerWidth < 576 ? '1.5rem' : '2rem',
                        fontWeight: '600',
                        color: '#2c3e50',
                        textAlign: 'center',
                        marginBottom: '2rem'
                    }}>
                        My Orders
                    </h1>
                    
                    {userOrders.length === 0 ? (
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '3rem 2rem',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center',
                            maxWidth: '500px',
                            margin: '0 auto'
                        }}>
                            <i className="fa fa-shopping-bag" style={{ 
                                fontSize: '4rem', 
                                color: '#6c757d',
                                marginBottom: '1rem'
                            }}></i>
                            <h3 style={{ 
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                color: '#2c3e50',
                                marginBottom: '1rem'
                            }}>
                                No Orders Yet
                            </h3>
                            <p style={{ 
                                color: '#6c757d',
                                marginBottom: '2rem'
                            }}>
                                You haven't placed any orders yet. Start shopping to see your orders here.
                            </p>
                            <Link 
                                to="/" 
                                style={{
                                    backgroundColor: '#ff6b35',
                                    color: 'white',
                                    padding: '0.75rem 2rem',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#e55a2b'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b35'}
                            >
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            overflow: 'auto'
                        }}>
                            <div style={{ 
                                overflow: 'auto',
                                maxWidth: '100%'
                            }}>
                                <MDBDataTable
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                    data={setOrders()}
                                    responsive
                                    noBottomColumns
                                    displayEntries={false}
                                    info={false}
                                    paging={false}
                                    searching={false}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
}
