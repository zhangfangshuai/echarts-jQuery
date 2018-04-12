
	var maAddress = "http://122.14.205.135:8110/";
	//var maAddress = "http://10.18.105.112:8090/";

	var sessionUserName = sessionStorage.nickname;
	var _maq = _maq || [];
	//_maq.push(['_pageMessage', 'BI统计系统']);
	_maq.push(['_loginInfo', sessionUserName]);

	(function() {
	  var wa = document.createElement("script");
	  wa.src = maAddress+"BiMonitor/js/logMonitor.js";
	  var s = document.getElementsByTagName("script")[0];
	  s.parentNode.insertBefore(wa, s);
	})();
