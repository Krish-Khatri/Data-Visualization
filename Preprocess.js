(function() {
    preprocess = {

        // Construct package hierarchy using class names (Lazy).
        nodes: function(couple) {
            var map = {};

            function find(name, data) {
                var object = map[name];
                if (!object) {
                    object = map[name] = {name: name, children: []};
                    if (name.length){
                        object.parent = find("");
                        object.parent.children.push(object);
                    }
                }
                if (data !== undefined && data.target.length) {
                    object.children.push({name: data.target, children: [], country: data.Country, dvalue: data.DollarValue, parent: object})
                }
                return object;
            }

            couple.forEach(function(instance) {
                find(instance.source, instance);
            });

            return map[""].children;
        },

        // Return list of imports for the given array
        links: function(data) {
            var map = {},
                link = [];

            // Compute a map from name to node.
            data.forEach(function(instance) {
                map[instance.name] = instance;
            });

            // For each import, construct a link from the source to target node.
            data.forEach(function(instance) {
                console.log("checking: ");
                console.log(instance);
                if (instance.children.length) {
                    console.log("found "+ instance.children.length + " children");
                    instance.children.forEach(function(i) {
                        console.log("pushing link:");
                        console.log("  map[instance.name] = map["+instance.name+"]:");
                        console.log(map[instance.name]);
                        console.log("  to:");
                        console.log(i);
                        link.push({source: map[instance.name], target: i});
                    });
                }
            });

            return link;
        }

    };
})();
