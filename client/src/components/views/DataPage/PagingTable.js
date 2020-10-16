import React from "react";

export default function PagingTable() {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                    <a href="#" aria-label="Previous" className="page-link">
                        <span aria-hidden="true">«</span>
                    </a>
                </li>
                <li className="page-item active">
                    <a href="#" className="page-link">
                        1
                    </a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link">
                        2
                    </a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link">
                        3
                    </a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link">
                        4
                    </a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link">
                        5
                    </a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link">
                        6
                    </a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link">
                        7
                    </a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link">
                        8
                    </a>
                </li>
                <li className="page-item">
                    <a href="#" aria-label="Next" className="page-link">
                        <span aria-hidden="true">»</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}
