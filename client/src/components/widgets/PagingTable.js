import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { getData } from "../../_actions/data_actions";

export default function PagingTable({ type, params, pageCount }) {
    const dispatch = useDispatch();

    const [pages, setPages] = useState([]);
    const [customPage, setCustomPage] = useState([]);
    const page = params.page ? Number(params.page) : 1;

    useEffect(() => {
        const pages = [];

        if (pageCount === 0) {
        } else if (pageCount <= 5) {
            for (let i = 0; i < pageCount; i++) {
                pages.push(i + 1);
            }
        } else if (page < 3) {
            for (let i = 0; i < 3; i++) {
                pages.push(i + 1);
            }
            pages.push("...");
            pages.push(pageCount);
        } else if (page > pageCount - 2) {
            pages.push(1);
            pages.push("...");
            for (let i = page - 2; i < pageCount; i++) {
                pages.push(i + 1);
            }
        } else {
            pages.push(1);
            pages.push("...");
            for (let i = page - 2; i < page + 1; i++) {
                pages.push(i + 1);
            }
            pages.push("...");
            pages.push(pageCount);
        }
        setPages(pages);
    }, [page, pageCount]);

    const handlePageClick = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        setCustomPage(null);
        if (item === "..." || item === page || item > pageCount) {
            return;
        }
        params.page = item;
        dispatch(getData(type, params));
    };

    return !pageCount ? null : (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {pages.map((item) => (
                    <li className={clsx("page-item", { active: item === page, disabled: item === "..." })}>
                        <a href="#" className="page-link shadow-none" onClick={(e) => handlePageClick(e, item)}>
                            {item}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="עמוד..."
                        value={customPage}
                        onChange={(e) => setCustomPage(e.target.value)}
                    />
                    <button className="btn btn-outline-primary" onClick={(e) => handlePageClick(e, customPage)}>
                        עבור
                    </button>
                </li>
            </ul>
        </nav>
    );
}
