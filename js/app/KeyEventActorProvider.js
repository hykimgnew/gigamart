'use strict';

/**
 * app Common js :  KeyEventActorProvider (사용 안함 : 각 화면의 KeyEventActorProvider를 각각 정의해서 사용함)
 **/
App.defineClass('Gigamart.app.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;

    	me.actors = [];

    },

    getKeyEventActor: function () {
    	var me = this;
        
    	/*for (var i = 0, length = me.actors.length; i < length; i++) {
    		
    		if (me.actors[i].conditionFunction.call(me.actors[i].instance)) {
    			return me.actors[i].instance;
    		}

    	}*/
    },

    addKeyEventActor: function (instance, conditionFunction) {
    	this.actors.push({
    		instance: instance,
    		conditionFunction: conditionFunction
    	});
    }
});