export default function Loader({ text = 'Deco volite li brzu voznju' }) {
    return (
        <div className="f1-gif-wrap">
            <img
                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHY5Z3l1NmpqeDY1c3J2OWk3eXBmd3locDliNWZwMjJxa21jNHU0NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VFwnvJZ871lHlfYIBT/giphy.gif"
                alt="F1 Hamilton loader"
                className="f1-gif"
            />
            <p className="f1-gif-text">{text}</p>
        </div>
    );
}