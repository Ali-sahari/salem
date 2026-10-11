

import React from "react";
import { Link } from "react-router-dom";

function BlogSidebar({
    t,
    blogPage,
    trendingPosts,
    collapseId = "blogSidebarMore",
    showBannerCard = true,
    showTopPromoBanner = false,
    topBanner,
}) {
    
    const categories = [
        { label: "Technology Trending", href: "/blog", number: "09" },
        { label: "Entertainment", href: "/blog", number: "12" },
        { label: "Tech Reviews", href: "/blog", number: "24" },
        { label: "Gaming Blog", href: "/blog", number: "34" },
        { label: "Crypto news", href: "/blog", number: "65" },
        { label: "Software Development", href: "/blog", number: "15" },
        { label: "FinTech", href: "/blog", number: "76" },
        { label: "Health Tech", href: "/blog", number: "89" },
        { label: "Tips and Tricks", href: "/blog", number: "23" },
        { label: "Make money online", href: "/blog", number: "98" },
    ];

    const moreCategories = [
        { label: "Home theater", href: "/blog-2", number: "98" },
        { label: "Cameras & drones", href: "/blog-2", number: "124" },
        { label: "PC gaming", href: "/blog-2", number: "56" },
    ];
    
    const popularTags = [
        "games",
        "electronics",
        "video",
        "cellphone",
        "indoor",
        "vGACard",
        "usb",
        "lightning",
        "camera",
        "window",
        "airVent",
        "bedroom",
        "laptop",
        "dashboard",
        "keyboard",
    ].filter(Boolean);
    const sideBanner = t?.sidebar?.list7 || {};

    return (
        <>
            {showTopPromoBanner && topBanner ? (
                <div className="bg-electronic pt-3 mb-30" style={{ backgroundSize: "auto 40%" }}>
                    <span className="big-deal mb-5">{topBanner.bigDeal}</span>
                    <h4 className="font-25 color-brand-3 mb-0">{topBanner.electronic}</h4>
                    <p className="font-16 color-brand-3 px-2" style={{ marginTop: "-5px" }}>
                        {topBanner.description}
                    </p>
                </div>
            ) : null}

            <div className="sidebar-border">
                <div className="sidebar-head">
                    <h6 className="color-gray-900">Blog Categories</h6>
                </div>
                <div className="sidebar-content">
                    <ul className="list-nav-arrow">
                        {categories.map((item) => (
                            <li key={item.label}>
                                <a href={item.href}>
                                    {item.label}
                                    <span className="number">{item.number}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <div className="collapse" id={collapseId}>
                            <ul className="list-nav-arrow">
                                {moreCategories.map((item) => (
                                    <li key={item.label}>
                                        <a href={item.href}>
                                            {item.label}
                                            <span className="number">{item.number}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <a
                            className="link-see-more mt-5 color-brand-2"
                            data-bs-toggle="collapse"
                            href={`#${collapseId}`}
                            role="button"
                            aria-expanded="false"
                            aria-controls={collapseId}
                        >
                            See More
                        </a>
                    </div>
                </div>
            </div>

            <div className="box-slider-item mb-30">
                <div className="head pb-15 border-brand-2">
                    <h5 className="color-gray-900">Trending News</h5>
                </div>
                <div className="content-slider trending-sidebar">
                    {trendingPosts.map((post) => (
                        <article key={post.id} className="trending-card">
                            <Link to={post.link} className="trending-card__thumb">
                                <img src={post.image} alt={post.title} className="img-fluid" />
                            </Link>
                            <div className="trending-card__body">
                                <Link className="color-brand-3 font-sm trending-card__title" to={post.link}>
                                    {post.title}
                                </Link>
                                <p className="trending-card__meta">
                                    <span>{post.dateLabel}</span>
                                    <span>
                                        {post.readTime}
                                        <span>{blogPage?.minsRead}</span>
                                    </span>
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <div className="box-slider-item">
                <div className="head pb-15 border-brand-2">
                    <h5 className="color-gray-900">Popular Tags</h5>
                </div>
                <div className="content-slider mb-50" style={{ color: "#425A8B" }}>
                    {popularTags.map((tag) => (
                        <a key={tag} className="btn btn-border mr-5" href="blog.html">
                            {tag}
                        </a>
                    ))}
                </div>
            </div>

            {showBannerCard ? (
                <div className="banner-right h-500 text-center mb-30">
                    <span className="text-no font-11">{sideBanner.no}</span>
                    <h5 className="font-23 mt-20 color-brand-3">{sideBanner.title}</h5>
                    <p className="text-desc font-16 mt-15 p-2">{sideBanner.subtitle}</p>
                </div>
            ) : null}
        </>
    );
}

export default BlogSidebar;