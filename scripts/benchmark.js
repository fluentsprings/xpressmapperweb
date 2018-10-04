benchmark = {};

benchmark.data = {
    XS : {
        qty : ['100k','500k','1000k'],
        auto : [1720,8214,16431],
        express : [57,249,474],
        oomapper : [-1,-1,-1],
        valueinjecter : [718,3488,6423],
        mapster : [-1,-1,-1],
        tiny : [-1,-1,-1],
        native : [53,233,336]
    },
    S : {
        qty : ['100k','1000k','3000k'],
        auto : [1020,10488,32601],
        express : [40,333,1347],
        oomapper : [30,544,1621],
        valueinjecter : [547,5152,15522],
        mapster : [79,743,2156],
        tiny : [34,412,1312],
        native : [13,373,1159]
    },
    M : {
        qty : ['100k','500k','1000k'],
        auto : [2492,12651,25800],
        express : [63,474,815],
        oomapper : [105,675,1172],
        valueinjecter : [1313,6567,13030],
        mapster : [179,911,1742],
        tiny : [-1,-1,-1],
        native : [62,366,650]
    },
    L : {
        qty : ['10k','50k','100k'],
        auto : [2074,10471,21006],
        express : [69,374,742],
        oomapper : [124,576,1173],
        valueinjecter : [934,4657,9236],
        mapster : [139,708,1469],
        tiny : [-1,-1,-1],
        native : [73,329,852]
    },
    XL : {
        qty : ['10k','100k','200k'],
        auto : [1266,12619,26092],
        express : [187,982,3822],
        oomapper : [490,2756,9097],
        valueinjecter : [1476,8852,23425],
        mapster : [395,3077,12045],
        tiny : [-1,-1,-1],
        native : [150,1045,4044]
    },
    XXL : {
        qty : ['10k','100k','200k'],
        auto : [1320,12476,28078],
        express : [218,952,3869],
        oomapper : [-1,-1,-1],
        valueinjecter : [1879,6889,33770],
        mapster : [452,2146,10686],
        tiny : [-1,-1,-1],
        native : [196,978,4023]
    }
};

benchmark.getData = function(testName){
    var data = benchmark.data[testName];
    return {
        chartData: {
            labels: data.qty,
            datasets: [
                {
                    label: "Hand-written code",
                    fillColor: "rgba(239,234,126,0.5)",
                    strokeColor: "rgba(239,234,126,0.8)",
                    highlightFill: "rgba(239,234,126,0.75)",
                    highlightStroke: "rgba(239,234,126,1)",
                    data: data.native
                },
                {
                    label: "ExpressMapper",
                    fillColor: "rgba(25,144,184,0.5)",
                    strokeColor: "rgba(25,144,184,0.8)",
                    highlightFill: "rgba(25,144,184,0.75)",
                    highlightStroke: "rgba(25,144,184,1)",
                    data: data.express
                },
                {
                    label: "OoMapper",
                    fillColor: "rgba(135,0,0,0.5)",
                    strokeColor: "rgba(135,0,0,0.8)",
                    highlightFill: "rgba(135,0,0,0.75)",
                    highlightStroke: "rgba(135,0,0,1)",
                    data: data.oomapper
                },
                {
                    label: "ValueInjecter",
                    fillColor: "rgba(9,197,131,0.5)",
                    strokeColor: "rgba(9,197,131,0.8)",
                    highlightFill: "rgba(9,197,131,0.75)",
                    highlightStroke: "rgba(9,197,131,1)",
                    data: data.valueinjecter
                },
                {
                    label: "Mapster",
                    fillColor: "rgba(154,8,176,0.5)",
                    strokeColor: "rgba(154,8,176,0.8)",
                    highlightFill: "rgba(154,8,176,0.75)",
                    highlightStroke: "rgba(154,8,176,1)",
                    data: data.mapster
                },
                {
                    label: "TinyMapper",
                    fillColor: "rgba(21,0,200,0.5)",
                    strokeColor: "rgba(21,0,200,0.8)",
                    highlightFill: "rgba(21,0,200,0.75)",
                    highlightStroke: "rgba(21,0,200,1)",
                    data: data.tiny
                },
                {
                    label: "AutoMapper",
                    fillColor: "rgba(255,88,0,0.5)",
                    strokeColor: "rgba(255,88,0,0.8)",
                    highlightFill: "rgba(255,88,0,0.75)",
                    highlightStroke: "rgba(255,88,0,1)",
                    data: data.auto
                }
            ]
        }
    };
};

Chart.defaults.global = {
    // Boolean - Whether to animate the chart
    animation: true,

    // Number - Number of animation steps
    animationSteps: 60,

    // String - Animation easing effect
    // Possible effects are:
    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
    //  easeOutElastic, easeInCubic]
    animationEasing: "easeOutQuart",

    // Boolean - If we should show the scale at all
    showScale: true,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: false,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: null,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: null,
    // Number - The scale starting value
    scaleStartValue: null,

    // String - Colour of the scale line
    scaleLineColor: "rgba(0,0,0,.1)",

    // Number - Pixel width of the scale line
    scaleLineWidth: 1,

    // Boolean - Whether to show labels on the scale
    scaleShowLabels: true,

    // Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
    scaleIntegersOnly: true,

    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: 12,

    // String - Scale label font weight style
    scaleFontStyle: "normal",

    // String - Scale label font colour
    scaleFontColor: "#666",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: false,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,

    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
    customTooltips: false,

    // Array - Array of string names to attach tooltip events
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

    // String - Tooltip background colour
    tooltipFillColor: "rgba(0,0,0,0.8)",

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: "normal",

    // String - Tooltip label font colour
    tooltipFontColor: "#fff",

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 14,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: "bold",

    // String - Tooltip title font colour
    tooltipTitleFontColor: "#fff",

    // Number - pixel width of padding around tooltip text
    tooltipYPadding: 6,

    // Number - pixel width of padding around tooltip text
    tooltipXPadding: 6,

    // Number - Size of the caret on the tooltip
    tooltipCaretSize: 8,

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 6,

    // Number - Pixel offset from point x to tooltip edge
    tooltipXOffset: 10,

    // String - Template string for single tooltips
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

    // String - Template string for multiple tooltips
    multiTooltipTemplate: "<%= value %>",

    // Function - Will fire on animation progression.
    onAnimationProgress: function(){},

    // Function - Will fire on animation completion.
    onAnimationComplete: function(){}
};
