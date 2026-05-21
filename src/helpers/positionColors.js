export default function getPositionColor(position) {

    const colors = {
        1: "yellow",
        2: "gray",
        3: "orange",
        4: "lightgreen",
        5: "lightblue"
    };

    return colors[position] || "#7393b3";
}
