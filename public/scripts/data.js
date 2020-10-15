$(document).ready(function () {
    $("#lesson").select2({
        ajax: {
            url: "/getLessonList",
            dataType: "json",
        },
        minimumInputLength: 0,
        language: "he",
        dir: "rtl",
    });
    $("#klass").select2({
        ajax: {
            url: "/getKlassList",
            dataType: "json",
        },
        minimumInputLength: 0,
        language: "he",
        dir: "rtl",
    });
    // // // //     // $("#teacher").select2({
    // // // //     //     ajax: {
    // // // //     //         url: "/getTeacherList",
    // // // //     //         dataType: "json",
    // // // //     //     },
    // // // //     // minimumInputLength: 1
    // // // //     // language: "he",
    // // // //     // dir: "rtl"
    // // // //     // });

    window.page = getParameterByName("page") || 1;

    $(".page-item").each(function () {
        value = $(this).text();
        if (value == window.page) {
            $(this).addClass("active");
        } else if (value == "«" && window.page == 1) {
            $(this).addClass("disabled");
        }
    });
    $(".page-link").click(function (e) {
        e.preventDefault()
        value = $(this).text();
        if (value == window.page || (value == "«" && window.page == 1)) {
            return false;
        }
        if (value == "«") value = 1;
        location.href = updateQueryStringParameter(location.href, "page", value);
    });
});

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf("?") !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
        return uri + separator + key + "=" + value;
    }
}
