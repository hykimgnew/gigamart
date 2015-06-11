/**
 * common.js class 관리 현재 사용 안함
 **/
function addClass(element, className) {
    element.className += " " + className;
};

function removeClass(element, className) {
    var check = new RegExp("(\\s|^)" + className + "(\\s|$)");
    element.className = element.className.replace(check, " ").trim();
};

function toggleClass(element, className) {
    var check = new RegExp("(\\s|^)" + className + "(\\s|$)");
    if (check.test(element.className)) {
        element.className = element.className.replace(check, " ").trim();
    } else {
        element.className += " " + className;
    }
}