import React, { useEffect, useMemo, useState, useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Link } from "react-router-dom";

import { t } from "../../data/salemTranslations";

import "./blog.css";

import delivery from "../../img/icons/delivery.svg";
import support from "../../img/icons/support.svg";
import voucher from "../../img/icons/voucher.svg";
import return1 from "../../img/icons/return.svg";
import secure from "../../img/icons/secure.svg";
import blog1 from "../../img/blog/blog-1.jpg";
import blog2 from "../../img/blog/blog-2.jpg";
import blog3 from "../../img/blog/blog-3.jpg";
import blog4 from "../../img/blog/blog-4.jpg";
import blog5 from "../../img/blog/blog-5.jpg";
import blog6 from "../../img/blog/blog-6.jpg";
import blog7 from "../../img/blog/blog-7.jpg";
import blog8 from "../../img/blog/blog-8.jpg";
import blog9 from "../../img/blog/blog-9.jpg";
import blog10 from "../../img/blog/blog-10.jpg";
import blog11 from "../../img/blog/blog-11.jpg";
import blog12 from "../../img/blog/blog-12.jpg";
import blog13 from "../../img/blog/blog-13.jpg";
import blog14 from "../../img/blog/blog-14.jpg";
import blog15 from "../../img/blog/blog-15.jpg";
import blog16 from "../../img/blog/blog-16.jpg";
import blog17 from "../../img/blog/blog-17.jpg";
import bannerAds from "../../img/product/banner-ads.png";
import ads2 from "../../img/blog/banner-ads2.png";
import imgSingle from "../../img/blog/img-single.png";

const blogPosts = [
  {
    id: 1,

    title: "Apple unveils iPhone 14 at far out event",

    dateLabel: "April 1, 2024",

    dateValue: new Date("2024-04-01").getTime(),

    readTime: 4,

    comments: 12,

    category: "Technology",

    link: "/blog/apple-iphone-14",

    image: blog1,

    summary:
      "Apple demoed new safety features and satellite connectivity in its latest keynote.",

    author: "Sugar Rosie",

    content: [
      "Nibiru, a new crypto derivatives protocol co-founded by Tribe Capital GP Arjun Sethi, has raised $7.5 million in seed funding at a valuation of $100 million, two sources familiar with the matter told TechCrunch.",

      "The crypto market is flooded with centralized (Binance, FTX) and decentralized ETH-based perpetuals and options trading platforms, and Nibiru is attempting to build the first mainstream decentralized multichain solution.",

      "On its investor deck, Nibiru says it will provide customers with unlocked hedging opportunities, extremely low gas costs, MEV resistance and high futures volume while creating composable yield in rising and falling regimes.",
    ],

    secondaryTitle: "The FTC Is Closing in on Runaway AI",

    inlineImage: imgSingle,

    tags: ["Technology", "Devices", "AI"],
  },

  {
    id: 2,

    title: "Walmart enters the metaverse with Roblox",

    dateLabel: "March 12, 2024",

    dateValue: new Date("2024-03-12").getTime(),

    readTime: 5,

    comments: 9,

    category: "Retail",

    link: "/blog/walmart-metaverse",

    image: blog2,

    summary:
      "The retail giant is experimenting with immersive shopping experiences for Gen-Z shoppers.",
  },

  {
    id: 3,

    title: "Take no prisoners: In the Feds inflation fight",

    dateLabel: "February 27, 2024",

    dateValue: new Date("2024-02-27").getTime(),

    readTime: 6,

    comments: 34,

    category: "Economy",

    link: "/blog/fed-inflation-fight",

    image: blog3,

    summary:
      "Fed officials signal more hikes are possible if price growth refuses to cool.",
  },

  {
    id: 4,

    title: "Amazon raising hourly pay for warehouse workers",

    dateLabel: "February 15, 2024",

    dateValue: new Date("2024-02-15").getTime(),

    readTime: 4,

    comments: 18,

    category: "Technology",

    link: "/blog/amazon-warehouse-pay",

    image: blog4,

    summary:
      "US hourly wages climb again as Amazon tries to stabilise recruiting and retention.",
  },

  {
    id: 5,

    title: "Who is who: Meet the Murdoch Family",

    dateLabel: "January 30, 2024",

    dateValue: new Date("2024-01-30").getTime(),

    readTime: 5,

    comments: 26,

    category: "Media",

    link: "/blog/murdoch-family",

    image: blog5,

    summary:
      "A one-page guide to the media dynasty that still controls major newsrooms.",
  },

  {
    id: 6,

    title: "NFL has a new halftime show sponsor",

    dateLabel: "January 18, 2024",

    dateValue: new Date("2024-01-18").getTime(),

    readTime: 4,

    comments: 14,

    category: "Sports",

    link: "/blog/nfl-halftime-sponsor",

    image: blog6,

    summary:
      "A tech conglomerate takes over the most-watched stripes in sports entertainment.",
  },

  {
    id: 7,

    title: "Actress details sexual harassment on sitcom set",

    dateLabel: "January 6, 2024",

    dateValue: new Date("2024-01-06").getTime(),

    readTime: 7,

    comments: 41,

    category: "Entertainment",

    link: "/blog/actress-harassment",

    image: blog7,

    summary:
      "An industry investigation is launched after new testimony about a storied sitcom.",
  },

  {
    id: 8,

    title: "Selma Blair stuns in Dancing with the Stars",

    dateLabel: "December 22, 2023",

    dateValue: new Date("2023-12-22").getTime(),

    readTime: 4,

    comments: 11,

    category: "Entertainment",

    link: "/blog/selma-blair-dancing",

    image: blog8,

    summary:
      "Fans praise her choreography as she proves resilience after health setbacks.",
  },

  {
    id: 9,

    title: "Apple unveils iPhone 14 at far out event",

    dateLabel: "December 18, 2023",

    dateValue: new Date("2023-12-18").getTime(),

    readTime: 5,

    comments: 8,

    category: "Technology",

    link: "/blog/apple-iphone-14-wrap",

    image: blog9,

    summary:
      "A deeper look at how the camera upgrade reshapes pro photography on a phone.",
  },

  {
    id: 10,

    title: "The Twitter-Musk trial is now on pause",

    dateLabel: "December 4, 2023",

    dateValue: new Date("2023-12-04").getTime(),

    readTime: 6,

    comments: 29,

    category: "Politics",

    link: "/blog/twitter-musk-trial",

    image: blog15,

    summary:
      "Settlement talks resume while both sides regroup for next motion.",
  },

  {
    id: 11,

    title: "Binance blockchain hit by $570 million crypto loss",

    dateLabel: "November 10, 2023",

    dateValue: new Date("2023-11-10").getTime(),

    readTime: 7,

    comments: 38,

    category: "Finance",

    link: "/blog/binance-loss",

    image: blog16,

    summary:
      "Security researchers trace the hole to a misconfigured hot wallet.",
  },

  {
    id: 12,

    title: "Amazon raising hourly pay for warehouse",

    dateLabel: "October 25, 2023",

    dateValue: new Date("2023-10-25").getTime(),

    readTime: 4,

    comments: 22,

    category: "Technology",

    link: "/blog/amazon-pay-raise",

    image: blog17,

    summary: "Warehouse salaries are now benchmarked against local tech hubs.",
  },

  {
    id: 13,

    title: "The latest technologies to be used for VR in 2022",

    dateLabel: "October 6, 2023",

    dateValue: new Date("2023-10-06").getTime(),

    readTime: 5,

    comments: 13,

    category: "Technology",

    link: "/blog/vr-tech-2022",

    image: blog14,

    summary:
      "A preview of immersive headsets and ray-tracing engines that will power the next cycle of VR.",
  },

  {
    id: 14,

    title: "The Woman King surprises at the box office",

    dateLabel: "September 28, 2023",

    dateValue: new Date("2023-09-28").getTime(),

    readTime: 6,

    comments: 21,

    category: "Entertainment",

    link: "/blog/woman-king-box-office",

    image: blog4,

    summary:
      "A surprise surge in ticket sales keeps the period epic at the top of the charts.",
  },

  {
    id: 15,

    title: "The fate of Elon Musk's deal to buy Twitter",

    dateLabel: "September 18, 2023",

    dateValue: new Date("2023-09-18").getTime(),

    readTime: 7,

    comments: 32,

    category: "Business",

    link: "/blog/musk-twitter-deal",

    image: blog3,

    summary:
      "Shareholder drama and legal filings keep the saga in the headlines.",
  },

  {
    id: 16,

    title: "Actress details sexual harassment on sitcom set",

    dateLabel: "August 30, 2023",

    dateValue: new Date("2023-08-30").getTime(),

    readTime: 8,

    comments: 44,

    category: "Entertainment",

    link: "/blog/sitcom-harassment",

    image: blog6,

    summary:
      "New testimony renews calls for accountability across the industry.",
  },

  {
    id: 17,

    title: "Selma Blair stuns in Dancing with the Stars",

    dateLabel: "August 12, 2023",

    dateValue: new Date("2023-08-12").getTime(),

    readTime: 5,

    comments: 17,

    category: "Entertainment",

    link: "/blog/selma-blair-stars",

    image: blog8,

    summary:
      "Fans cheer as she pulls off the most emotional routine of the season.",
  },

  {
    id: 18,

    title: "Who is who: Meet the Murdoch Family",

    dateLabel: "July 27, 2023",

    dateValue: new Date("2023-07-27").getTime(),

    readTime: 6,

    comments: 28,

    category: "Media",

    link: "/blog/murdoch-family-2023",

    image: blog9,

    summary:
      "An updated guide to the media dynasty and their current newsholdings.",
  },

  {
    id: 19,

    title: "NFL has a new halftime show sponsor",

    dateLabel: "July 09, 2023",

    dateValue: new Date("2023-07-09").getTime(),

    readTime: 5,

    comments: 10,

    category: "Sports",

    link: "/blog/nfl-halftime-sponsor-update",

    image: blog10,

    summary:
      "A tech conglomerate expands its brand during the league's most-watched minutes.",
  },

  {
    id: 20,

    title: "Apple unveils iPhone 14 at far out event (wrap)",

    dateLabel: "June 29, 2023",

    dateValue: new Date("2023-06-29").getTime(),

    readTime: 4,

    comments: 6,

    category: "Technology",

    link: "/blog/apple-iphone-14-wrap-2023",

    image: blog11,

    summary:
      "A closer look at carrier deals and incremental camera improvements.",
  },

  {
    id: 21,

    title: "Binance blockchain hit by $570 million crypto",

    dateLabel: "June 10, 2023",

    dateValue: new Date("2023-06-10").getTime(),

    readTime: 6,

    comments: 35,

    category: "Finance",

    link: "/blog/binance-loss-2023",

    image: blog12,

    summary:
      "A follow-up story detailing how customers were reimbursed after the hack.",
  },

  {
    id: 22,

    title: "Binance blockchain hit by $570 million crypto (investigation)",

    dateLabel: "May 18, 2023",

    dateValue: new Date("2023-05-18").getTime(),

    readTime: 7,

    comments: 29,

    category: "Finance",

    link: "/blog/binance-investigation",

    image: blog13,

    summary:
      "Forensic analysts trace the breach to a misconfigured hot wallet.",
  },

  {
    id: 23,

    title: "The Twitter-Musk trial is now on pause",

    dateLabel: "May 02, 2023",

    dateValue: new Date("2023-05-02").getTime(),

    readTime: 5,

    comments: 12,

    category: "Politics",

    link: "/blog/twitter-musk-pause-2023",

    image: blog14,

    summary:
      "Legal teams regroup as settlement talks continue behind closed doors.",
  },

  {
    id: 24,

    title: "Walmart enters the metaverse with Roblox (update)",

    dateLabel: "April 20, 2023",

    dateValue: new Date("2023-04-20").getTime(),

    readTime: 4,

    comments: 18,

    category: "Retail",

    link: "/blog/walmart-metaverse-update",

    image: blog15,

    summary: "New branded hangouts draw gamers into virtual storefronts.",
  },

  {
    id: 25,

    title: "Amazon raising hourly pay for warehouse (analysis)",

    dateLabel: "April 06, 2023",

    dateValue: new Date("2023-04-06").getTime(),

    readTime: 5,

    comments: 15,

    category: "Technology",

    link: "/blog/amazon-warehouse-analysis",

    image: blog16,

    summary:
      "How regional minimums are influencing Amazon's broader workforce strategy.",
  },

  {
    id: 26,

    title: "Take no prisoners: In the Feds inflation fight (follow-up)",

    dateLabel: "March 21, 2023",

    dateValue: new Date("2023-03-21").getTime(),

    readTime: 6,

    comments: 19,

    category: "Economy",

    link: "/blog/fed-inflation-follow-up",

    image: blog17,

    summary:
      "Policymakers debate when to pause rate hikes while the labor market tightens.",
  },
];

const blogAdSlots = [
  {
    id: "blog-ad-1",
    image: bannerAds,
    alt: "Explore featured promotions",
    insertAfter: 8,
    link: "#",
  },

  {
    id: "blog-ad-2",
    image: ads2,
    alt: "Discover new arrivals",
    insertAfter: 20,
    link: "#",
  },
];

function BlogList() {

  
  const [email, setEmail] = useState("");
  const [sortKey, setSortKey] = useState("latest");
  const [showCount, setShowCount] = useState(24);
  const [viewType, setViewType] = useState("list");
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

  const showOptions = [24, 48, 72];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, showCount, sortKey]);

  const filteredPosts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    const matches = normalized
      ? blogPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(normalized) ||
            post.summary.toLowerCase().includes(normalized) ||
            post.category.toLowerCase().includes(normalized),
        )
      : blogPosts.slice();

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
    ? "Showing " + showingRange + " of " + totalResults + " results"
    : "Showing 0 of 0 results";

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
                  Home
                </Link>
              </li>

              <li>
                <a className="font-xs color-gray-500">Blog</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      

      
      <section className="section-box shop-template mt-30">
        <div className="container">
          <div className="row box-filters mt-0 border-bottom">
            <div className="col-xl-2 col-lg-3 mb-0 text-lg-start text-center">
              <h5 className="color-brand-3 text-uppercase">Blogs</h5>
            </div>

            <div className="col-xl-10 col-lg-9 mb-0 text-lg-end text-center">
              <span className="font-sm color-gray-900 font-medium border-1-right span">
                {showingText}
              </span>

              <div className="d-inline-block">
                <span className="font-sm color-gray-500 font-medium">
                  Sort by:
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
                  Show:
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
                    <span>{showCount} items</span>
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

                            <span>Mins read</span>
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
                  No posts match your filters yet.
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
                    aria-label="Previous page"
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
                    aria-label="Next page"
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
                Subscrible &amp; Get <span className="color-warning">10%</span>{" "}
                Discount
              </h3>

              <p className="font-lg color-white">
                Get E-mail updates about our latest shop and{" "}
                <span className="font-lg-bold">special offers.</span>
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
                    placeholder="Your email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <button className="btn btn-brand-2" type="submit">
                    Sign Up
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

export default BlogList;
