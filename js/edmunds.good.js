(function() {
	var keys = [/(Toyota) (Prius|Corolla|Camery)/ig, /(BMW) (3-series|5-series)/ig];
	var textNodes = [];
	function xpathSelector() {
	    var xpathResult = document.evaluate(
	        "//*/text()", 
	        document.documentElement, 
	        null, 
	        XPathResult.ORDERED_NODE_ITERATOR_TYPE, 
	        null
	    );
	    var res;
	    while(res = xpathResult.iterateNext()) {
	        textNodes.push(res);
	    }
	}
	function findMatch(obj) {
		var str = obj.nodeValue;
		var len = keys.length;
		var newStr = false;
		for (var i=0; i<len; i++) {
		    str = str.replace(keys[i], function(word) {
				newStr = true;
		        return word + " <div style=\"position:relative; display:inline;\" class=\"tTip\" title=\"To hold cows together.\" href=\"http://www.edmunds.com\"><img style=\"left: -10px; z-index: 999; position: absolute; top:-7px; z-index:999;\" src=\""+chrome.extension.getURL("icons/edm_SS.png")+"\" /></div>";
			});
		}
		if (newStr) {
			var par = obj.parentNode;
			var newNode = document.createElement('span');
			newNode.innerHTML = str;
			par.insertBefore(newNode, obj);
			par.removeChild(obj);	
		}
	}
	function findCars() {
		var len = textNodes.length;
		var newStr;
		for (var i=0; i<len; i++) {
			if (textNodes[i].parentNode.tagName.toLowerCase() != 'title' && textNodes[i].parentNode.tagName.toLowerCase() != 'head' && textNodes[i].parentNode.tagName.toLowerCase() != 'script') {
		    	findMatch(textNodes[i]);
			}
		}
	}
	
	// Implementation logic
	xpathSelector();
	if (window.location.href.indexOf('www.edmunds.com') === -1) {
		findCars();
		$('.tTip').betterTooltip({speed: 150, delay: 300});
	}
})();