'use strict';
App.defineClass('App.commons.EventBus', function EventBus() {
    var me = this,
        messages = {};
        
    me.__defineGetter__('messages', function() {
        return messages;
    });
    /**
     * 이벤트를 등록.
     * @param  {Object}   [required] instance 이벤트를 발생시키는 주체
     * @param  {String}   [required] name     이벤트 이름
     * @param  {Function} [required] callback 이벤트시 발생시키는 메소드
     * @param  {Number}   [optional] priority 이벤트 발생 우선 순위, prirority 가 생략되고 condition 이 올 수도 있다.
     * @param  {Function} [optional] condition 이벤트 발생 조건
     */
    me.register = function(instance, name, callback, priority, condition) {

        if (messages[name] === undefined) {
            messages[name] = [];
        }

        if (arguments.length === 1) {
            messages[name].push({
                instance: instance.instance,
                callback: instance.callback,
                priority: typeof instance.priority === 'number' ? priority : 998,
                condition: instance.condition
            });
        } else {
            messages[name].push({
                instance: instance,
                callback: callback,
                priority: typeof priority === 'number' ? priority : 998,
                condition: typeof priority === 'function' ? priority : condition
            });    
        }
    };
    /**
     * 이벤트를 발생.
     * 이벤트명이 존재하지 않는 경우 아무것도 발생하지 않는다.
     * 임시로 이벤트 발생을 중단된 경우에도 발생하지 않는다.
     * @param  {String} name 등록된 이벤트명
     */
    me.fire = function(name) {
        var events = messages[name],
            args = [],
            i, length;
        // 첫번째 파라미터인 name 을 제거한 나머지를 표현한다.
        for (i = 0, length = arguments.length; i < length; i++) {
            if (i !== 0) {
                args.push(arguments[i]);
            }
        }
        if (events) {
            // priority 우선 순위에 맞추어 재정렬한다.
            events.sort(function(beforeObject, afterObject) {
                return beforeObject.priority - afterObject.priority;
            });
            for (i = 0, length = events.length; i < length; i++) {


                if (events[i].condition instanceof Function && events[i].condition.apply(events[i].instance, args) !== true) {
                    continue;
                }

                if (events[i].callback.apply(events[i].instance, args) === false) {
                	// Event Listener 메소드가 'false' 를 리턴하면 해당 이벤트는 종료된다.
                	// 테스트 성격, 디버그 성격...기타 등등의 목적이다.
                	return;
                };
            }
        }
    };
    return me;
});