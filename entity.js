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
	})
}


/*
 * Create a label (child) at given node and
 * add attributes from entity_info to given node.
 */
function populateEntityNode(node, entity_info) {

	//visible name label
	var name = document.createElement("label");
	$(name).addClass("name")
		   .html(entity_info.name);
	node.append(name);

	// //hidden stats
	$(node).attr("data-hp", entity_info.hp);
	$(node).attr("data-dmg", entity_info.dmg);
	$(node).attr("data-exp", entity_info.exp);


	// var hp = document.createElement("input");
	// var dmg = document.createElement("input");
	// var exp = document.createElement("input");
}


