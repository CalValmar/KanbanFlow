// desc : StatusInfo component to display the status of the task

export default function StatusInfo({title, value, mode}) {
    const modeInt = parseInt(mode);
    let color = "";
    switch (modeInt) {
        case 0: color = "grey"; break;
        case 1: color = "red"; break;
        case 2: color = "yellow"; break;
        case 3: color = "green"; break;
        default: color = "black"; break;
    }
    const activeStatus = ["badge", color];

    return (<span style={{margin: "5px"}} className={activeStatus.join(" ")}>{title}: {value}%</span>);
}