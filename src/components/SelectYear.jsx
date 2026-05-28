export default function SelectYear(props) {

    const thisYear = new Date().getFullYear();
    const years = [];

    for (let i = 2025; i >= 2010; i--) {
        years.push(i);
    };

    return (
        <>
            <select value={props.value} onChange={props.change}>
                {years.map((year) => {
                    return (
                        <option key={year} value={year}>{year}
                        </option>
                    );
                })}
            </select>
        </>
    );
};