import React, { useState, useContext, useMemo, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useLocation } from "react-router-dom";
import { t } from "../../data/salemTranslations";

import ProductCard from "../../components/ProductCard/ProductCard";
import { buildVendorCatalog } from "./shop-vendor-list";

import "./shop-vendor-single.css"; 
import "../Shop/ShopGrid.css";

const tagOptions = [
    "Games",
    "Electronics",
    "Video",
    "Cellphone",
    "Indoor",
    "VGA Card",
    "USB",
    "Lightning",
    "Camera",
    "Window",
    "Air Vent",
    "Bedroom",
    "Laptop",
    "Dashboard",
    "Keyboard",
];

const specialOffers = [
    { id: "onSale", label: "On sale" },
    { id: "freeShipping", label: "FREE shipping" },
    { id: "bigDeals", label: "Big deals" },
    { id: "shopMall", label: "Shop Mall" },
];

const shippingOptions = [
    { id: "oneDay", label: "1 business day" },
    { id: "threeDays", label: "1–3 business days" },
    { id: "oneWeek", label: "In 1 week" },
    { id: "shippingNow", label: "Shipping now" },
];

const orderingOptions = [
    { id: "giftCards", label: "Accepts gift cards" },
    { id: "customizable", label: "Customizable" },
    { id: "giftWrap", label: "Can be gift-wrapped" },
    { id: "installment", label: "Installment 0%" },
];

const materialOptions = [
    "Nylon",
    "Tempered Glass",
    "Liquid Silicone Rubber",
    "Aluminium Alloy",
];

import featured from "../../img/vendor/featured.png";
import returns from "../../img/vendor/return.svg";
import payment from "../../img/vendor/payment.svg";
import locationIcon from "../../img/vendor/location.svg";
import phoneIcon from "../../img/vendor/phone.svg";


import delivery from "../../img/icons/delivery.svg";
import support from "../../img/icons/support.svg";
import voucher from "../../img/icons/voucher.svg";
import return1 from "../../img/icons/return.svg";
import secure from "../../img/icons/secure.svg";


import star from "../../img/icons/star.svg";

function ShopVendorSingle() {

    
    
    const vendorCatalog = useMemo(() => buildVendorCatalog(t), [t]);
    
    const allProducts = [
      { id: 1, title: "Dell OptiPlex 3000 Micro Desktop Computer", price: 150, oldPrice: 200, brand: "Dell", category: "Computers", discount: 25, reviews: 48, sold: 14, available: 30, features: ["Intel Core i5", "8GB DDR4 RAM", "256GB NVMe SSD"], image: "https://wp.alithemes.com/html/ecom/demo/assets/imgs/page/homepage1/sp1.png" },
      { id: 2, title: "HP Pavilion Gaming Laptop 15.6 inch FHD", price: 320, oldPrice: 380, brand: "HP", category: "Computers", hot: "Hot", reviews: 62, sold: 28, available: 15, features: ["AMD Ryzen 5", "GTX 1650 4GB", "144Hz Display"], image: "https://wp.alithemes.com/html/ecom/demo/assets/imgs/page/homepage1/sp2.png" },
      { id: 3, title: "Apple iPad Pro 11-inch M2 Chip Liquid Retina", price: 540, oldPrice: 620, brand: "Apple", category: "Electronics", new: "New", reviews: 89, sold: 45, available: 20, features: ["Apple M2 Chip", "128GB Storage", "Liquid Retina"], image: "https://wp.alithemes.com/html/ecom/demo/assets/imgs/page/homepage1/sp3.png" },
      { id: 4, title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones", price: 280, oldPrice: 350, brand: "Sony", category: "Electronics", discount: 20, reviews: 112, sold: 60, available: 18, features: ["Active Noise Canceling", "30hr Battery", "Hi-Res Audio"], image: "https://wp.alithemes.com/html/ecom/demo/assets/imgs/page/homepage1/sp4.png" },
      { id: 5, title: "Samsung Galaxy Watch 5 Pro Bluetooth Smartwatch", price: 190, oldPrice: 230, brand: "Samsung", category: "Electronics", hot: "Hot", reviews: 54, sold: 22, available: 25, features: ["Sapphire Crystal", "GPS Tracking", "Body Composition"], image: "https://wp.alithemes.com/html/ecom/demo/assets/imgs/page/homepage1/sp5.png" },
      { id: 6, title: "Logitech MX Master 3S Wireless Performance Mouse", price: 95, oldPrice: 120, brand: "Logitech", category: "Computers", reviews: 76, sold: 50, available: 35, features: ["8K DPI Sensor", "Quiet Clicks", "MagSpeed Scroll"], image: "https://wp.alithemes.com/html/ecom/demo/assets/imgs/page/homepage1/sp6.png" },
      { id: 7, title: "Canon EOS R50 Mirrorless Camera Body", price: 680, oldPrice: 750, brand: "Canon", category: "Electronics", new: "New", reviews: 33, sold: 12, available: 8, features: ["24.2 MP Sensor", "4K 30p Video", "Dual Pixel AF II"], image: "https://wp.alithemes.com/html/ecom/demo/assets/imgs/page/homepage1/sp7.png" },
      { id: 8, title: "Bose SoundLink Flex Bluetooth Portable Speaker", price: 110, oldPrice: 140, brand: "Bose", category: "Electronics", discount: 21, reviews: 95, sold: 38, available: 22, features: ["IP67 Waterproof", "PositionIQ Tech", "12hr Battery"], image: "https://wp.alithemes.com/html/ecom/demo/assets/imgs/page/homepage1/sp8.png" }
    ];
  
    const safeProducts = allProducts || [];
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const vendorIdParam = Number(searchParams.get("vendorId"));
    const vendor = vendorCatalog.find(v => v.id === vendorIdParam) || vendorCatalog[0];

    
    const [email, setEmail] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All categories");
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [ratingFilter, setRatingFilter] = useState(0);
    const [selectedSort, setSelectedSort] = useState("latest");
    const [itemsPerPage, setItemsPerPage] = useState(16);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewType, setViewType] = useState("grid");
    const [activeTags, setActiveTags] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [selectedSpecialOffers, setSelectedSpecialOffers] = useState([]);
    const [selectedShipping, setSelectedShipping] = useState([]);
    const [selectedOrdering, setSelectedOrdering] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);

 

    
    const priceRangeOptions = [
        { id: "free-100", label: t.sidebar.list2.free, min: 0, max: 100 },
        { id: "100-200", label: "$100 - $200", min: 100, max: 200 },
        { id: "200-400", label: "$200 - $400", min: 200, max: 400 },
        { id: "400-600", label: "$400 - $600", min: 400, max: 600 },
        { id: "600-800", label: "$600 - $800", min: 600, max: 800 },
        { id: "over-1000", label: t.sidebar.list2.over, min: 1000, max: Infinity },
    ];

    const brandList = useMemo(() => {
        const unique = new Set();
        safeProducts.forEach(product => {
            if (product.brand) {
                unique.add(product.brand);
            }
        });
        return Array.from(unique);
    }, [safeProducts]);

    const toggleBrand = (brand) => {
        setSelectedBrands(prev => prev.includes(brand) ? prev.filter(item => item !== brand) : [...prev, brand]);
    };

    const toggleTag = (tag) => {
        setActiveTags(prev => prev.includes(tag) ? prev.filter(item => item !== tag) : [...prev, tag]);
    };

    const toggleListState = (setter, value) => {
        setter(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
    };

    
    const priceBounds = useMemo(() => {
        const max = safeProducts.length ? Math.max(...safeProducts.map(p => p.price || 0)) : 1000;
        return {
            min: 0,
            max: max || 1000
        };
    }, [safeProducts]);

    
    const [priceLimit, setPriceLimit] = useState(priceBounds.max);

    useEffect(() => {
        setPriceLimit(priceBounds.max);
    }, [priceBounds.max]);

    
    const activePriceFilters = priceRangeOptions.filter(option => selectedPriceRanges.includes(option.id));

    
    const filteredProducts = useMemo(() => {
        let filtered = safeProducts.filter(product => product.price <= priceLimit);

        if (selectedCategory !== "All categories") {
            filtered = filtered.filter(product => (product.category || product.section || "Other") === selectedCategory);
        }

        if (selectedBrands.length) {
            filtered = filtered.filter(product => selectedBrands.includes(product.brand));
        }

        if (activePriceFilters.length) {
            filtered = filtered.filter(product =>
                activePriceFilters.some(range => product.price >= range.min && product.price <= (range.max === Infinity ? product.price : range.max))
            );
        }

        if (selectedColors.length) {
            filtered = filtered.filter(product => {
                
                if (Array.isArray(product.colors)) {
                    return selectedColors.some(color => product.colors.includes(color));
                } else if (product.color) {
                    return selectedColors.includes(product.color);
                }
                
                return false;
            });
        }

        if (activeTags.length) {
            filtered = filtered.filter(product => {
                const haystack = `${product.section || product.category || ""} ${product.title || ""}`.toLowerCase();
                return activeTags.every(tag => haystack.includes(tag.toLowerCase()));
            });
        }

        if (ratingFilter > 0) {
            filtered = filtered.filter(product => {
                const ratingScore = Math.min(5, Math.max(1, Math.ceil((product.reviewsCount || 0) / 20)));
                return ratingScore >= ratingFilter;
            });
        }

        filtered = [...filtered];

        switch (selectedSort) {
            case "priceLow":
                filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
                break;
            case "priceHigh":
                filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
                break;
            case "oldest":
                filtered.sort((a, b) => (a.id || 0) - (b.id || 0));
                break;
            default:
                filtered.sort((a, b) => (b.id || 0) - (a.id || 0));
        }

        return filtered;
    }, [
        safeProducts,
        priceLimit,
        selectedCategory,
        selectedBrands,
        activePriceFilters,
        activeTags,
        ratingFilter,
        selectedSort,
        selectedColors
    ]);

    
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, selectedBrands, selectedPriceRanges, priceLimit, ratingFilter, selectedSort, itemsPerPage, activeTags, selectedColors]);

    
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage, itemsPerPage]);

    
    const deliveryBoxes = [
        { id: 1, icon: delivery, title: t.about.deliveryBoxes.box1.title, subtitle: t.about.deliveryBoxes.box1.subtitle },
        { id: 2, icon: support, title: t.about.deliveryBoxes.box2.title, subtitle: t.about.deliveryBoxes.box2.subtitle },
        { id: 3, icon: voucher, title: t.about.deliveryBoxes.box3.title, subtitle: t.about.deliveryBoxes.box3.subtitle },
        { id: 4, icon: return1, title: t.about.deliveryBoxes.box4.title, subtitle: t.about.deliveryBoxes.box4.subtitle },
        { id: 5, icon: secure, title: t.about.deliveryBoxes.box5.title, subtitle: t.about.deliveryBoxes.box5.subtitle },
    ];

    
    const showingStart = filteredProducts.length ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const showingEnd = Math.min(currentPage * itemsPerPage, filteredProducts.length);

    
    const pageNumbers = Array.from({ length: totalPages }, (_, idx) => idx + 1);
    

 
    
    return (
        <main className="main shop-grid-page">

            
            <section className="section-box">
                <div className="breadcrumbs-div">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><Link className="font-xs color-gray-1000" to="/">{t.breadcrumb.home}</Link></li>
                            <li><a className="font-xs color-gray-500">{t.breadcrumb.jsc}</a></li>
                        </ul>
                    </div>
                </div>
            </section>
            
         

            
            <section className="section-box shop-template mt-30 mb-80">
                <div className="container">

                    <div className="d-flex box-banner-vendor">
                        <div className="vendor-left">
                            <div className="banner-vendor">
                                <img src={featured} alt={vendor.name} className="img-fluid" />
                                <div className="d-flex box-info-vendor">
                                    <div className="avarta">
                                        <img className="mb-5 img-fluid" src={vendor.image} alt={vendor.name} />
                                        <a className="btn btn-buy font-xs" href="shop-fullwidth.html">
                                            {vendor.products.toLocaleString()} {t.vendor.products}
                                        </a>
                                    </div>
                                    <div className="info-vendor">
                                        <h4 className="mb-5 img-fluid">{vendor.name}</h4>
                                        <span className="font-xs color-gray-500 mr-20">{t.vendor.member} {vendor.memberSince}</span>
                                        <div className="rating d-inline-block">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <img key={`vendor-star-${index}`} src={star} alt="Rating star" className="img-fluid" />
                                            ))}
                                            <span className="font-xs color-gray-500"> ({vendor.reviews})</span>
                                        </div>
                                    </div>
                                    <div className="vendor-contact">
                                        <div className="row">
                                            <div className="col-xl-7 col-lg-12">
                                                <div className="d-inline-block font-md color-gray-500 location mb-10">
                                                    {vendor.address}
                                                </div>
                                            </div>
                                            <div className="col-xl-5 col-lg-12">
                                                <div className="d-inline-block font-md color-gray-500 phone">
                                                    {vendor.phone}
                                                    {vendor.secondaryPhone && (
                                                        <>
                                                            <br />
                                                            {vendor.secondaryPhone}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="vendor-right">
                            <div className="box-featured-product">
                                <div className="item-featured">
                                    <div className="featured-icon">
                                        <img src={delivery} alt="Ecom" className="img-fluid" />
                                    </div>
                                    <div className="featured-info">
                                        <span className="font-sm-bold color-gray-1000">{t.about.deliveryBoxes.box1.title}</span>
                                        <p className="font-sm color-gray-500 font-medium">{t.about.deliveryBoxes.box1.subtitle}</p>
                                    </div>
                                </div>
                                <div className="item-featured">
                                    <div className="featured-icon">
                                        <img src={support} alt="Ecom" className="img-fluid" />
                                    </div>
                                    <div className="featured-info">
                                        <span className="font-sm-bold color-gray-1000">{t.about.deliveryBoxes.box2.title}</span>
                                        <p className="font-sm color-gray-500 font-medium">{t.about.deliveryBoxes.box2.subtitle}</p>
                                    </div>
                                </div>
                                <div className="item-featured">
                                    <div className="featured-icon">
                                        <img src={returns} alt="Ecom" className="img-fluid" />
                                    </div>
                                    <div className="featured-info">
                                        <span className="font-sm-bold color-gray-1000">{t.about.deliveryBoxes.box3.title}</span>
                                        <p className="font-sm color-gray-500 font-medium">{t.about.deliveryBoxes.box3.subtitle}</p>
                                    </div>
                                </div>
                                <div className="item-featured">
                                    <div className="featured-icon">
                                        <img src={payment} alt="Ecom" className="img-fluid" />
                                    </div>
                                    <div className="featured-info">
                                        <span className="font-sm-bold color-gray-1000">{t.about.deliveryBoxes.box4.title}</span>
                                        <p className="font-sm color-gray-500 font-medium">{t.about.deliveryBoxes.box4.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row"> 
                        <div className="col-lg-12">

                            
                            <div className="box-filters">
                                <div className="filter-button">
                                    <button className="btn btn-filter" onClick={() => setShowAdvancedFilters(true)}>{t.vendor.all}{t.vendor.filter}</button>
                                </div>
                                <div className="filter-info">
                                    <span className="font-sm color-gray-900">
                                        {t.vendor.show1} {showingStart || 0}–{showingEnd || 0} {t.vendor.show2} {filteredProducts.length} {t.vendor.show3}
                                    </span>
                                    <div className="filter-selectors">
                                        <label>
                                            {t.vendor.sort}
                                            <select className="color-gray-900" value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
                                                <option value="latest">{t.vendorSingle.sort1}</option>
                                                <option value="oldest">{t.vendorSingle.sort2}</option>
                                                <option value="priceLow">{t.vendorSingle.sort3}</option>
                                                <option value="priceHigh">{t.vendorSingle.sort4}</option>
                                            </select>
                                        </label>
                                        <label className="ms-3">
                                            {t.vendor.show}
                                            <select className="color-gray-900" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                                                <option value={12}>{t.vendor.showOptions.one}</option>
                                                <option value={16}>{t.vendor.showOptions.four}</option>
                                                <option value={24}>{t.vendor.showOptions.two}</option>
                                            </select>
                                        </label>
                                        <div className="view-toggle ms-3">
                                            <a className={`grid ${viewType === "grid" ? "active" : ""}`} onClick={() => setViewType("grid")} aria-label="Grid view"></a>
                                            <a className={`list ${viewType === "list" ? "active" : ""}`} onClick={() => setViewType("list")} aria-label="List view"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                            <div className={`row ${viewType === "list" ? "display-list" : ""}`}>
                                {paginatedProducts.length ? (
                                    paginatedProducts.map(product => (
                                        <div key={product.id} className={viewType === "list" ? "col-12 mb-30" : "col-lg-3 col-md-4 col-sm-6 col-12 mb-30"}>
                                            <ProductCard product={product} hideCountdown={true} showCartAlways={true} />
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-products font-sm color-gray-600">{t.vendorSingle.noProduct}</p>
                                )}
                            </div>

                            <nav className="pagination-wrapper">
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                        <button className="page-link page-prev" onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} aria-label="Previous page"></button>
                                    </li>
                                    {pageNumbers.map(number => (
                                        <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(number)}>{number}</button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                        <button className="page-link page-next" onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} aria-label="Next page"></button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
            </section>
            
         

            
            <section className="section-box">
                <div className="container">
                    <div
                        className={`advanced-filters-modal-overlay ${showAdvancedFilters ? "open" : ""}`}
                        onClick={() => setShowAdvancedFilters(false)}
                    />
                    <div className={`advanced-filters-modal color-gray-700 ${showAdvancedFilters ? "open" : ""}`}>
                        <div className="modal-header">
                            <h5 className="color-brand-3">Advanced Filters</h5>
                            <button className="btn-close" onClick={() => setShowAdvancedFilters(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-column">
                                <h6 className="color-brand-3">Brands</h6>
                                {brandList.map(brand => (
                                    <label key={brand} className="cb-container">
                                        <input
                                            type="checkbox"
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => toggleBrand(brand)}
                                        />
                                        <span>{brand}</span>
                                        <span className="checkmark" />
                                    </label>
                                ))}
                            </div>
                            <div className="modal-column">
                                <h6 className="color-brand-3">Special offers</h6>
                                {specialOffers.map(offer => (
                                    <label key={offer.id} className="cb-container">
                                        <input
                                            type="checkbox"
                                            checked={selectedSpecialOffers.includes(offer.id)}
                                            onChange={() => toggleListState(setSelectedSpecialOffers, offer.id)}
                                        />
                                        <span>{offer.label}</span>
                                        <span className="checkmark" />
                                    </label>
                                ))}
                                <h6 className="mt-30 color-brand-3">Ready to ship in</h6>
                                {shippingOptions.map(option => (
                                    <label key={option.id} className="cb-container">
                                        <input
                                            type="checkbox"
                                            checked={selectedShipping.includes(option.id)}
                                            onChange={() => toggleListState(setSelectedShipping, option.id)}
                                        />
                                        <span>{option.label}</span>
                                        <span className="checkmark" />
                                    </label>
                                ))}
                            </div>
                            <div className="modal-column">
                                <h6 className="color-brand-3">Ordering options</h6>
                                {orderingOptions.map(option => (
                                    <label key={option.id} className="cb-container">
                                        <input
                                            type="checkbox"
                                            checked={selectedOrdering.includes(option.id)}
                                            onChange={() => toggleListState(setSelectedOrdering, option.id)}
                                        />
                                        <span>{option.label}</span>
                                        <span className="checkmark" />
                                    </label>
                                ))}
                                <h6 className="mt-30 color-brand-3">Rating</h6>
                                {[5, 4, 3, 2, 1].map(value => (
                                    <button
                                        key={value}
                                        className={`rating-toggle ${ratingFilter === value ? "active" : ""}`}
                                        onClick={() => setRatingFilter(prev => (prev === value ? 0 : value))}
                                    >
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <span key={index} className={index < value ? "star active" : "star"}>★</span>
                                        ))}
                                        <span className="font-xs color-gray-500">{value} stars</span>
                                    </button>
                                ))}
                            </div>
                            <div className="modal-wide-column">
                                <h6 className="color-brand-3">Material</h6>
                                <div className="material-list">
                                    {materialOptions.map(material => (
                                        <label key={material} className="cb-container">
                                            <input
                                                type="checkbox"
                                                checked={selectedMaterials.includes(material)}
                                                onChange={() => toggleListState(setSelectedMaterials, material)}
                                            />
                                            <span>{material}</span>
                                            <span className="checkmark" />
                                        </label>
                                    ))}
                                </div>
                                <h6 className="mt-30 color-brand-3">Product tags</h6>
                                <div className="tag-list">
                                    {tagOptions.slice(0, 9).map(tag => (
                                        <button
                                            key={tag}
                                            className={`btn-tag color-brand-3 ${activeTags.includes(tag) ? "active" : ""}`}
                                            onClick={() => toggleTag(tag)}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer pt-3" style={{borderTop: "1px solid #dee2e6"}}>
                            <button 
                             className="btn btn-buy" 
                             onClick={() => setShowAdvancedFilters(false)}
                             style={{width: "15%"}}
                            >
                                Apply Filter
                            </button>
                            <button
                                className="btn color-gray-700 fw-bold"
                                onClick={() => {
                                    setSelectedSpecialOffers([]);
                                    setSelectedShipping([]);
                                    setSelectedOrdering([]);
                                    setSelectedMaterials([]);
                                    setActiveTags([]);
                                }}
                            >
                                Reset Filter
                            </button>
                        </div>
                    </div>
                </div>
            </section>

         

            
            <section className="section-box section-delivery mb-50">
                <div className="container">
                    <ul className="list-col-5">
                        {deliveryBoxes.map(box => (
                            <li key={box.id}>
                                <div className="item-list">
                                    <div className="icon-left">
                                        <img src={box.icon} alt={box.title} className="img-fluid" />
                                    </div>
                                    <div className="info-right">
                                        <h5 className="font-lg-bold color-gray-1100">{box.title}</h5>
                                        <p className="font-sm color-gray-500">{box.subtitle}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            
         

            
            <section className="section-box box-newsletter">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 col-md-7 col-sm-12">
                        <h3 className="color-white">
                            {t.about.newsletter.title}  
                            <span className="color-warning" style={{margin: "0 5px"}}>
                                10%
                            </span>
                            {t.about.newsletter.discount}
                        </h3>
                        <p className="font-lg color-white">
                            {t.about.newsletter.des}
                            <span className="font-lg-bold" style={{marginLeft: "5px"}}>
                                {t.about.newsletter.highlight}
                            </span>
                        </p>
                    </div>
                    <div className="col-lg-4 col-md-5 col-sm-12">
                        <div className="box-form-newsletter mt-15">
                            <form className="form-newsletter" onSubmit={(e) => e.preventDefault()}>
                                <input 
                                 className="input-newsletter font-xs" 
                                 type="email" 
                                 placeholder={t.about.newsletter.emailPlaceholder}
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                />
                                <button className="btn btn-brand-2">
                                    {t.about.newsletter.btnText}
                                </button>
                            </form>
                        </div>
                    </div>
                  </div>
                </div>
            </section>

        </main>
    );
}

export default ShopVendorSingle;
