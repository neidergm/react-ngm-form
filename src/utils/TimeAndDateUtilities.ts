const timeGenerator = (min = "00:00", max = "24:00", step = 5) => {
    const [minH, minMin] = (min).split(":");
    const [maxH, maxMin] = (max).split(":");
    const divider = 60 / step;
    const firstH = Number(minH), lastH = Number(maxH);

    return Array((lastH + 1) * divider)
        .fill(0).reduce((p, c, i) => {
            let hh = ~~(i / divider);
            let mm = Math.round(60 * (i / divider % 1));
            if (hh >= firstH) {
                if (
                    (firstH === hh && mm < Number(minMin)) || (lastH === hh && mm > Number(maxMin))
                ) return p;
                return [...p, ('0' + hh + ':0' + mm).replace(/\d(\d\d)/g, '$1')];
            }
            return p;
        }, [])
}

const minDateSetter = (min: string): string => {
    if (min === "today") {
        return dateSetter(0);
    } else if (/last\s\d{1,}\s(day|month|year)/.test(min)) {
        const [a, num, temp] = min.split(" ");
        return dateSetter(Number(num) * -1, temp as any);
    }
    return "";
}
const maxDateSetter = (max: string): string => {
    if (max === "today") {
        return dateSetter(0);
    } else if (/next\s\d{1,}\s(day|month|year)/.test(max)) {
        const [a, num, temp] = max.split(" ");
        return dateSetter(Number(num), temp as any);
    }
    return "";
}

const dateSetter = (value: number, type?: "day" | "month" | "year"): string => {
    let date = new window.Date();
    let d: Date | string = "";
    if (type === "day") {
        d = new window.Date(date.getFullYear(), date.getMonth(), date.getDate() + value);
    } else if (type === "month") {
        d = new window.Date(date.getFullYear(), date.getMonth() + value, date.getDate());
    } else if (type === "year") {
        d = new window.Date(date.getFullYear() + value, date.getMonth(), date.getDate());
    } else {
        d = new window.Date();
    }
    d = d.toLocaleString([], { day: "2-digit", month: "2-digit", year: "numeric" });
    return d.split("/").reverse().join("-");
}

export {
    timeGenerator,
    minDateSetter,
    maxDateSetter
};
