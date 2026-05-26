export default function getPositionColor(position, limit = 5) {

    const colors = {
        1: "#f2c319",
        2: "#88be6a",
        3: "#9a9999",
        4: "#e98b1a",
        5: "#6697ec",
        6: "#10a9b4",
        7: "#9b5de5",
        8: "#f15bb5",
        9: "#ef476f",
        10: "#3a0ca3"
    };

    const pos = Number(position);

    if (!position || Number.isNaN(pos)) {
        return "#66696d";
    }
    if (pos > limit) {
        return "#66696d";
    }
    return colors[position] || "#66696d";
}
