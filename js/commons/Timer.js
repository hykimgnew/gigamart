'use strict';
App.defineClass('App.commons.Timer', function Timer() {
    /**
     * @config debug
     * @type {Boolean}
     */
    var debug = true,
        times = {},
        start = function(name) {
            if (!debug || times[name]) {
                return;
            }
            times[name] = {
                start: window.performance.now()
            };
        },
        end = function(name) {
            if (!debug || times[name].end) {
                return;
            }
            times[name].end = window.performance.now();
        },
        report = function() {
            var par, item;
            if (!debug) {
                return;
            }
            for (par in times) {
                item = times[par];
                if (item.end && item.start) {
                    item.dur = item.end - item.start;
                    console.log(par + ' : ' + item.dur);
                }
            }
        },
        execute = function(instance, executeFunction, args) {
            var startTime, endTime;
            startTime = window.performance.now();
            executeFunction.apply(instance, args);
            endTime = window.performance.now();
            console.log(endTime - startTime);
        },
        reset = function() {
            times = [];
        };
    /**
     * window.performance polly fill
     */
    (function() {
        if (typeof window.performance === 'undefined') {
            window.performance = {};
        }
        if (!window.performance.now) {
            var nowOffset = Date.now();
            if (window.performance.timing && window.performance.timing.navigationStart) {
                nowOffset = window.performance.timing.navigationStart;
            }
            window.performance.now = function now() {
                return Date.now() - nowOffset;
            };
        }
    })();
    return {
        start: start,
        end: end,
        report: report,
        reset: reset,
        execute: execute
    };
});