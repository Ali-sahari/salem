import React, { useContext, useEffect, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { t } from "../../data/salemTranslations";
import { blogData } from "../../components/BlogCard/blogData";

import "./blog.css";

import author from "../../img/blog/author.png";
import imgBig from "../../img/blog/img-big.png";
import imgSingle from "../../img/blog/img-single.png";
import delivery from "../../img/icons/delivery.svg";
import support from "../../img/icons/support.svg";
import voucher from "../../img/icons/voucher.svg";
import return1 from "../../img/icons/return.svg";
import secure from "../../img/icons/secure.svg";

const POST_PAGINATION_LIMIT = 6;
const COMMENTS_DISPLAY_LIMIT = 3;

function BlogSingle3() {

    
    const blogPage = t.blogPage;
    const singlePage = t.blogSinglePage;
    const newsletter = t.home.subscribleDiscount;
    const [email, setEmail] = useState("");
    const [selectedTag, setSelectedTag] = useState(singlePage?.filterTags?.[0] || "");
    const [postPage, setPostPage] = useState(1);
    const [comments, setComments] = useState(singlePage?.comments || []);
    const [commentForm, setCommentForm] = useState({ name: "", email: "", message: "" });
    const [commentStatus, setCommentStatus] = useState("");
    const [relatedPage, setRelatedPage] = useState(1);
    const blogPosts = useMemo(() => blogData, []);
    const mainPostCandidates = useMemo(() => blogPosts.slice(0, POST_PAGINATION_LIMIT), [blogPosts]);

 

    const deliveryBoxes = [
        { id: 1, icon: delivery, title: t.home.deliveryBox.box1.title, subtitle: t.home.deliveryBox.box1.subtitle },
        { id: 2, icon: support, title: t.home.deliveryBox.box2.title, subtitle: t.home.deliveryBox.box2.subtitle },
        { id: 3, icon: voucher, title: t.home.deliveryBox.box3.title, subtitle: t.home.deliveryBox.box3.subtitle },
        { id: 4, icon: return1, title: t.home.deliveryBox.box4.title, subtitle: t.home.deliveryBox.box4.subtitle },
        { id: 5, icon: secure, title: t.home.deliveryBox.box5.title, subtitle: t.home.deliveryBox.box5.subtitle },
    ];

 


    useEffect(() => {
        setComments(singlePage?.comments || []);
        setSelectedTag(singlePage?.filterTags?.[0] || "");
        setCommentStatus("");
    }, [singlePage]);

    const relatedPerPage = 4;
    const relatedTotalPages = Math.max(1, Math.ceil(blogPosts.length / relatedPerPage));
    const totalPostPages = Math.max(1, mainPostCandidates.length);

    useEffect(() => {
        if (postPage > totalPostPages) {
            setPostPage(totalPostPages);
        }
    }, [postPage, totalPostPages]);

    useEffect(() => {
        setRelatedPage((prev) => Math.min(prev, relatedTotalPages));
    }, [relatedTotalPages]);

    const normalizedPostIndex = Math.min(Math.max(postPage - 1, 0), totalPostPages - 1);
    const currentPost = mainPostCandidates[normalizedPostIndex] || blogPosts[0];
    const trendingPosts = useMemo(() => [...blogPosts].sort((a, b) => b.comments - a.comments).slice(0, 4), [blogPosts]);
    const relatedStartIndex = (relatedPage - 1) * relatedPerPage;
    const relatedSlice = blogPosts.slice(relatedStartIndex, relatedStartIndex + relatedPerPage);
    const visibleComments = comments.slice(0, COMMENTS_DISPLAY_LIMIT);
    const contentSections = useMemo(() => {
        return (singlePage?.contentSections || []).map((section) => ({
            ...section,
            paragraphs: (section.paragraphs || []).map((paragraph) =>
                paragraph.replaceAll("{tagLower}", (selectedTag || "").toLowerCase())
            ),
        }));
    }, [selectedTag, singlePage]);

    const handleCommentChange = (field, value) => {
        setCommentForm((prev) => ({ ...prev, [field]: value }));
        setCommentStatus("");
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        if (!commentForm.name.trim() || !commentForm.message.trim()) {
            setCommentStatus(singlePage?.actions?.validationError);
            return;
        }
        const formattedDate = new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
        const newComment = {
            id: Date.now(),
            name: commentForm.name.trim(),
            role: currentPost?.category ? `${currentPost.category} ${singlePage?.actions?.readerSuffix}` : singlePage?.actions?.readerSuffix,
            date: formattedDate,
            text: commentForm.message.trim(),
        };
        setComments((prev) => [newComment, ...prev]);
        setCommentForm({ name: "", email: "", message: "" });
        setCommentStatus(singlePage?.actions?.successMessage);
    };

    const handleShare = (platform) => {
        if (typeof window === "undefined") return;
        const pageUrl = window.location.href;
        const encodedUrl = encodeURIComponent(pageUrl);
        const encodedTitle = encodeURIComponent(currentPost?.title || blogPage?.breadcrumb?.blog || "");
        const encodedImage = encodeURIComponent(currentPost?.image || "");
        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            printest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            instagram: "https://www.instagram.com/",
        };
        const shareLink = shareUrls[platform];
        if (shareLink) {
            window.open(shareLink, "_blank", "noopener,noreferrer");
        }
    };

 

    return (
        <main className="main shop-grid-page">

            

            
            <section className="section-box shop-template">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-12 mb-50 display-list">
                                    <span className="tag-dot font-xs">{currentPost?.category || singlePage?.filterTags?.[0]}</span>
                                    <h3 className="mt-15 mb-25">{currentPost?.title}</h3>
                                    <div className="box-author mb-5">
                                        <div className="img-author mr-30">
                                            <img src={author} alt={currentPost?.author || blogPage?.breadcrumb?.blog} className="img-fluid" />
                                            <span className="font-md-bold color-brand-3">
                                                {singlePage?.actions?.by} {currentPost?.author}
                                            </span>
                                        </div>
                                        <span className="datepost color-gray-500 font-sm mr-30">{currentPost?.dateLabel}</span>
                                        <span className="timeread color-gray-500 font-sm">{currentPost?.readTime} {blogPage?.minsRead}</span>
                                    </div>
                                    <div className="image-feature">
                                        <img src={currentPost?.image || imgBig} alt={currentPost?.title || blogPage?.breadcrumb?.blog} className="img-fluid" />
                                    </div>
                                    <div className="content-text">
                                        {currentPost?.summary ? <p className="font-sm color-gray-500">{currentPost.summary}</p> : null}
                                        {(currentPost?.content || []).map((paragraph, index) => (
                                            <p key={`intro-${index}`}>{paragraph}</p>
                                        ))}
                                        {contentSections.map((section) => (
                                            <div key={section.id}>
                                                {section.title ? <h4 className="mt-20 mb-20 color-brand-3">{section.title}</h4> : null}
                                                {(section.paragraphs || []).map((paragraph, index) => (
                                                    <p key={`${section.id}-${index}`}>{paragraph}</p>
                                                ))}
                                                {section.hasPrimaryImage ? (
                                                    <div className="image-feature">
                                                        <img src={currentPost?.image || imgBig} alt={currentPost?.title || blogPage?.breadcrumb?.blog} className="img-fluid" />
                                                    </div>
                                                ) : null}
                                                {section.hasSingleImage ? (
                                                    <div className="image-single mt-20">
                                                        <img src={currentPost?.inlineImage || imgSingle} alt={currentPost?.title || blogPage?.breadcrumb?.blog} className="img-fluid" />
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-bottom-4 mb-20 mt-20"></div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="box-tags color-brand-3">
                                                {(singlePage?.filterTags || []).map((tag) => (
                                                    <button key={tag} type="button" className={"btn btn-tags mr-10 hover-up" + (selectedTag === tag ? " active" : "")} onClick={() => setSelectedTag(tag)}>
                                                        {tag}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 text-end">
                                            <div className="d-inline-block">
                                                <div className="share-link">
                                                    <span className="font-md-bold color-brand-3 mr-15">{singlePage?.actions?.share}</span>
                                                    {(singlePage?.socialNetworks || []).map((network) => (
                                                        <button key={network.id} type="button" className={network.id + " hover-up border-0"} onClick={() => handleShare(network.id)} aria-label={`${singlePage?.actions?.share} ${network.label}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {selectedTag && singlePage?.tagDescriptions?.[selectedTag] ? (
                                        <p className="font-sm color-gray-500 mt-2">{singlePage.tagDescriptions[selectedTag]}</p>
                                    ) : null}
                                    <div className="border-bottom-4 mb-20 mt-20"></div>
                                    <h5 className="font-md-bold mb-30 color-brand-3">{singlePage?.actions?.leaveComment}</h5>
                                    <div className="form-comment">
                                        <form onSubmit={handleCommentSubmit}>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <textarea className="form-control ps-0 pt-3" placeholder={singlePage?.placeholders?.writeComment} rows="5" value={commentForm.message} onChange={(e) => handleCommentChange("message", e.target.value)}></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <input className="form-control" type="text" placeholder={singlePage?.placeholders?.name} value={commentForm.name} onChange={(e) => handleCommentChange("name", e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <input className="form-control" type="email" placeholder={singlePage?.placeholders?.email} value={commentForm.email} onChange={(e) => handleCommentChange("email", e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <input className="btn btn-buy w-auto" type="submit" value={singlePage?.actions?.postComment} />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        {commentStatus ? <p className="font-sm color-brand-3 mt-2">{commentStatus}</p> : null}
                                    </div>
                                    <div className="border-bottom-4 mt-40 mb-30"></div>
                                    <h5 className="font-md-bold mb-30 mt-20 color-brand-3">{singlePage?.actions?.commentsTitle}</h5>
                                    <div className="comment-box mb-60">
                                        {visibleComments.length > 0 ? (
                                            visibleComments.map((comment) => (
                                                <div key={comment.id} className="comment-item comment-item-small">
                                                    <div className="top-comment">
                                                        <div className="image-author">
                                                            <img src={author} alt={comment.name} className="img-fluid" />
                                                        </div>
                                                        <div className="author-name">
                                                            <span className="font-md-bold color-gray-900 mr-20">{comment.name}</span>
                                                            <span className="font-sm color-gray-500">{comment.date}</span>
                                                        </div>
                                                    </div>
                                                    <div className="comment-content font-md">{comment.text}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="font-sm color-gray-500">{singlePage?.actions?.noComments}</p>
                                        )}
                                        {comments.length > visibleComments.length ? (
                                            <p className="font-sm color-gray-500 mt-20 ps-5 ms-4">
                                                {singlePage?.actions?.showingComments?.replace("{visible}", String(visibleComments.length)).replace("{total}", String(comments.length))}
                                            </p>
                                        ) : null}
                                    </div>

                                    <div className="nav-center d-flex justify-content-end pt-4">
                                        <nav>
                                            <ul className="pagination">
                                                <li className={"page-item" + (postPage === 1 ? " disabled" : "")}>
                                                    <button type="button" className="page-link page-prev" aria-label={singlePage?.actions?.previousArticle} disabled={postPage === 1} onClick={() => setPostPage((prev) => Math.max(1, prev - 1))}></button>
                                                </li>
                                                {Array.from({ length: totalPostPages }, (_, index) => {
                                                    const page = index + 1;
                                                    return (
                                                        <li key={`article-${page}`} className={"page-item" + (postPage === page ? " active" : "")}>
                                                            <button type="button" className="page-link" aria-current={postPage === page ? "page" : undefined} onClick={() => setPostPage(page)}>
                                                                {page}
                                                            </button>
                                                        </li>
                                                    );
                                                })}
                                                <li className={"page-item" + (postPage === totalPostPages ? " disabled" : "")}>
                                                    <button type="button" className="page-link page-next" aria-label={singlePage?.actions?.nextArticle} disabled={postPage === totalPostPages} onClick={() => setPostPage((prev) => Math.min(totalPostPages, prev + 1))}></button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

         

            
            <section className="section-box shop-template mt-30">
                <div className="container">
                    <h3 className="color-brand-3">{singlePage?.actions?.relatedBlogs}</h3>
                    <div className="row mt-30">
                        {relatedSlice.map((post) => (
                            <div key={post.id} className="col-lg-3 col-md-6 col-sm-6 col-12 mb-40">
                                <div className="card-grid-style-1">
                                    <div className="image-box">
                                        <Link to={post.link}>
                                            <img src={post.image} alt={post.title} className="img-fluid" />
                                        </Link>
                                    </div>
                                    <span className="tag-dot font-xs">{post.category}</span>
                                    <Link className="color-gray-1100" to={post.link}>
                                        <h4 className="mb-10">{post.title}</h4>
                                    </Link>
                                    <div className="row mt-20">
                                        <div className="col-12">
                                            <span className="color-gray-500 font-xs mr-30">{post.dateLabel}</span>
                                            <span className="color-gray-500 font-xs">
                                                {post.readTime}
                                                <span> {blogPage?.minsRead}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="nav-center d-flex justify-content-center pb-80">
                        <nav>
                            <ul className="pagination">
                                <li className={"page-item" + (relatedPage === 1 ? " disabled" : "")}>
                                    <button type="button" className="page-link page-prev" aria-label={singlePage?.actions?.previousPage} onClick={() => setRelatedPage((prev) => Math.max(1, prev - 1))} disabled={relatedPage === 1}></button>
                                </li>
                                {Array.from({ length: relatedTotalPages }, (_, index) => {
                                    const page = index + 1;
                                    return (
                                        <li key={`related-${page}`} className={"page-item" + (relatedPage === page ? " active" : "")}>
                                            <button type="button" className="page-link" aria-current={relatedPage === page ? "page" : undefined} onClick={() => setRelatedPage(page)}>
                                                {page}
                                            </button>
                                        </li>
                                    );
                                })}
                                <li className={"page-item" + (relatedPage === relatedTotalPages ? " disabled" : "")}>
                                    <button type="button" className="page-link page-next" aria-label={singlePage?.actions?.nextPage} onClick={() => setRelatedPage((prev) => Math.min(relatedTotalPages, prev + 1))} disabled={relatedPage === relatedTotalPages}></button>
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

export default BlogSingle3;
