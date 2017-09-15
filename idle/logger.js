var logger = {
	node: null,
	max_messages: 15,

	init: function() {
		logger.node = $("#logger");
	},

	log: function(message) {
		var log = document.createElement("div");
		$(log).addClass("log")
			  .html(message);

		logger.node.append(log);

		//scroll to bottom
		logger.node.scrollTop(logger.node[0].scrollHeight)

		//remove if too many logs
		if (logger.node.children().length > logger.max_messages) {
			logger.node.find(":first-child").remove();
		}
	},

	clear: function() {
		logger.node.html("");
	}	
};