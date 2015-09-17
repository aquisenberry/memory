"use strict";
function checkMatch(objOfObjs, obj){
	for (var prop in objOfObjs){
		console.log(objOfObjs[prop].card === true && objOfObjs[prop] !== obj && objOfObjs[prop].selected === true, objOfObjs[prop], obj)
		if (objOfObjs[prop].card === true && //if card entity
			objOfObjs[prop] !== obj && //if not same card
			objOfObjs[prop].selected === true &&// if selected
			objOfObjs[prop].type.id === obj.type.id ){ //if has same type ID
			console.log(objOfObjs[prop],obj);
			objOfObjs[prop].matched = true;
			obj.matched = true;
		}
	}
}
function hideCards(obj){
	for(var prop in obj){
		if(obj[prop].card === true){
			obj[prop].selected = false;
		}
	}
}
module.exports = function(ecs, data) {
	
	var selectedCount = 0;
	ecs.addEach(function(entity, elapsed) { // jshint ignore:line

		if(data.input.mouse.consumePressed(0, entity.drawPosition.x,
											entity.drawPosition.y, 
											entity.size.width, 
											entity.size.height) && entity.selected !== true){
			entity.selected = true;
			selectedCount += 1;
			if(selectedCount>1){
				//check match
				checkMatch(data.entities.entities, entity);
				//hide cards
				hideCards(data.entities.entities);
				selectedCount = 0;
			}
		}
	}, ["card"]);
};
