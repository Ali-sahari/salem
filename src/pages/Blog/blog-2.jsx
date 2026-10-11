import React, { useContext, useEffect, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";  
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { t } from "../../data/salemTranslations";
import BlogSidebar from "./BlogSidebar";
import { blogData, blogAdSlots } from "../../components/BlogCard/blogData";

import "./blog.css";

import delivery from "../../img/icons/delivery.svg";
import support from "../../img/icons/support.svg";
import voucher from "../../img/icons/voucher.svg";
import return1 from "../../img/icons/return.svg";
import secure from "../../img/icons/secure.svg";

function Blog2() {

    
    const [email, setEmail] = useState("");
    const [sortKey, setSortKey] = useState("latest");
    const [showCount, setShowCount] = useState(24);
    const [viewType, setViewType] = useState("grid");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);


    const deliveryBoxes = [
        {
          id: 1,
          icon: delivery,
          title: t?.home?.deliveryBox?.box1?.title || "Free Delivery",
          subtitle:
            t?.home?.deliveryBox?.box1?.subtitle || "From all orders over $10",
        },
    
        {
          id: 2,
          icon: support,
          title: t?.home?.deliveryBox?.box2?.title || "Support 24/7",
          subtitle: t?.home?.deliveryBox?.box2?.subtitle || "Shop with an expert",
        },
    
        {
          id: 3,
          icon: voucher,
          title: t?.home?.deliveryBox?.box3?.title || "Gift voucher",
          subtitle: t?.home?.deliveryBox?.box3?.subtitle || "Refer a friend",
        },
    
        {
          id: 4,
          icon: return1,
          title: t?.home?.deliveryBox?.box4?.title || "Return & Refund",
          subtitle: t?.home?.deliveryBox?.box4?.subtitle || "Free return over $200",
        },
    
        {
          id: 5,
          icon: secure,
          title: t?.home?.deliveryBox?.box5?.title || "Secure payment",
          subtitle: t?.home?.deliveryBox?.box5?.subtitle || "100% Protected",
        },
      ];
    
      const sortLabels = {
        latest: "Latest posts",
    
        oldest: "Oldest posts",
    
        comments: "Most commented",
      };

        const blogPage = {
            minsRead: "Mins read",
            status: {
                noPosts: "No posts found",
            },
            controls: {
                previousPage: "Previous page",
                nextPage: "Next page",
            },
        };

        const pageConfig = {
        featuredReadMore: "Read more",
        cardReadMore: "Read more",
        };

        const newsletter = t?.home?.subscribleDiscount || {};

const showOptions = [24, 48, 72];

useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, showCount, sortKey]);

const filteredPosts = useMemo(() => {
  const normalized = searchTerm.trim().toLowerCase();

  const matches = normalized
    ? blogData.filter(
        (post) =>
          post.title.toLowerCase().includes(normalized) ||
          post.summary.toLowerCase().includes(normalized) ||
          post.category.toLowerCase().includes(normalized)
      )
    : blogData.slice();

  const comparator =
    sortKey === "latest"
      ? (a, b) => b.dateValue - a.dateValue
      : sortKey === "oldest"
      ? (a, b) => a.dateValue - b.dateValue
      : (a, b) => b.comments - a.comments;

  return matches.sort(comparator);
}, [searchTerm, sortKey]);

const totalResults = filteredPosts.length;

const totalPages = Math.max(1, Math.ceil(totalResults / showCount));

useEffect(() => {
  setCurrentPage((prev) => Math.min(prev, totalPages));
}, [totalPages]);

const startIndex = (currentPage - 1) * showCount;

const displayedPosts = filteredPosts.slice(
  startIndex,
  startIndex + showCount
);

const featuredPost = displayedPosts[0] || null;
const gridPosts = displayedPosts.slice(1);

const showingStart = totalResults ? startIndex + 1 : 0;
const showingEnd = totalResults ? startIndex + displayedPosts.length : 0;

const showingText = totalResults
  ? `Showing ${showingStart}–${showingEnd} of ${totalResults} results`
  : "Showing 0 of 0 results";

const cardClassName =
  viewType === "list"
    ? "card-grid-style-1 card-list-view"
    : "card-grid-style-1";

const cardColClass =
  viewType === "list"
    ? "col-12 mb-30"
    : "col-lg-3 col-md-4 col-sm-6 mb-40";

const adColumnClass =
  viewType === "list"
    ? "col-12 mb-40"
    : "col-lg-12 mb-40";

const categoryCounts = useMemo(() => {
  const counts = {};

  blogData.forEach((post) => {
    const category = post.category || "General";
    counts[category] = (counts[category] || 0) + 1;
  });

  return Object.entries(counts).map(([label, count]) => ({
    label,
    href: "/blog",
    number: String(count).padStart(2, "0"),
  }));
}, []);

const categories = categoryCounts.slice(0, 10);
const moreCategories = categoryCounts.slice(10);

const popularTags = useMemo(() => {
  const tagSet = new Set();

  blogData.forEach((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((tag) => tagSet.add(tag));
    }

    if (post.category) {
      tagSet.add(post.category);
    }
  });

  return Array.from(tagSet).slice(0, 15);
}, []);

const trendingPosts = useMemo(() => {
  return [...blogData]
    .sort((a, b) => b.comments - a.comments)
    .slice(0, 4);
}, []);
    


    return (
        <main className="main shop-grid-page">

            
            <section className="section-box">
                <div className="breadcrumbs-div">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><Link className="font-xs color-gray-1000" to="/">Home</Link></li>
                            <li><a className="font-xs color-gray-500">Blog</a></li>
                        </ul>
                    </div>
                </div>
            </section>

         

            
            <section className="section-box shop-template mt-30">
                <div className="container">
                    <div className="row box-filters mt-0 border-bottom">
                        <div className="col-xl-2 col-lg-3 mb-0 text-lg-start text-center">
                            <h5 className="color-brand-3 text-uppercase">NEWS & BLOGS</h5>
                        </div>
                        <div className="col-xl-10 col-lg-9 mb-0 text-lg-end text-center">
                            <span className="font-sm color-gray-900 font-medium border-1-right span">
                                {showingText}
                            </span>
                            <div className="d-inline-block">
                                <span className="font-sm color-gray-500 font-medium">Sort by:</span>
                                <div className="dropdown dropdown-sort border-1-right">
                                    <button className="btn dropdown-toggle font-sm color-gray-900 font-medium" id="dropdownSort" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {sortLabels[sortKey]}
                                    </button>
                                    <ul
                                        className="dropdown-menu dropdown-menu-light"
                                        aria-labelledby="dropdownSort"
                                        style={{ margin: "0px" }}
                                    >
                                        {Object.entries(sortLabels).map(([key, label]) => (
                                        <li key={key}>
                                            <button
                                            type="button"
                                            className={
                                                "dropdown-item" + (sortKey === key ? " active" : "")
                                            }
                                            onClick={() => setSortKey(key)}
                                            >
                                            {label}
                                            </button>
                                        </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="d-inline-block">
                                <span className="font-sm color-gray-500 font-medium">Show</span>
                                <div className="dropdown dropdown-sort border-1-right">
                                    <button className="btn dropdown-toggle font-sm color-gray-900 font-medium" id="dropdownSort2" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static">
                                        <span>{showCount} items</span>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownSort2">
                                        {showOptions.map((option) => (
                                            <li key={option}>
                                                <button
                                                type="button"
                                                className={
                                                    "dropdown-item" +
                                                    (showCount === option ? " active" : "")
                                                }
                                                onClick={() => setShowCount(option)}
                                                >
                                                {option} items
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="d-inline-block">
                                <button
                                type="button"
                                className={
                                    "view-type-grid mr-5 border-0" +
                                    (viewType === "grid" ? " active" : "")
                                }
                                onClick={() => setViewType("grid")}
                                aria-label="Grid view"
                                ></button>

                                <button
                                type="button"
                                className={
                                    "view-type-list border-0" +
                                    (viewType === "list" ? " active" : "")
                                }
                                onClick={() => setViewType("list")}
                                aria-label="List view"
                                ></button>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-50">
                        <div className="col-lg-9">
                            {featuredPost ? (
                                <div className="row">
                                    <div className="col-lg-12 mb-50 display-list border rounded pt-3 ps-3">
                                        <div className={`${cardClassName} display-list d-flex gap-4`}>
                                            <div className="image-box w-50">
                                                <Link to={featuredPost.link}>
                                                    <img src={featuredPost.image} alt={featuredPost.title} className="img-fluid" />
                                                </Link>
                                            </div>
                                            <div className="blog-info w-50">
                                                <span className="tag-dot font-xs" style={viewType === "list" ? { width: "15%" } : undefined}>{featuredPost.category}</span>
                                                <Link className="color-gray-1100" to={featuredPost.link}>
                                                    <h4 className="mb-15 color-brand-3">{featuredPost.title}</h4>
                                                </Link>
                                                <p className="font-md color-gray-500">{featuredPost.summary}</p>
                                                <div className="row mt-20">
                                                    <div className="col-8">
                                                        <span className="color-gray-500 font-sm mr-30">{featuredPost.dateLabel}</span>
                                                        <span className="color-gray-500 font-sm">
                                                            {featuredPost.readTime}
                                                            <span>{blogPage?.minsRead}</span>
                                                        </span>
                                                    </div>
                                                    <div className="col-4 text-end">
                                                        <Link className="btn btn-arrow-2 color-brand-2" to={featuredPost.link} style={{ fontWeight: "bold" }}>
                                                            {pageConfig?.featuredReadMore}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="row">
                                    <div className="col-12 text-center mt-40">
                                        <p className="font-sm color-gray-500 text-center fw-bold p-5">{blogPage?.status?.noPosts}</p>
                                    </div>
                                </div>
                            )}

                            {gridPosts.length > 0 ? (
                                <div className="row">
                                    {gridPosts.map((post) => (
                                        <div key={post.id} className={cardColClass}>
                                            <div className={cardClassName}>
                                                <div className="image-box">
                                                    <Link to={post.link}>
                                                        <img src={post.image} alt={post.title} className="img-fluid" />
                                                    </Link>
                                                </div>
                                                <div className="card-info">
                                                    <span className="tag-dot font-xs" style={viewType === "list" ? { width: "15%" } : undefined}>{post.category}</span>
                                                    <Link className="color-gray-1100" to={post.link}>
                                                        <h4 className="mb-10 color-brand-3">{post.title}</h4>
                                                    </Link>
                                                    <p className="font-xs color-gray-500">{post.summary}</p>
                                                    <div className="row mt-20">
                                                        <div className="col-8">
                                                            <span className="color-gray-500 font-xs mr-30">{post.dateLabel}</span>
                                                            <span className="color-gray-500 font-xs">
                                                                {post.readTime}
                                                                <span>{blogPage?.minsRead}</span>
                                                            </span>
                                                        </div>
                                                        <div className="col-4 text-end">
                                                            <Link className="btn btn-gray font-xs font-medium" to={post.link}>{pageConfig?.cardReadMore}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null}

                            <div className="nav-center mt-20">
                                <nav>
                                    <ul className="pagination">
                                        <li className={"page-item" + (currentPage === 1 ? " disabled" : "")}>
                                            <button type="button" className="page-link page-prev" aria-label={blogPage?.controls?.previousPage} disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}></button>
                                        </li>
                                        {Array.from({ length: totalPages }, (_, index) => {
                                            const page = index + 1;
                                            return (
                                                <li key={page} className={"page-item" + (currentPage === page ? " active" : "")}>
                                                    <button type="button" className="page-link" aria-current={currentPage === page ? "page" : undefined} onClick={() => setCurrentPage(page)}>
                                                        {page}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                        <li className={"page-item" + (currentPage === totalPages ? " disabled" : "")}>
                                            <button type="button" className="page-link page-next" aria-label={blogPage?.controls?.nextPage} disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}></button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <BlogSidebar
                             t={t}
                             blogPage={blogPage}
                             trendingPosts={trendingPosts}
                             categories={categories}
                             moreCategories={moreCategories}
                             popularTags={popularTags}
                             collapseId="blog2-more"
                             showBannerCard
                            />
                        </div>
                    </div>
                </div>
            </section>
            
         

            

            <section className="section-box section-delivery mb-50">
                <div className="container">
                    <ul className="list-col-5">
                        {deliveryBoxes.map((box) => (
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
            
         
            
            

            <section className="section-box box-newsletter mt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-7 col-sm-12">
                            <h3 className="color-white">
                                {newsletter?.title1} <span className="color-warning">10%</span> {newsletter?.title2}
                            </h3>
                            <p className="font-lg color-white">
                                {newsletter?.subtitle1} <span className="font-lg-bold">{newsletter?.subtitle2}</span>
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-5 col-sm-12">
                            <div className="box-form-newsletter mt-15">
                                <form className="form-newsletter" onSubmit={(e) => e.preventDefault()}>
                                    <input className="input-newsletter font-xs" type="email" placeholder={newsletter?.inputPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <button className="btn btn-brand-2" type="submit">{newsletter?.btnText}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}

export default Blog2;
