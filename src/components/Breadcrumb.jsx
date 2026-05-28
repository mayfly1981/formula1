import { Link } from "react-router";
import HomeIcon from '@mui/icons-material/Home';

export default function Breadcrumb(props) {
    return (
        <nav className="breadcrumbs-wrapper">
            <ul className="breadcrumbs">
                <li className="breadcrumbs-item">
                    <Link to="/">
                        <HomeIcon fontSize="small" />
                        <span>Home</span>
                    </Link>
                </li>
                {props.items.map((item, i) => {
                    const isLast = i === props.items.length - 1;
                    return (
                        <li className="breadcrumb-item" key={item.text}>
                            {!isLast ? (
                                <Link to={item.route}>
                                    {item.text}</Link>
                            ) : (
                                <span key={i}>{item.text}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};