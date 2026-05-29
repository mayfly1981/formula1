import { Link } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import SelectYear from "./SelectYear";

export default function Breadcrumb({
    items,
    search,
    onSearch,
    placeholder = "Search...",
    year,
    onYearChange
}) {
    return (
        <nav className="breadcrumbs-wrapper">
            <ul className="breadcrumbs">
                <li className="breadcrumbs-item">
                    <Link to="/">
                        <HomeIcon fontSize="small" />
                        <span>Home</span>
                    </Link>
                </li>

                {items.map((item, i) => {
                    const isLast = i === items.length - 1;

                    return (
                        <li className="breadcrumb-item" key={item.text}>
                            {!isLast ? (
                                <Link to={item.route}>{item.text}</Link>
                            ) : (
                                <span className="breadcrumb-active">
                                    {item.text}
                                </span>
                            )}
                        </li>
                    );
                })}

                <li className="breadcrumbs-controls">
                    {onYearChange && (
                        <SelectYear
                            value={year}
                            change={(e) => onYearChange(e.target.value)}
                        />
                    )}

                    {onSearch && (
                        <div className="breadcrumb-search">
                            <SearchIcon fontSize="small" />

                            <input
                                type="text"
                                placeholder={placeholder}
                                value={search}
                                onChange={(e) => onSearch(e.target.value)}
                            />

                            {search && (
                                <button
                                    type="button"
                                    className="breadcrumb-clear-btn"
                                    onClick={() => onSearch("")}
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    );
}