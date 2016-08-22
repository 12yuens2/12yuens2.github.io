function isVisible(stat) {
	return stat === "atk-spd" ? false : true;
}

function parseMonsterJSON() {
	$.getJSON("monsters.json", function (json) {
		$.monsters = json;
		spawnMonster();
	});
}

function loadPlayer() {
	$.getJSON("player.json", function(json) {
		$.player_info = json;

		populateEntityNode($("#player"), $.player_info)
		$("#player").attr("data-lvl", 1);
	})
}


/*
 * Create a label (child) at given node and
 * add attributes from entity_info to given node.
 */
function populateEntityNode(node, entity_info) {

	//visible stats
	var stats = ["name", "hp", "dmg", "exp", "atk-spd"];
	for (var i = 0; i<stats.length; i++) {

		//visible stats
		if (isVisible(stats[i])) {
			var label = document.createElement("label");
			$(label).addClass(stats[i])
					.html(stats[i] + ": " + entity_info[stats[i]]);
			node.append(label);
			node.append("<br>");
		}

		//hidden stats
		$(node).attr("data-" + stats[i], entity_info[stats[i]]);
	}

	//set attack cooldown
	$(node).attr("data-atk-cd", $(node).attr("data-atk-spd"));
}


