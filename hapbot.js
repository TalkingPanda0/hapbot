
(function () {
	
	var hapbo = 0;
	var siid;
	function setTitle() {
		title = "HapBoo has been sent in the chat " + hapbo + " times!";
		title = title.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		$.updateStatus($.channelName, title , "hapbot" ,1);
		$.say(title);
	}
	$.bind('ircModeration', function (event) {
	    hapbo += event.getMessage().match(/sweetb35HapBoo/g).length
    	});

	$.bind('command', function(event) {
		var args = event.getArgs(),
		action = args[0];
		if(action.equalsIgnoreCase("stop"))
		{
			if(siid){
				clearInterval(siid);
				siid = null;
				$.say("Hapbot stopped");
			} else
			{
				$.say("Hapbot isn't running");
			}
		}
		else if(action.equalsIgnoreCase("start"))
		{
			if(!siid)
			{
				siid = setInterval(setTitle, 30000);
				$.say("Hapbot started");
			} else
			{
				$.say("Hapbot has already started");
			}
		}
	});
	

	$.bind('initReady', function () {
		$.registerChatCommand('./custom/hapbot.js', 'hapbot', 2);
	});
})();
