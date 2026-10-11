import React, { useState, useContext, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { t } from "../../data/salemTranslations";

import "./shop-vendor-list.css";

import delivery from "../../img/icons/delivery.svg";
import support from "../../img/icons/support.svg";
import voucher from "../../img/icons/voucher.svg";
import return1 from "../../img/icons/return.svg";
import secure from "../../img/icons/secure.svg";


import aslan from "../../img/vendor/aslan.png";
import asembly from "../../img/vendor/asembly.png";
import elmado from "../../img/vendor/elmado.png";
import costctrl from "../../img/vendor/costctrl.png";
import futur from "../../img/vendor/futur.png";
import fasfox from "../../img/vendor/fasfox.png";
import market from "../../img/vendor/market.png";
import tropper from "../../img/vendor/tropper.png";
import location from "../../img/vendor/location.svg";
import phone from "../../img/vendor/phone.svg";


import star from "../../img/icons/star.svg";

const vendorCatalogTemplate = [
    {
        id: 1,
        getName: (t) => t.vendor.card1.title1,
        image: futur,
        products: 360,
        memberSince: 2012,
        getAddress: (t) => t.vendor.card1.address1,
        phone: "(+91) 540-025-124553",
        reviews: 65,
        addedAt: "2025-12-02T10:15:00Z",
    },
    {
        id: 2,
        getName: (t) => t.vendor.card2.title2,
        image: elmado,
        products: 284,
        memberSince: 2013,
        getAddress: (t) => t.vendor.card2.address2,
        phone: "(+1) 212-555-0114",
        reviews: 48,
        addedAt: "2025-11-21T08:30:00Z",
    },
    {
        id: 3,
        getName: (t) => t.vendor.card3.title3,
        image: costctrl,
        products: 412,
        memberSince: 2011,
        getAddress: (t) => t.vendor.card3.address3,
        phone: "(+44) 20-7946-0321",
        reviews: 52,
        addedAt: "2025-10-12T14:45:00Z",
    },
    {
        id: 4,
        getName: (t) => t.vendor.card4.title4,
        image: fasfox,
        products: 289,
        memberSince: 2014,
        getAddress: (t) => t.vendor.card4.address4,
        phone: "(+61) 2-9374-3244",
        reviews: 74,
        addedAt: "2025-12-01T09:00:00Z",
    },
    {
        id: 5,
        getName: (t) => t.vendor.card5.title5,
        image: tropper,
        products: 198,
        memberSince: 2015,
        getAddress: (t) => t.vendor.card5.address5,
        phone: "(+49) 30-1234-5567",
        reviews: 41,
        addedAt: "2025-11-28T16:20:00Z",
    },
    {
        id: 6,
        getName: (t) => t.vendor.card6.title6,
        image: asembly,
        products: 246,
        memberSince: 2016,
        getAddress: (t) => t.vendor.card6.address6,
        phone: "(+971) 4-555-7860",
        reviews: 59,
        addedAt: "2025-11-05T07:50:00Z",
    },
    {
        id: 7,
        getName: (t) => t.vendor.card7.title7,
        image: aslan,
        products: 178,
        memberSince: 2012,
        getAddress: (t) => t.vendor.card7.address7,
        phone: "(+33) 1-4020-3344",
        reviews: 84,
        addedAt: "2025-10-26T11:10:00Z",
    },
    {
        id: 8,
        getName: (t) => t.vendor.card8.title8,
        image: market,
        products: 538,
        memberSince: 2010,
        getAddress: (t) => t.vendor.card8.address8,
        phone: "(+81) 3-3345-9988",
        reviews: 51,
        addedAt: "2025-09-30T15:40:00Z",
    },
    {
        id: 9,
        getName: (t) => t.vendor.card9.title9,
        image: futur,
        products: 421,
        memberSince: 2019,
        getAddress: (t) => t.vendor.card9.address9,
        phone: "(+91) 22-5550-1122",
        reviews: 69,
        addedAt: "2025-11-10T18:05:00Z",
    },
    {
        id: 10,
        getName: (t) => t.vendor.card10.title10,
        image: elmado,
        products: 312,
        memberSince: 2018,
        getAddress: (t) => t.vendor.card10.address10,
        phone: "(+52) 55-5533-1212",
        reviews: 38,
        addedAt: "2025-08-18T13:25:00Z",
    },
    {
        id: 11,
        getName: (t) => t.vendor.card11.title11,
        image: costctrl,
        products: 265,
        memberSince: 2017,
        getAddress: (t) => t.vendor.card11.address11,
        phone: "(+27) 21-555-8899",
        reviews: 46,
        addedAt: "2025-08-25T12:00:00Z",
    },
    {
        id: 12,
        getName: (t) => t.vendor.card12.title12,
        image: fasfox,
        products: 208,
        memberSince: 2020,
        getAddress: (t) => t.vendor.card12.address12,
        phone: "(+1) 415-555-3478",
        reviews: 58,
        addedAt: "2025-09-05T14:55:00Z",
    },
];

export const buildVendorCatalog = (t) =>
    vendorCatalogTemplate.map(({ getName, getAddress, ...rest }) => ({
        ...rest,
        name: getName(t),
        address: getAddress(t),
    }));

const sortOptionTemplates = [
    { value: "latest", getLabel: (t) => t.vendor.sortOptions.one },
    { value: "oldest", getLabel: (t) => t.vendor.sortOptions.two },
    { value: "reviews", getLabel: (t) => t.vendor.sortOptions.three },
];

const showOptionTemplates = [
    { value: 12, getLabel: (t) => t.vendor.showOptions.one },
    { value: 24, getLabel: (t) => t.vendor.showOptions.two },
    { value: 48, getLabel: (t) => t.vendor.showOptions.three },
];

function ShopVendorList() {

    
    
    const vendorCatalog = useMemo(() => buildVendorCatalog(t), [t]);
    const sortOptions = useMemo(
        () =>
            sortOptionTemplates.map(({ value, getLabel }) => ({
                value,
                label: getLabel(t),
            })),
        [t]
    );
    const showOptions = useMemo(
        () =>
            showOptionTemplates.map(({ value, getLabel }) => ({
                value,
                label: getLabel(t),
            })),
        [t]
    );

  

    
    const [email, setEmail] = useState("");
    const [sortBy, setSortBy] = useState("latest");
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewType, setViewType] = useState("grid");

    const sortedVendors = useMemo(() => {
        const list = [...vendorCatalog];
        if (sortBy === "oldest") {
            list.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
        } else if (sortBy === "reviews") {
            list.sort((a, b) => b.reviews - a.reviews);
        } else {
            list.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        }
        return list;
    }, [sortBy, vendorCatalog]);

    const pageCount = Math.max(1, Math.ceil(sortedVendors.length / itemsPerPage));
    const paginatedVendors = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedVendors.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedVendors, currentPage, itemsPerPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [sortBy, itemsPerPage]);

    useEffect(() => {
        setCurrentPage((prev) => Math.min(prev, pageCount));
    }, [pageCount]);

    const showingFrom = sortedVendors.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const showingTo = Math.min(currentPage * itemsPerPage, sortedVendors.length);
    const totalVendors = vendorCatalog.length;
    const activeSortLabel = sortOptions.find((option) => option.value === sortBy)?.label ?? sortOptions[0].label;
    const activeShowLabel = showOptions.find((option) => option.value === itemsPerPage)?.label ?? showOptions[0].label;
    const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);

  

    return (

        <main className="main">

            
            <section className="section-box">
                <div className="breadcrumbs-div">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><a href="/" className="font-xs color-gray-1000">{t.breadcrumb.home}</a></li>
                            <li><a href="/shop-grid" className="font-xs color-gray-500">{t.breadcrumb.vendor}</a></li>
                        </ul>
                    </div>
                </div>
            </section>

         

            
            <section className="section-box shop-template mt-0">
                <div className="container">
                    <h2 className="color-brand-3">{t.vendor.title}</h2>
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-30">
                            <p className="font-md color-gray-500">
                                {t.vendor.subtitle1}
                                <span className="font-md-bold color-brand-3"> 
                                    {totalVendors}
                                </span>
                                <span> 
                                    {t.vendor.subtitle2}
                                </span>
                            </p>
                        </div>
                        <div className="col-lg-6 mb-30 text-end">
                            <a className="font-sm color-gray-900 mr-30 hover-top" href="#">
                                {t.vendor.text1}
                            </a>
                            <a className="font-sm color-gray-900 mr-30 hover-top" href="#">
                                {t.vendor.text2}
                            </a>
                            <a className="btn btn-buy w-auto font-sm-bold" href="/Register">
                                {t.vendor.btnOpenShop}
                            </a>
                        </div>
                    </div>

                    <div className="border-bottom pt-0 mb-30"></div>

                    <div className="row">
                        <div className="col-lg-9 order-first order-lg-last">

                            <div className="box-filters mt-0 pb-5 border-bottom">
                                <div className="row">
                                    <div className="col-xl-2 col-lg-3 mb-10 text-lg-start text-center">
                                        <a className="btn btn-filter font-sm color-brand-3 fw-medium" href="#ModalFiltersForm" data-bs-toggle="modal">
                                            <span className="pe-2">{t.vendor.all}</span> <span>{t.vendor.filter}</span>
                                        </a>
                                    </div>
                                    <div className="col-xl-10 col-lg-9 mb-10 ps-5">
                                        <div className="filters-panel">
                                            <div className="filters-panel__group">
                                                <span className="font-sm color-gray-900 fw-medium filters-panel__text">
                                                    {t.vendor.show1} {showingFrom}–{showingTo} {t.vendor.show2} {sortedVendors.length} {t.vendor.show3}
                                                </span>
                                                <span className="filters-divider"></span>
                                                <div className="filter-dropdown">
                                                    <span className="font-sm color-gray-500 fw-medium">{t.vendor.sort}</span>
                                                    <div className="dropdown dropdown-sort">
                                                        <button
                                                            className="btn dropdown-toggle font-sm color-gray-900 fw-medium"
                                                            id="dropdownSort"
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            {activeSortLabel}
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-light color-gray-900" aria-labelledby="dropdownSort">
                                                            {sortOptions.map((option) => (
                                                                <li key={option.value}>
                                                                    <button
                                                                        type="button"
                                                                        className={sortBy === option.value ? "dropdown-item active" : "dropdown-item"}
                                                                        onClick={() => setSortBy(option.value)}
                                                                    >
                                                                        {option.label}
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                                <span className="filters-divider"></span>
                                                <div className="filter-dropdown">
                                                    <span className="font-sm color-gray-500 fw-medium">{t.vendor.show}</span>
                                                    <div className="dropdown dropdown-sort">
                                                        <button
                                                            className="btn dropdown-toggle font-sm color-gray-900 fw-medium"
                                                            id="dropdownSort2"
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                            data-bs-display="static"
                                                        >
                                                            {activeShowLabel}
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-light color-gray-900" aria-labelledby="dropdownSort2">
                                                            {showOptions.map((option) => (
                                                                <li key={option.value}>
                                                                    <button
                                                                        type="button"
                                                                        className={itemsPerPage === option.value ? "dropdown-item active" : "dropdown-item"}
                                                                        onClick={() => setItemsPerPage(option.value)}
                                                                    >
                                                                        {option.label}
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="filters-panel__actions">
                                                <a
                                                    href="#"
                                                    className={`view-type-grid mr-5 ${viewType === "grid" ? "active" : ""}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setViewType("grid");
                                                    }}
                                                />
                                                <a
                                                    href="#"
                                                    className={`view-type-list ${viewType === "list" ? "active" : ""}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setViewType("list");
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`row mt-20 filters-row ${viewType === "list" ? "view-list" : "view-grid"}`}>
                                {paginatedVendors.map((vendor) => (
                                    <div key={vendor.id} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                        <div className="card-vendor">
                                            <div className="card-top-vendor">
                                                <div className="card-top-vendor-left">
                                                    <img src={vendor.image} alt={vendor.name} className="img-fluid" />
                                                    <div className="rating">
                                                        {Array.from({ length: 5 }).map((_, starIndex) => (
                                                            <img
                                                                key={`vendor-${vendor.id}-star-${starIndex}`}
                                                                src={star}
                                                                alt="Rating star"
                                                                className="img-fluid"
                                                            />
                                                        ))}
                                                        <span className="font-xs color-gray-500"> ({vendor.reviews})</span>
                                                    </div>
                                                </div>
                                                <div className="card-top-vendor-right">
                                                    <Link to={`/shop-vendor-single?vendorId=${vendor.id}`} className="text-decoration-none">
                                                        <h5 className="font-sm-bold color-gray-900 mb-10">{vendor.name}</h5>
                                                    </Link>
                                                    <Link className="btn btn-gray" to={`/shop-vendor-single?vendorId=${vendor.id}`}>
                                                        {vendor.products.toLocaleString()} {t.vendor.products}
                                                    </Link>
                                                    <p className="font-xs color-gray-500 mt-10">{t.vendor.member} {vendor.memberSince}</p>
                                                </div>
                                            </div>
                                            <div className="card-bottom-vendor">
                                                <p className="font-sm color-gray-500 location mb-10">
                                                    {vendor.address}
                                                </p>
                                                <p className="font-sm color-gray-500 phone">
                                                    {vendor.phone}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <nav aria-label="Vendor pagination">
                                <ul className="pagination">
                                    <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
                                        <button
                                            type="button"
                                            className="page-link page-prev"
                                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                            aria-label="Previous page"
                                        ></button>
                                    </li>
                                    {pageNumbers.map((page) => (
                                        <li key={page} className={currentPage === page ? "page-item active" : "page-item"}>
                                            <button
                                                type="button"
                                                className="page-link"
                                                onClick={() => setCurrentPage(page)}
                                            >
                                                {page}
                                            </button>
                                        </li>
                                    ))}
                                    <li className={currentPage === pageCount ? "page-item disabled" : "page-item"}>
                                        <button
                                            type="button"
                                            className="page-link page-next"
                                            onClick={() => setCurrentPage((prev) => Math.min(pageCount, prev + 1))}
                                            aria-label="Next page"
                                        ></button>
                                    </li>
                                </ul>
                            </nav>

                        </div>
                        
                        <div className="col-lg-3 order-last order-lg-first">
                            <div className="sidebar-border">
                                <div className="sidebar-head">
                                <h6 className="color-gray-900">{t.vendor.title1}</h6>
                                </div>
                                <div className="sidebar-content">
                                    <ul className="list-nav-arrow">
                                        <li><a href="shop-vendor-list.html">{t.vendor.list1}<span className="number">09</span></a></li>
                                        <li><a href="shop-vendor-list.html">{t.vendor.list2}<span className="number">12</span></a></li>
                                        <li><a href="shop-vendor-list.html">{t.vendor.list3}<span className="number">24</span></a></li>
                                        <li><a href="shop-vendor-list.html">{t.vendor.list4}<span className="number">34</span></a></li>
                                        <li><a href="shop-vendor-list.html">{t.vendor.list5}<span className="number">65</span></a></li>
                                        <li><a href="shop-vendor-list.html">{t.vendor.list6}<span className="number">15</span></a></li>
                                        <li><a href="shop-vendor-list.html">{t.vendor.list7}<span className="number">76</span></a></li>
                                        <li><a href="shop-vendor-list.html">{t.vendor.list8}<span className="number">89</span></a></li>
                                        <li><a href="shop-vendor-list.html">{t.vendor.list9}<span className="number">23</span></a></li>
                                        <li><a href="shop-vendor-list.html">{t.vendor.list10}<span className="number">98</span></a></li>
                                    </ul>
                                    <div>
                                        <div className="collapse" id="moreMenu">
                                            <ul className="list-nav-arrow">
                                                <li><a href="shop-vendor-list.html">{t.vendor.list11}<span className="number">98</span></a></li>
                                                <li><a href="shop-vendor-list.html">{t.vendor.list12}<span className="number">124</span></a></li>
                                                <li><a href="shop-vendor-list.html">{t.vendor.list13}<span className="number">56</span></a></li>
                                                <li><a href="shop-vendor-list.html">{t.vendor.list14}<span className="number">87</span></a></li>
                                                <li><a href="shop-vendor-list.html">{t.vendor.list15}<span className="number">36</span></a></li>
                                            </ul>
                                        </div>
                                        <a className="link-see-more mt-5 color-brand-2" data-bs-toggle="collapse" href="#moreMenu" role="button" aria-expanded="false" aria-controls="moreMenu">
                                            {t.vendor.seeMore}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="box-slider-item"> 
                                <div className="head pb-15 border-brand-2">
                                    <h5 className="color-gray-900">{t.vendor.title2}</h5>
                                </div>
                                <div className="content-slider mb-50 color-gray-900">
                                    <a className="btn btn-border mr-5" href="#" onClick={(e) => e.preventDefault()}>
                                        {t.vendor.tag1}
                                    </a>
                                    <a className="btn btn-border mr-5" href="#" onClick={(e) => e.preventDefault()}>
                                        {t.vendor.tag2}
                                    </a>
                                    <a className="btn btn-border mr-5" href="#" onClick={(e) => e.preventDefault()}>
                                        {t.vendor.tag3}
                                    </a>
                                    <a className="btn btn-border mr-5" href="#" onClick={(e) => e.preventDefault()}>
                                        {t.vendor.tag4}
                                    </a>
                                    <a className="btn btn-border mr-5" href="#" onClick={(e) => e.preventDefault()}>
                                        {t.vendor.tag5}
                                    </a>
                                    <a className="btn btn-border mr-5" href="#" onClick={(e) => e.preventDefault()}>
                                        {t.vendor.tag6}
                                    </a>
                                    <a className="btn btn-border mr-5" href="#" onClick={(e) => e.preventDefault()}>
                                        {t.vendor.tag7}
                                    </a>
                                    <a className="btn btn-border mr-5" href="#" onClick={(e) => e.preventDefault()}>
                                        {t.vendor.tag8}
                                    </a>
                                    <a className="btn btn-border mr-5" href="#" onClick={(e) => e.preventDefault()}>
                                        {t.vendor.tag9}
                                    </a>
                                    <a className="btn btn-border" href="#" onClick={(e) => e.preventDefault()}>
                                        {t.vendor.tag10}
                                    </a>
                                    <a className="btn btn-border mr-5" href="#" onClick={(e) => e.preventDefault()}>
                                        {t.vendor.tag11}
                                    </a>
                                    <a className="btn btn-border mr-5" href="#" onClick={(e) => e.preventDefault()}>
                                        {t.vendor.tag12}
                                    </a>
                                    <a className="btn btn-border mr-5" href="#" onClick={(e) => e.preventDefault()}>
                                        {t.vendor.tag13}
                                    </a>
                                    <a className="btn btn-border mr-5" href="#" onClick={(e) => e.preventDefault()}>
                                        {t.vendor.tag14}
                                    </a>
                                    <a className="btn btn-border mr-5" href="#" onClick={(e) => e.preventDefault()}>
                                        {t.vendor.tag15}
                                    </a>
                                </div>
                            </div>
                            <div className="box-slider-item">
                                <div className="head pb-15 border-brand-2 mb-20">
                                <h5 className="color-gray-900">{t.vendor.title3}</h5>
                                </div>
                                <div className="content-slider mb-50">
                                <div className="footer">
                                    <ul className="menu-footer">
                                    <li><a href="#">{t.vendor.lists1}</a></li>
                                    <li><a href="#">{t.vendor.lists2}</a></li>
                                    <li><a href="#">{t.vendor.lists3}</a></li>
                                    <li><a href="#">{t.vendor.lists4}</a></li>
                                    <li><a href="#">{t.vendor.lists5}</a></li>
                                    <li><a href="#">{t.vendor.lists6}</a></li>
                                    <li><a href="#">{t.vendor.lists7}</a></li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

         

            
            <section className="section-box" style={{marginTop: "90px", marginBottom: "50px"}}>
                <div className="container">
                    <ul className="list-col-5">
                        <li>
                            <div className="item-list pb-1">
                                <div className="icon-left">
                                    <img src={delivery} alt="" className="img-fluid" />
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-brand-3">
                                        {t.home.deliveryBox.box1.title}
                                    </h5>
                                    <p className="font-sm color-gray-500">
                                        {t.home.deliveryBox.box1.subtitle}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="item-list">
                                <div className="icon-left">
                                    <img src={support} alt="" className="img-fluid" />
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-brand-3">
                                        {t.home.deliveryBox.box2.title}
                                    </h5>
                                    <p className="font-sm color-gray-500">
                                        {t.home.deliveryBox.box2.subtitle}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="item-list">
                                <div className="icon-left">
                                    <img src={voucher} alt="" className="img-fluid" />
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-brand-3">
                                        {t.home.deliveryBox.box3.title}
                                    </h5>
                                    <p className="font-sm color-gray-500">
                                        {t.home.deliveryBox.box3.subtitle}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="item-list pb-1">
                                <div className="icon-left">
                                    <img src={return1} alt="" className="img-fluid" />
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-brand-3" style={{fontSize: "15px"}}>
                                        {t.home.deliveryBox.box4.title}
                                    </h5>
                                    <p className="font-sm color-gray-500">
                                        {t.home.deliveryBox.box4.subtitle}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="item-list">
                                <div className="icon-left">
                                    <img src={secure} alt="" className="img-fluid" />
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-brand-3">
                                        {t.home.deliveryBox.box5.title}
                                    </h5>
                                    <p className="font-sm color-gray-500">
                                        {t.home.deliveryBox.box5.subtitle}
                                    </p>
                                </div>
                            </div>
                        </li>
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

export default ShopVendorList;

