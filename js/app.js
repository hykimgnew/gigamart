'use strict';

var App = App || {};

var cmsServerIp = "http://14.52.244.91:8080";

/**
 * Request.getParameter("args")
 *
 * @method define
 */
var Request = function()
{
    this.getParameter = function( name )
    {
        var rtnval = '';
        var nowAddress = unescape(encodeURIComponent(location.href));
        nowAddress = decodeURIComponent(nowAddress);

        var parameters = (nowAddress.slice(nowAddress.indexOf('?')+1,nowAddress.length)).split('&');
        for(var i = 0 ; i < parameters.length ; i++)
        {
            var varName = parameters[i].split('=')[0];
            if(varName.toUpperCase() == name.toUpperCase())
            {
                rtnval = parameters[i].split('=')[1];
                break;
            }
        }
		return rtnval;
    }
}
var request = new Request();
var buyerID		= request.getParameter("buyerID");

/**
 * 간편 장바구니 조회
 **/
var retrieveEasyCart = function()
{
	var resultList;

    $.ajax({
        url         : cmsServerIp + "/BuyerCartTask/Select",
        type        : "post",
        dataType    : "json",
        async       : true,
        xhrFields   : {
                        withCredentials: true
        },
        success     : function(result) {
        	var appendHtml = "";
        	console.log("#간편 장바구니 조회 : " + JSON.stringify(result));

			var ec_cost = 0;	// 상품 금액
			var ec_comm = 0;	// 쇼퍼 수수료
			var ec_total = 0;	// 총 금액

			$.each(result['cart'], function(index, entry) {
				appendHtml += '<li name="ec_li_list" class="scl_row">';
				appendHtml += '	<table width="100%" cellpadding="0" cellspacing="0" border="0">';
				appendHtml += '		<tr>';
				appendHtml += ' 		<td class="sr_img"><img src="' + cmsServerIp + entry["img"] + '" width="78px" height="78px" />';
				appendHtml += '<input type="hidden" name="ec_cost" value="' + entry["cost"] + '"/>';
				appendHtml += '<input type="hidden" name="ec_cnt" value="' + entry["cnt"] + '"/>';
				appendHtml += '<input type="hidden" name="ec_id" value="' + entry["product_id"] + '"/>';
				appendHtml += '			</td>';
				appendHtml += '			<td class="sr_txt" name="sr_txt">' + entry["name"] + '</td>';
				appendHtml += ' 		<td class="sr_qty" name="sr_cnt">' + entry["cnt"] + '</td>';
				appendHtml += '			<td class="sr_price" name="sr_cost">' + cn_toPrice(entry["cost"]) + '원</td>';
				appendHtml += '		</tr>';
				appendHtml += ' </table>';
				appendHtml += '</li>';

				ec_cost    += Number(entry["cost"]);
				ec_comm	   += Number(entry["cost"]) * 5 / 100;
			});

			ec_total = ec_cost + ec_comm;

			console.log("총 금액 : " + ec_total);

			$('#ec_list').empty().append(appendHtml);
			$('#cost').html(cn_toPrice(ec_cost) + "원");
			$('#shopper_cost').html(cn_toPrice(ec_comm) + "원");
			$('#total_cost').html(cn_toPrice(ec_total) + "원");
        }
    });

    return resultList;
}

/**
 * 장바구니 삭제 
 **/
/*var deleteEasyCart = function(type, productArr) 
{
	$.ajax({
        url         : cmsServerIp + "/BuyerCartTask/Select",
        type        : "post",
        dataType    : "json",
        async       : true,
        xhrFields   : {
                        withCredentials: true
        },
        success     : function(result) {
        }
    });
}*/


/**
 *
 * 클래스를 정의한다.
 * 
 * @method define
 * @param  {String} namespace 해당 클래스의 namespace
 * @param  {Function|Object} constructor 생성자 함수 혹은 BaseObject 기반의 정의 객체
 */
Object.defineProperty(App, 'defineClass', {
	value : function (namespace, constructFunction) {
	    var sections = namespace.split('.'),
	        parent = window,
	        i, length, className;

	    if (sections[0] === 'window') {
	        sections.splice(0, 1);
	    }

	    for (i = 0, length = sections.length; i < length; i++) {

	    	if (i === length - 1) {
	    		className = sections[i];
	    		continue;
	    	}

	        if (typeof parent[sections[i]] === 'undefined') {
	    		parent[sections[i]] = {};	
	        }
	        parent = parent[sections[i]];
	    }

	    if (window[className]) {
	    	// throw 'already existed window[name] : ' + className;
	    }

	    // 생성자 Function 이면 직접 생성해 준다. 주로 Singlton Class 를 표현할때 쓰인다.
	    if (constructFunction instanceof Function) {
	    	
	    	constructFunction.prototype.toString = function() {
		    	return className;
		    };

		    constructFunction.prototype.instanceOf = function(str) {
		    	return str === namespace;
		    };

		    parent[className] = new constructFunction();
		    // static 성격을 지니고 있으므로, window 자식 프로퍼티로 등록한다.
		    window[className] = parent[className];
		    
	    } else if (constructFunction instanceof Object) { 

	    	if (!constructFunction.toString) {
	    		constructFunction.toString = function() {
	    			return namespace;
	    		}	
	    	}

	    	constructFunction.instanceOf = function(str) {
	    		return str === namespace;
		    };

	    	// 일반 Object 정의인 경우 이렇게 한다. 주로 Component Class 를 표현할 때 쓰인다.
	    	parent[className] = Class.extend(constructFunction);

	    } else {
	    	throw 'Not supported \'constructFunction\' parameter!';
	    }

	    return parent[className];
	}
});

/**
 *
 * BaseObject 기반으로 정의된 클래스를 상속하여 새로운 클래스를 정의한다.
 *
 * @method
 * @param  {String} parentClassNameSpace 부모 클래스의 네임스페이스
 * @param  {String} newClassNameSpace    생성하려는 클래스의 네임스페이스
 * @param  {Object} definition           생성하려는 클래스의 BaseObject 기반 정의 객체
 */
Object.defineProperty(App, 'extendClass', {
	value: function(parentClassNameSpace, newClassNameSpace, definition) {

		// Parameter Validation
		if (arguments.length !== 3) {
			throw 'Arguments\' length should be 3!!!';
		} else if (!(typeof parentClassNameSpace === 'string')) {
			throw 'Parent Class Namespace should be String!!!';
		} else if (!(typeof newClassNameSpace === 'string') ){
			throw 'New Class Namespace should be String!!!';
		} else if (!(definition instanceof Object) || definition instanceof Array) {
			throw 'Definition should be plain object!!';
		}

		var parentClass = window, 
			parentClassSections = parentClassNameSpace.split('.'),
			newClassSections = newClassNameSpace.split('.'),
			parentNode = window, 
			newClassName, i, lengh; 

		// Parent Class Parsing
		if (parentClassSections[0] === 'window') {
	        parentClassSections.splice(0, 1);
	    }

	    for (i = 0, length = parentClassSections.length; i < length; i++) {

	    	if (typeof parentClass[parentClassSections[i]] === 'undefined') {
	    		parentClass[parentClassSections[i]] = {};	
	        }
	        parentClass = parentClass[parentClassSections[i]];
	    }

	    if (Object.keys(parentClass).length === 0) {
	    	throw 'Parent class is not existed!!!';
	    } else if (!(Class.isPrototypeOf(parentClass))) {
	    	throw 'Parent class is not extended Class!!';
	    }

	    // New Class Parsing
	    if (newClassSections[0] === 'window') {
	        newClassSections.splice(0, 1);
	    }

	    for (i = 0, length = newClassSections.length; i < length; i++) {

	    	if (i === length - 1) {
	    		newClassName = newClassSections[i];
	    		continue;
	    	}

	        if (typeof parentNode[newClassSections[i]] === 'undefined') {
	    		parentNode[newClassSections[i]] = {};	
	        }
	        parentNode = parentNode[newClassSections[i]];
	    }

	    parentNode[newClassName] = parentClass.extend(definition);

	    parentNode[newClassName].instanceOf = function(str) {
	    		return str === newClassNameSpace || str === parentClassNameSpace;
		    };

	    window[newClassName] = parentNode[newClassName];

	    return parentNode[newClassName];
	}
});






/**
 * [BaseObject description]
 * @type {Object}
 */
var Class = {
    create: function create() {
       var instance = Object.create(this);
       instance._construct.apply(instance, arguments);
       return instance;
    },
 
    extend: function extend(properties, propertyDescriptors) {
        propertyDescriptors = propertyDescriptors || {};
 
        if(properties){
            var simpleProperties = Object.getOwnPropertyNames(properties);
            for (var i = 0, len = simpleProperties.length; i < len; i += 1) {
                var propertyName = simpleProperties[i];
                if(propertyDescriptors.hasOwnProperty(propertyName)) {
                    continue;
                }
 
                propertyDescriptors[propertyName] =
                    Object.getOwnPropertyDescriptor(properties, propertyName);
            }
        }
 
        return Object.create(this, propertyDescriptors);
    },
 
    _construct: function _construct() {},
 
    _super: function _super(definedOn, methodName, args) {
        if (typeof methodName !== "string") {
            args = methodName;
            methodName = "_construct";
        }
 
        return Object.getPrototypeOf(definedOn)[methodName].apply(this, args);
    }
};