import { Link } from "react-router";
import HomeIcon from '@mui/icons-material/Home';

export default function Breadcrumb(props) {
    return (
        <div>

            <ul className="breadcrumbs">

                <li><Link to="/"><HomeIcon />Home</Link>
                </li>


                {props.items.map((item, i) => {
                    const isLast = i === props.items.length - 1;
                    return (
                        <li>
                            {!isLast ?
                                <Link to={item.route}>
                                    {item.text}</Link>
                                : <span key={i}>{item.text}</span>
                            }
                        </li>
                    );
                })}
            </ul>
        </div >
    );
}