import React, { useEffect, useMemo, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { t } from "../../data/salemTranslations";
import { blogData, blogAdSlots } from "../../components/BlogCard/blogData";

import "./blog.css";

import delivery from "../../img/icons/delivery.svg";
import support from "../../img/icons/support.svg";
import voucher from "../../img/icons/voucher.svg";
import return1 from "../../img/icons/return.svg";
import secure from "../../img/icons/secure.svg";

function Blog() {

  
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

  const sortLabels = t.blogPage?.sortLabels ?? {
    latest: "Latest posts",
    oldest: "Oldest posts",
    comments: "Most commented",
  };

  const showOptions = t.blogPage?.showOptions ?? [24, 48, 72];

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
            post.category.toLowerCase().includes(normalized),
        )
      : blogData.slice();

    const comparator =
      sortKey === "latest"
        ? function (a, b) {
            return b.dateValue - a.dateValue;
          }
        : sortKey === "oldest"
          ? function (a, b) {
              return a.dateValue - b.dateValue;
            }
          : function (a, b) {
              return b.comments - a.comments;
            };

    return matches.sort(comparator);
  }, [searchTerm, sortKey]);

  const totalResults = filteredPosts.length;

  const totalPages = Math.max(1, Math.ceil(totalResults / showCount));

  const startIndex = (currentPage - 1) * showCount;

  const displayedPosts = filteredPosts.slice(
    startIndex,
    startIndex + showCount,
  );

  const showingRange = totalResults
    ? "1\u2013" + Math.min(displayedPosts.length, totalResults)
    : "0";

  const showingText = totalResults
    ? `${t.blogPage.status.showing} ${showingRange} ${t.blogPage.status.of} ${totalResults} ${t.blogPage.status.results}`
    : `${t.blogPage.status.showing} 0 ${t.blogPage.status.of} 0 ${t.blogPage.status.results}`;

  const cardColClass =
    viewType === "list" ? "col-12 mb-30" : "col-lg-3 col-md-4 col-sm-6 mb-40";

  const adColumnClass =
    viewType === "list" ? "col-12 mb-40" : "col-lg-12 mb-40";

  const adSlotsByPosition = Object.fromEntries(
    blogAdSlots.map((slot) => [slot.insertAfter, slot]),
  );

  return (
    <main className="main shop-grid-page">

      
      <section className="section-box">
        <div className="breadcrumbs-div">
          <div className="container">
            <ul className="breadcrumb">
              <li>
                <Link className="font-xs color-gray-1000" to="/">
                  {t.blogPage.breadcrumb.home}
                </Link>
              </li>

              <li>
                <a className="font-xs color-gray-500">
                  {t.blogPage.breadcrumb.blog}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      

      
      <section className="section-box shop-template mt-30">
        <div className="container">
          <div className="row box-filters mt-0 border-bottom">
            <div className="col-xl-2 col-lg-3 mb-0 text-lg-start text-center">
              <h5 className="color-brand-3 text-uppercase">
                {t.blogPage.heading}
              </h5>
            </div>

            <div className="col-xl-10 col-lg-9 mb-0 text-lg-end text-center">
              <span className="font-sm color-gray-900 font-medium border-1-right span">
                {showingText}
              </span>

              <div className="d-inline-block">
                <span className="font-sm color-gray-500 font-medium">
                  {t.blogPage.controls.sortBy}
                </span>

                <div className="dropdown dropdown-sort border-1-right">
                  <button
                    className="btn dropdown-toggle font-sm color-gray-900 font-medium"
                    id="dropdownSort"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
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
                <span className="font-sm color-gray-500 font-medium">
                  {t.blogPage.controls.show}
                </span>

                <div className="dropdown dropdown-sort border-1-right">
                  <button
                    className="btn dropdown-toggle font-sm color-gray-900 font-medium"
                    id="dropdownSort2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-display="static"
                  >
                    <span>
                      {showCount} {t.blogPage.controls.itemsSuffix}
                    </span>
                  </button>

                  <ul
                    className="dropdown-menu dropdown-menu-light"
                    aria-labelledby="dropdownSort2"
                  >
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
                          {option} {t.blogPage.controls.itemsSuffix}
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
                  aria-label={t.blogPage.controls.gridView}
                ></button>

                <button
                  type="button"
                  className={
                    "view-type-list border-0" +
                    (viewType === "list" ? " active" : "")
                  }
                  onClick={() => setViewType("list")}
                  aria-label={t.blogPage.controls.listView}
                ></button>
              </div>
            </div>
          </div>

          <div className="row mt-30">
            {displayedPosts.length > 0 ? (
              displayedPosts.flatMap((post, index) => {
                const overallIndex = startIndex + index + 1;

                const adSlot = adSlotsByPosition[overallIndex];

                const cardClass = `card-grid-style-1${viewType === "list" ? " card-list-view" : ""}`;

                const items = [
                  <div key={`post-${post.id}`} className={cardColClass}>
                    <div className={cardClass}>
                      <div className="image-box">
                        <Link to={post.link}></Link>

                        <img src={post.image} alt={post.title} className="img-fluid" />
                      </div>

                      <div className="card-info">
                        <span
                          className="tag-dot font-xs"
                          style={
                            viewType === "list" ? { width: "15%" } : undefined
                          }
                        >
                          {post.category}
                        </span>

                        <Link className="color-gray-1100" to={post.link}>
                          <h4>{post.title}</h4>
                        </Link>

                        <p className="font-sm color-gray-500">{post.summary}</p>

                        <div className="mt-20">
                          <span className="color-gray-500 font-xs mr-30">
                            {post.dateLabel}
                          </span>

                          <span className="color-gray-500 font-xs">
                            {post.readTime}

                            <span>{t.blogPage.minsRead}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>,
                ];

                if (adSlot) {
                  items.push(
                    <div
                      key={`ad-${adSlot.id}-${overallIndex}`}
                      className={adColumnClass}
                    >
                      <div className="text-center">
                        <a href={adSlot.link}>
                          <img src={adSlot.image} alt={adSlot.alt} className="img-fluid" />
                        </a>
                      </div>
                    </div>,
                  );
                }

                return items;
              })
            ) : (
              <div className="col-12 text-center mt-40">
                <p className="font-sm color-gray-500 text-center fw-bold p-5">
                  {t.blogPage.status.noPosts}
                </p>
              </div>
            )}
          </div>

          <div className="nav-center">
            <nav>
              <ul className="pagination">
                <li
                  className={
                    "page-item" + (currentPage === 1 ? " disabled" : "")
                  }
                >
                  <button
                    type="button"
                    className="page-link page-prev"
                    aria-label={t.blogPage.controls.previousPage}
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                  ></button>
                </li>

                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;

                  return (
                    <li
                      key={page}
                      className={
                        "page-item" + (currentPage === page ? " active" : "")
                      }
                    >
                      <button
                        type="button"
                        className="page-link"
                        aria-current={currentPage === page ? "page" : undefined}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    </li>
                  );
                })}

                <li
                  className={
                    "page-item" +
                    (currentPage === totalPages ? " disabled" : "")
                  }
                >
                  <button
                    type="button"
                    className="page-link page-next"
                    aria-label={t.blogPage.controls.nextPage}
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                  ></button>
                </li>
              </ul>
            </nav>
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
                    <h5 className="font-lg-bold color-gray-1100">
                      {box.title}
                    </h5>

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
                {t.blogPage.newsletter.titlePrefix}
                <span className="color-warning">
                  {t.blogPage.newsletter.discountValue}
                </span>
                {t.blogPage.newsletter.titleSuffix}
              </h3>

              <p className="font-lg color-white">
                {t.blogPage.newsletter.descriptionPrefix}
                <span className="font-lg-bold">
                  {t.blogPage.newsletter.descriptionHighlight}
                </span>
              </p>
            </div>

            <div className="col-lg-4 col-md-5 col-sm-12">
              <div className="box-form-newsletter mt-15">
                <form
                  className="form-newsletter"
                  onSubmit={(e) => e.preventDefault()}
                >
                    <input
                      className="input-newsletter font-xs"
                      type="email"
                      placeholder={t.blogPage.newsletter.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <button className="btn btn-brand-2" type="submit">
                      {t.blogPage.newsletter.button}
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

export default Blog;
