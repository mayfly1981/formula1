import { CircleLoader } from "react-spinners";


export default function Loader() {
    return (
        <div className="loader-container">
            <CircleLoader size={100} color="red" />
        </div>

    );
}