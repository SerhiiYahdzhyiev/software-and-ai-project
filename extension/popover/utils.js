function px(num) {
    return num + "px"
}

function cssClass(str) {
    return "." + str;
}
function camelToTitle(camelStr) {
    return camelStr
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}
