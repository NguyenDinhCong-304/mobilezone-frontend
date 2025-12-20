import Link from "next/link";

export default function Pagination({ page, lastPage, topic, perPage }) {
    if (lastPage <= 1) return null;

    const makeLink = (p) => {
        const params = new URLSearchParams();
        params.set("page", p);
        params.set("per_page", perPage);
        if (topic) params.set("topic", topic);
        return `?${params.toString()}`;
    };

    return (
        <nav className="mt-4">
            <ul className="pagination justify-content-center">

                {/* Prev */}
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <Link className="page-link" href={makeLink(page - 1)}>
                        «
                    </Link>
                </li>

                {/* Page numbers */}
                {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
                    <li
                        key={p}
                        className={`page-item ${p === page ? "active" : ""}`}
                    >
                        <Link className="page-link" href={makeLink(p)}>
                            {p}
                        </Link>
                    </li>
                ))}

                {/* Next */}
                <li className={`page-item ${page === lastPage ? "disabled" : ""}`}>
                    <Link className="page-link" href={makeLink(page + 1)}>
                        »
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
