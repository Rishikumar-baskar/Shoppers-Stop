import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { getAdminProducts } from "../../actions/productsActions";
import { adminOrders as fetchAdminOrders } from '../../actions/orderActions';
import { Link } from "react-router-dom";

export default function Dashboard() {
    const { products = [] } = useSelector(state => state.productsState || {});
    const { adminOrders = [] } = useSelector(state => state.orderState || {});
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    let outOfStock = 0;
    let lowStock = 0;

    products.forEach(product => {
        if (product.stock === 0) outOfStock++;
        else if (product.stock <= 10) lowStock++;
    });

    let totalAmount = 0;
    let completedOrders = 0;
    let pendingOrders = 0;
    let todayOrders = 0;
    const today = new Date().toDateString();

    adminOrders.forEach(order => {
        totalAmount += order.totalPrice;
        if (order.orderStatus === 'Delivered') completedOrders++;
        else pendingOrders++;
        if (new Date(order.createdAt).toDateString() === today) todayOrders++;
    });

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(fetchAdminOrders());
    }, [dispatch]);

    const recentOrders = adminOrders.slice(0, 5);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', margin: 0, padding: 0 }}>
            {/* Sidebar */}
            <div style={{ flex: '0 0 auto', width: isMobile ? '100%' : '250px', minHeight: '100vh' }}>
                <Sidebar />
            </div>

            {/* Main Content */}
            <div style={{ flex: '1 1 auto', padding: isMobile ? '1rem' : '2rem', backgroundColor: '#f8f9fa', minHeight: '100vh', transition: 'all 0.3s ease', overflow: 'auto' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem', margin: 0, color: '#2c3e50', fontWeight: '600' }}>Dashboard</h1>
                        <p style={{ margin: '0.5rem 0 0 0', color: '#6c757d', fontSize: '0.9rem' }}>
                            Welcome back! Here's what's happening with your store today.
                        </p>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '0.75rem 1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: '0.9rem', color: '#6c757d' }}>
                        <i className="fa fa-calendar" style={{ marginRight: '0.5rem' }}></i>
                        {new Date().toLocaleDateString()}
                    </div>
                </div>

                {/* Key Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {/* Total Revenue */}
                    <div style={{ backgroundColor: '#007bff', borderRadius: '12px', padding: '1.5rem', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', height: '100%', position: 'relative', overflow: 'hidden', minHeight: '120px' }}>
                        <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '3rem', opacity: '0.1' }}>
                            <i className="fa fa-dollar-sign"></i>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '0.9rem', margin: 0, fontWeight: '500', opacity: '0.9' }}>Total Revenue</h4>
                            <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', margin: '0.5rem 0', fontWeight: '700' }}>
                                ${totalAmount.toLocaleString()}
                            </h2>
                            <p style={{ margin: 0, fontSize: '0.8rem', opacity: '0.8' }}>All time sales</p>
                        </div>
                    </div>

                    {/* Total Orders */}
                    <div style={{ backgroundColor: '#28a745', borderRadius: '12px', padding: '1.5rem', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', height: '100%', position: 'relative', overflow: 'hidden', minHeight: '120px' }}>
                        <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '3rem', opacity: '0.1' }}>
                            <i className="fa fa-shopping-basket"></i>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '0.9rem', margin: 0, fontWeight: '500', opacity: '0.9' }}>Total Orders</h4>
                            <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', margin: '0.5rem 0', fontWeight: '700' }}>{adminOrders.length}</h2>
                            <p style={{ margin: 0, fontSize: '0.8rem', opacity: '0.8' }}>{todayOrders} today</p>
                        </div>
                    </div>

                    {/* Products */}
                    <div style={{ backgroundColor: '#17a2b8', borderRadius: '12px', padding: '1.5rem', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', height: '100%', position: 'relative', overflow: 'hidden', minHeight: '120px' }}>
                        <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '3rem', opacity: '0.1' }}>
                            <i className="fa fa-box"></i>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '0.9rem', margin: 0, fontWeight: '500', opacity: '0.9' }}>Products</h4>
                            <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', margin: '0.5rem 0', fontWeight: '700' }}>{products.length}</h2>
                            <p style={{ margin: 0, fontSize: '0.8rem', opacity: '0.8' }}>{lowStock} low stock</p>
                        </div>
                    </div>

                    {/* Out of Stock */}
                    <div style={{ backgroundColor: '#ffc107', borderRadius: '12px', padding: '1.5rem', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', height: '100%', position: 'relative', overflow: 'hidden', minHeight: '120px' }}>
                        <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '3rem', opacity: '0.1' }}>
                            <i className="fa fa-exclamation-triangle"></i>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '0.9rem', margin: 0, fontWeight: '500', opacity: '0.9' }}>Out of Stock</h4>
                            <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', margin: '0.5rem 0', fontWeight: '700' }}>{outOfStock}</h2>
                            <p style={{ margin: 0, fontSize: '0.8rem', opacity: '0.8' }}>Need attention</p>
                        </div>
                    </div>
                </div>

                {/* Orders & Quick Actions */}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: '1rem' }}>
                    <>
                        {/* Recent Orders */}
                        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: '100%', minHeight: '400px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h4 style={{ margin: 0, color: '#2c3e50', fontWeight: '600' }}>Recent Orders</h4>
                                <Link to="/admin/orders" style={{ color: '#007bff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>
                                    View All <i className="fa fa-angle-right"></i>
                                </Link>
                            </div>

                            {recentOrders.length > 0 ? (
                                <div>
                                    {recentOrders.map((order, index) => (
                                        <div key={order._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: index < recentOrders.length - 1 ? '1px solid #e9ecef' : 'none' }}>
                                            <div>
                                                <p style={{ margin: 0, fontWeight: '500', color: '#2c3e50' }}>Order #{order._id.slice(-8)}</p>
                                                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#6c757d' }}>
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ margin: 0, fontWeight: '600', color: '#28a745' }}>${order.totalPrice}</p>
                                                <span style={{
                                                    backgroundColor: order.orderStatus === 'Delivered' ? '#d4edda' : '#fff3cd',
                                                    color: order.orderStatus === 'Delivered' ? '#155724' : '#856404',
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '4px',
                                                    fontSize: '0.7rem',
                                                    fontWeight: '500'
                                                }}>
                                                    {order.orderStatus}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '2rem', color: '#6c757d' }}>
                                    <i className="fa fa-shopping-basket" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
                                    <p>No orders yet</p>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: '100%', minHeight: '400px' }}>
                            <h4 style={{ margin: '0 0 1rem 0', color: '#2c3e50', fontWeight: '600' }}>Quick Actions</h4>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <Link to="/admin/products/create" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '8px', textDecoration: 'none', color: '#2c3e50' }}>
                                    <div style={{ backgroundColor: '#007bff', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.9rem' }}>
                                        <i className="fa fa-plus"></i>
                                    </div>
                                    <span style={{ fontWeight: '500' }}>Add New Product</span>
                                </Link>

                                <Link to="/admin/orders" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '8px', textDecoration: 'none', color: '#2c3e50' }}>
                                    <div style={{ backgroundColor: '#28a745', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.9rem' }}>
                                        <i className="fa fa-shopping-basket"></i>
                                    </div>
                                    <span style={{ fontWeight: '500' }}>Manage Orders</span>
                                </Link>

                                <Link to="/admin/users" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '8px', textDecoration: 'none', color: '#2c3e50' }}>
                                    <div style={{ backgroundColor: '#17a2b8', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.9rem' }}>
                                        <i className="fa fa-users"></i>
                                    </div>
                                    <span style={{ fontWeight: '500' }}>View Users</span>
                                </Link>
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </div>
    );
}
