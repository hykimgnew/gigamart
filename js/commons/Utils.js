'use strict';
App.defineClass('App.commons.Utils', function Utils() {
    var me = this;

    me.convertMSToTime = function (duration) {
        var milliseconds = parseInt((duration%1000)/100), 
            seconds = parseInt((duration/1000)%60),
            minutes = parseInt((duration/(1000*60))%60),
            hours = parseInt((duration/(1000*60*60))%24);

        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;

        return hours + ':' + minutes + ':' + seconds;// + '.' + milliseconds;
    };

    me.trim = function (value) {
        if (typeof value !== 'string' || !value) {
            return value;
        }

        return value.trim();
    };

    me.convertKeyCodeToNumber = function (keyCode) {
        if (keyCode < 48 || keyCode > 57) {
            return NaN;
        }

        return keyCode - 48;
    };
    
    me.change = function (array, target1Index, target2Index) {
    	var temp = {};

    	for (var i = 0, length = array.length; i < length; i++) {
    		temp[i] = array[i];
    	}

    	var target1Object = temp[target1Index];
    	var target2Object = temp[target2Index];

    	temp[target2Index] = target1Object;
    	temp[target1Index] = target2Object;

    	for (var par in temp) {
    		array[par] = temp[par];
    	}
    };

    me.clone = function (obj) {
        var copy;

        // Handle the 3 simple types, and null or undefined
        if (null === obj || 'object' !== typeof obj) {
            return obj;
        }

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
        	
        	copy = [];
        	
        	for (var i = 0, length = obj.length; i < length; i++) {
        		copy.push(me.clone(obj[i]));
        	}
        	
        	
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = me.clone(obj[attr]);
                }
            }
            return copy;
        }

        throw new Error('Unable to copy obj! Its type isn\'t supported.');
    };

    me.generateUUID = function() {
        var s4 = function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                       .toString(16)
                       .substring(1);
        };
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
    };

    me.toBoolean = function(obj) {
        if (typeof obj === 'undefined') {
            return false;
        }
        if (obj === 'undefined') {
            return false;
        }
        if (obj === 'true') {
            return true;
        }
        if (obj === 'false') {
            return false;
        }
        return Boolean(obj);
    };
    me.toNumber = function(value) {
        if (value === 'true' || value === 'false') {
            return NaN;
        }
        return Number(value);
    };
    me.fillZero = function(value, length) {
        var result = '',
            valueStr = value.toString(),
            i;
        if (valueStr.length < length) {
            for (i = 0; i < length - valueStr.length; i++) {
                result += '0';
            }
        }
        return result + valueStr;
    };
    /**
     * Collection 형식의 Object 인지를 반환한다.
     * 판단의 기준은 단순히 length 를 가지고 있느냐 이고, NodeList 에 대한 판단을 위해 만들었다.
     * @param  {Object}  target
     * @return {Boolean} 'length' property 를 가지고 있으면 true, 없으면 false
     */
    me.isAbstractArrayList = function(target) {
        if (target) {
            return target.hasOwnProperty('length');
        }
        return false;
    };
    
    me.convertToJsonWith = function(xml, tab) {
        var X = {
            toObj: function(xml) {
                var self = this,
                    o = {};
                if (xml.nodeType === 1) { // element node ..
                    if (xml.attributes.length) { // element with attributes ..
                        for (var i = 0; i < xml.attributes.length; i++) {
                            o[xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || '').toString();
                        }
                    }
                    if (xml.firstChild) { // element has child nodes ..
                        var textChild = 0,
                            cdataChild = 0,
                            hasElementChild = false;
                        for (var n = xml.firstChild; n; n = n.nextSibling) {
                            if (n.nodeType === 1) {
                                hasElementChild = true;
                            } else if (n.nodeType === 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
                                textChild++; // non-whitespace text
                            } else if (n.nodeType === 4) {
                                cdataChild++; // cdata section node
                            }
                        }
                        if (hasElementChild) {
                            if (textChild < 2 && cdataChild < 2) { // structured
                                // element
                                // with
                                // evtl. a
                                // single
                                // text
                                // or/and
                                // cdata
                                // node ..
                                self.removeWhite(xml);
                                for (n = xml.firstChild; n; n = n.nextSibling) {
                                    if (n.nodeType === 3) { // text node
                                        o['#text'] = self.self.cape(n.nodeValue);
                                    } else if (n.nodeType === 4) { // cdata node
                                        o['#cdata'] = self.escape(n.nodeValue);
                                    } else if (o[n.nodeName]) { // multiple
                                        // occurence of
                                        // element ..
                                        if (o[n.nodeName] instanceof Array) {
                                            o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                        } else {
                                            o[n.nodeName] = [o[n.nodeName],
                                                self.toObj(n)
                                            ];
                                        }
                                    } else {
                                        // first occurence of element..
                                        o[n.nodeName] = self.toObj(n);
                                    }
                                }
                            } else { // mixed content
                                if (!xml.attributes.length) {
                                    o = self.escape(self.innerXml(xml));
                                } else {
                                    o['#text'] = self.escape(self.innerXml(xml));
                                }
                            }
                        } else if (textChild) { // pure text
                            if (!xml.attributes.length) {
                                o = self.escape(self.innerXml(xml));
                            } else {
                                o['#text'] = self.escape(self.innerXml(xml));
                            }
                        } else if (cdataChild) { // cdata
                            if (cdataChild > 1) {
                                o = self.escape(self.innerXml(xml));
                            } else {
                                for (n = xml.firstChild; n; n = n.nextSibling) {
                                    o['#cdata'] = self.escape(n.nodeValue);
                                }
                            }
                        }
                    }
                    if (!xml.attributes.length && !xml.firstChild) {
                        o = null;
                    }

                } else if (xml.nodeType === 9) { // document.node
                    o = self.toObj(xml.documentElement);
                } else {
                    console.error('unhandled node type: ' + xml.nodeType);
                }
                return o;
            },
            toJson: function(o, name, ind) {
                var self = this,
                    json = name ? ('\"' + name + '\"') : '';
                if (o instanceof Array) {
                    for (var i = 0, n = o.length; i < n; i++) o[i] = self.toJson(o[i], '', ind + '\t');
                    json += (name ? ':[' : '[') + (o.length > 1 ? ('\n' + ind + '\t' + o.join(',\n' + ind + '\t') + '\n' + ind) : o.join('')) + ']';
                } else if (o === null) {
                    json += (name && ':') + 'null';
                } else if (typeof(o) === 'object') {
                    var arr = [];
                    for (var m in o) {
                        arr[arr.length] = self.toJson(o[m], m, ind + '\t');
                    }
                    json += (name ? ':{' : '{') + (arr.length > 1 ? ('\n' + ind + '\t' + arr.join(',\n' + ind + '\t') + '\n' + ind) : arr.join('')) + '}';
                } else if (typeof(o) === 'string') {
                    json += (name && ':') + '\"' + o.toString() + '\"';
                } else {
                    json += (name && ':') + o.toString();
                }
                return json;
            },
            innerXml: function(node) {
                var s = '';
                if ('innerHTML' in node) s = node.innerHTML;
                else {
                    var asXml = function(n) {
                        var s = '';
                        if (n.nodeType == 1) {
                            s += '<' + n.nodeName;
                            for (var i = 0; i < n.attributes.length; i++) s += ' ' + n.attributes[i].nodeName + '=\"' + (n.attributes[i].nodeValue || '').toString() + '\"';
                            if (n.firstChild) {
                                s += '>';
                                for (var c = n.firstChild; c; c = c.nextSibling) s += asXml(c);
                                s += '</' + n.nodeName + '>';
                            } else s += '/>';
                        } else if (n.nodeType == 3) s += n.nodeValue;
                        else if (n.nodeType == 4) s += '<![CDATA[' + n.nodeValue + ']]>';
                        return s;
                    };
                    for (var c = node.firstChild; c; c = c.nextSibling) s += asXml(c);
                }
                return s;
            },
            escape: function(txt) {
                return txt.replace(/[\\]/g, '\\\\').replace(/[\"]/g, '\\"').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r');
            },
            removeWhite: function(e) {
                var self = this;
                e.normalize();
                for (var n = e.firstChild; n;) {
                    if (n.nodeType == 3) { // text node
                        if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure
                            // whitespace
                            // text node
                            var nxt = n.nextSibling;
                            e.removeChild(n);
                            n = nxt;
                        } else n = n.nextSibling;
                    } else if (n.nodeType == 1) { // element node
                        self.removeWhite(n);
                        n = n.nextSibling;
                    } else
                    // any other node
                        n = n.nextSibling;
                }
                return e;
            }
        };
        if (xml.nodeType == 9) // document node
            xml = xml.documentElement;
        var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, '\t');
        return '{\n' + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, '')) + '\n}';
    };
    me.equals = function(origin, target) {
        var p;
        if (origin === target) {
            return true;
        }
        // some checks for native types first
        // function and string
        if (typeof(origin) === 'function' || typeof(origin) === 'string' || origin instanceof String) {
            return origin.toString() === target.toString();
        }
        // number
        if (origin instanceof Number || typeof(origin) === 'number') {
            if (target instanceof Number || typeof(target) === 'number') {
                return origin.valueOf() === target.valueOf();
            }
            return false;
        }
        // null.equals(null) and undefined.equals(undefined) do not inherit from the 
        // targetect.prototype so we can return false when they are passed as target
        if (typeof(origin) !== typeof(target) || target === null || typeof(target) === 'undefined') {
            return false;
        }

        function sort(o) {
            var result = {};
            if (typeof o !== 'object') {
                return o;
            }
            Object.keys(o).sort().forEach(function(key) {
                result[key] = sort(o[key]);
            });
            return result;
        }
        if (typeof(origin) === 'object') {
            if (Array.isArray(origin)) { // check on arrays
                return JSON.stringify(origin) === JSON.stringify(target);
            } else { // anyway objects
                for (p in origin) {
                    if (typeof(origin[p]) !== typeof(target[p])) {
                        return false;
                    }
                    if ((origin[p] === null) !== (target[p] === null)) {
                        return false;
                    }
                    switch (typeof(origin[p])) {
                        case 'undefined':
                            if (typeof(target[p]) !== 'undefined') {
                                return false;
                            }
                            break;
                        case 'object':
                            if (origin[p] !== null && target[p] !== null && (origin[p].constructor.toString() !== target[p].constructor.toString() || !origin[p].equals(target[p]))) {
                                return false;
                            }
                            break;
                        case 'function':
                            if (origin[p].toString() !== target[p].toString()) {
                                return false;
                            }
                            break;
                        default:
                            if (origin[p] !== target[p]) {
                                return false;
                            }
                    }
                }
            }
        }
        // at least check them with JSON
        return JSON.stringify(sort(origin)) === JSON.stringify(sort(target));
    };
    return me;
});