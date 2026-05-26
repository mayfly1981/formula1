export default function SelectYear(props) {

    const thisYear = new Date().getFullYear();
    const years = [];

    // for (let year = thisYear; year >= 2000; year--) {
    //     years.push(year);
    // };

    for (let i = 2026; i >= 2000; i--) {
        years.push(i);
    }

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
}