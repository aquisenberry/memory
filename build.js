var browserify = require("browserify");
var fs = require("fs");
var header = "/*Splat-ECS Memory*/\n";

var b = browserify();
b.add("./game.js");

var scripts = require("./scripts");
scripts.forEach(function(script) {
	b.require(script);
});

var systems = require("./systems");
systems.simulation.forEach(function(system) {
	if (system.name.indexOf("splatjs:") === 0) {
		return;
	}
	b.require(system.name);
});
systems.renderer.forEach(function(system) {
	if (system.name.indexOf("splatjs:") === 0) {
		return;
	}
	b.require(system.name);
});

var out = fs.createWriteStream("./index.js");
b.bundle().pipe(out);

var minout = fs.createWriteStream("./index.min.js");
minout.write(header, function(err) {
	b.transform({ global: true, sourcemap:false }, "uglifyify");
	b.bundle().pipe(minout);
});
