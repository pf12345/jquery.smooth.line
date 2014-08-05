/**
 * Created by lovely on 2014/7/23.
 */

(function ($) {
    var line = {
        createLine: function (x1, y1, x2, y2, options) {
            if (x2 < x1) {
                var temp = x1;
                x1 = x2;
                x2 = temp;
                temp = y1;
                y1 = y2;
                y2 = temp;
            }
            var lineLength = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            var lineNode = document.createElement('canvas');

            lineNode.style.position = 'absolute';
            lineNode.height = parseInt(options.styles.height) || '2';
            lineNode.width = lineLength;
            line.canvasLine(lineNode, lineLength, options);

            var angle = Math.atan((y2 - y1) / (x2 - x1));
            lineNode.style.top = y1 + 0.5 * lineLength * Math.sin(angle) + "px";
            lineNode.style.left = x1 - 0.5 * lineLength * (1 - Math.cos(angle)) + "px";
            var transform = "rotate(" + angle + "rad)";
            lineNode.style.transform = lineNode.style.msTransform = lineNode.style.MozTransform = lineNode.style.WebkitTransform = lineNode.style.OTransform = transform;

            for (var attr in options.attr) {
                if (attr && attr !== 'color') {
                    $(lineNode).attr(attr,options.attr[attr]);
                }
            }

            var nullStyles = ['color','width','height'];
            for (var attr in options.styles) {
                if (attr && nullStyles.indexOf(attr) === -1) {
                    lineNode.style[attr] = options.styles[attr];
                }
            }
            return lineNode;
        },
        canvasLine: function (canvas, length, options) {
            var context = canvas.getContext('2d');
            context.beginPath();
            context.moveTo(0, 1);
            context.lineTo(length, 1);
            context.closePath();
            context.strokeStyle = options.styles.color;
            context.lineWidth = options.styles.height || '2';
            context.stroke();
        }
    };

    $.fn.smoothLine = function (x1, y1, x2, y2, options, callbacks) {
        $(this).each(function () {
            if ($.isFunction(options)) {
                callback = options;
                options = null;
            } else {
                callback = callbacks;
            }
            options = $.extend({}, $.fn.smoothLine.defaults, options);

            $(this).append(line.createLine(x1, y1, x2, y2, options)).promise().done(function () {
                if ($.isFunction(callback)) {
                    callback.call();
                }
            });
        });
    };

    $.fn.smoothLine.defaults = {
        style: {
            zIndex: 10000,
            color: '#000000'
        },
        attr: {
            id: 'jquery-smooth-line',
            className: 'line'
        }
    };
})(jQuery);