'use strict'
try {
    var initIndexFocus = function() {
		var appConfiguration = window.oipfObjectFactory.createConfigurationObject();
		var appManager = window.oipfObjectFactory.createApplicationManagerObject();
		var ownerApp = appManager.getOwnerApplication(window.document);
		var keySet = ownerApp.privateData.keyset;
		var keys = (keySet.OTHER | keySet.GREEN | keySet.RED | keySet.BLUE | keySet.YELLOW | keySet.NUMERIC | keySet.NAVIGATION);
		keySet.setValue(keys, [VK_MUTE, VK_VOLUME_UP, VK_VOLUME_DOWN]);

		var keyDownEventReceivedForIndex  = function(e){
						        e.preventDefault();
						        e.stopPropagation();

						        alert(e.keyCode);
		};
		ownerApp.onKeyDown = keyDownEventReceivedForIndex;
		window.document.addEventListener('keydown', keyDownEventReceivedForIndex);
	}
} 
catch(err) {
    alert("indexFocus" + err);
}