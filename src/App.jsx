import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ShopVendorList from './pages/Vendors/shop-vendor-list';
import ShopVendorSingle from './pages/Vendors/shop-vendor-single';
import Blog from './pages/Blog/blog';
import Blog2 from './pages/Blog/blog-2';
import BlogList from './pages/Blog/blog-list';
import BlogBig from './pages/Blog/blog-big';
import BlogSingle from './pages/Blog/blog-single';
import BlogSingle2 from './pages/Blog/blog-single-2';
import BlogSingle3 from './pages/Blog/blog-single-3';

function SalemNavbar() {
  const [openVendors, setOpenVendors] = React.useState(false);
  const [openBlogs, setOpenBlogs] = React.useState(false);

  React.useEffect(() => {
    const handleOutside = (e) => {
      if (!e.target.closest('.dropdown')) {
        setOpenVendors(false);
        setOpenBlogs(false);
      }
    };
    window.addEventListener('click', handleOutside);
    return () => window.removeEventListener('click', handleOutside);
  }, []);

  return (
    <header className="bg-dark text-white py-3 shadow-sm sticky-top" style={{ zIndex: 1050 }}>
      <div className="container d-flex flex-wrap align-items-center justify-content-between">
        <Link to="/" className="text-white text-decoration-none fs-4 fw-bold">
          Salem - Vendors & Blog
        </Link>
        <nav className="d-flex gap-3 align-items-center">
          <div className="dropdown position-relative">
            <button
              className="btn btn-outline-light dropdown-toggle btn-sm"
              type="button"
              id="salemVendorsDropdown"
              onClick={() => {
                setOpenVendors((prev) => !prev);
                setOpenBlogs(false);
              }}
            >
              Vendors Pages
            </button>
            <ul
              className={`dropdown-menu shadow ${openVendors ? 'show' : ''}`}
              style={{
                position: 'absolute',
                left: 0,
                top: '100%',
                zIndex: 1060,
                display: openVendors ? 'block' : 'none',
                minWidth: '180px',
              }}
            >
              <li>
                <Link
                  className="dropdown-item"
                  to="/"
                  onClick={() => setOpenVendors(false)}
                >
                  Vendors Listing
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/shop-vendor-single"
                  onClick={() => setOpenVendors(false)}
                >
                  Vendor Single
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown position-relative">
            <button
              className="btn btn-outline-light dropdown-toggle btn-sm"
              type="button"
              id="salemBlogsDropdown"
              onClick={() => {
                setOpenBlogs((prev) => !prev);
                setOpenVendors(false);
              }}
            >
              Blog Pages
            </button>
            <ul
              className={`dropdown-menu dropdown-menu-end shadow ${openBlogs ? 'show' : ''}`}
              style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                zIndex: 1060,
                display: openBlogs ? 'block' : 'none',
                minWidth: '220px',
              }}
            >
              <li><Link className="dropdown-item" to="/blog" onClick={() => setOpenBlogs(false)}>Blog - No Sidebar</Link></li>
              <li><Link className="dropdown-item" to="/blog-2" onClick={() => setOpenBlogs(false)}>Blog - Right Sidebar</Link></li>
              <li><Link className="dropdown-item" to="/blog-list" onClick={() => setOpenBlogs(false)}>Blog List</Link></li>
              <li><Link className="dropdown-item" to="/blog-big" onClick={() => setOpenBlogs(false)}>Blog Category Big</Link></li>
              <li><Link className="dropdown-item" to="/blog-single" onClick={() => setOpenBlogs(false)}>Blog Single - Left Sidebar</Link></li>
              <li><Link className="dropdown-item" to="/blog-single-2" onClick={() => setOpenBlogs(false)}>Blog Single - Right Sidebar</Link></li>
              <li><Link className="dropdown-item" to="/blog-single-3" onClick={() => setOpenBlogs(false)}>Blog Single - No Sidebar</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <SalemNavbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<ShopVendorList />} />
            <Route path="/shop-vendor-list" element={<ShopVendorList />} />
            <Route path="/shop-vendor-single" element={<ShopVendorSingle />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog-2" element={<Blog2 />} />
            <Route path="/blog-list" element={<BlogList />} />
            <Route path="/blog-big" element={<BlogBig />} />
            <Route path="/blog-single" element={<BlogSingle />} />
            <Route path="/blog-single-2" element={<BlogSingle2 />} />
            <Route path="/blog-single-3" element={<BlogSingle3 />} />
            <Route path="/blog/:slug" element={<BlogSingle />} />
            <Route path="/blog-single/:slug" element={<BlogSingle />} />
            <Route path="*" element={<ShopVendorList />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
