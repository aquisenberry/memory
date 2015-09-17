"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context) { 
		if(entity.matched !== true){
			context.fillStyle = "black";
			if(entity.selected){
				context.fillStyle = entity.type.color;
			}
			context.fillRect(
				entity.drawPosition.x, 
				entity.drawPosition.y, 
				entity.size.width, 
				entity.size.height);
		}
	
	}, ["card"]);
};
