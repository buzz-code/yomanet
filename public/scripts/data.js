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
});
