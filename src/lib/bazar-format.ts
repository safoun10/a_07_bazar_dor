export function formatBengaliNumber(value: number): string {
    return new Intl.NumberFormat("bn-BD").format(value);
}

export function formatUnitName(unit: string): string {
    switch (unit?.toLowerCase()) {
        case "kg":
            return "কেজি";
        case "liter":
        case "litre":
            return "লিটার";
        case "dozen":
            return "ডজন";
        case "piece":
            return "পিস";
        default:
            return unit || "কেজি";
    }
}

export function formatUnit(unit: string): string {
    return `প্রতি ${formatUnitName(unit)}`;
}

export function getBangladeshDate(): string {
    return new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
    }).format(new Date());
}
