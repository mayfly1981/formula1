export default function SelectYear(props) {
    const years = [];
    for (let i = 2025; i >= 2010; i--) {
        years.push(i);
    }

    return (
        <select className="year-select" value={props.value} onChange={props.change}>
            {years.map((year) => (
                <option key={year} value={year}>{year}</option>
            ))}
        </select>
    );
}