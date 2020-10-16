import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";

const pageSize = 15;

export default function PagingTable({ params, totalCount, getData }) {
    const dispatch = useDispatch();

    const [pages, setPages] = useState([]);
    const page = params.page || 1;
    const lastPage = Math.ceil(totalCount / pageSize);

    useEffect(() => {
        const pages = [];

        if (lastPage <= 5) {
            for (let i = 0; i < lastPage; i++) {
                pages.push(i + 1);
            }
        } else if (page < 3) {
            for (let i = 0; i < 3; i++) {
                pages.push(i + 1);
            }
            pages.push("...");
            pages.push(lastPage);
        } else if (page > lastPage - 2) {
            pages.push(1);
            pages.push("...");
            for (let i = page - 2; i < lastPage; i++) {
                pages.push(i + 1);
            }
        } else {
            pages.push(1);
            pages.push("...");
            for (let i = page - 2; i < page + 1; i++) {
                pages.push(i + 1);
            }
            pages.push("...");
            pages.push(lastPage);
        }
        setPages(pages);
    }, [params, totalCount]);

    const handlePageClick = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        if (item == "..." || item == page) {
            return;
        }
        params.page = item;
        dispatch(getData(params));
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {pages.map((item) => (
                    <li className={clsx("page-item", { active: item == page, disabled: item == "..." })}>
                        <a href="#" className="page-link" onClick={(e) => handlePageClick(e, item)}>
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
