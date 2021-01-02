(function (){
    preprocess = {
        links: function (nodes){
            var map = {},
                nodes_array = [],
                country_map = {};
            let country_arr = [],
                links = [],
                index = 0,
                index_two = 0;

            function makeMap(name, data){
                var node = map[name];
                if(!node){
                    node = map[name] = {name : name, key : index, links : 0, dvalue: 0 };
                    nodes_array[index] = node;
                    index++;
                }
                if(node.country === undefined && data.Country !== undefined){
                    if(country_map[data.Country] === undefined){
                        country_map[data.Country] = {name: data.Country, key: index_two};
                        country_arr[index_two] = country_map[data.Country];
                        index_two++;
                    }
                    node.country = data.Country;
                    node.country_code = country_map[data.Country].key;

                    if(data.DollarValue.charAt(0) === "$"){
                        var re = new RegExp("[$,]", "g");
                        node.dvalue = data.DollarValue.replace(re, "");
                    }
                    nodes_array[node.key] = node
                }
            }

            nodes.forEach(function(instance) {
                makeMap(instance.source, {});
                makeMap(instance.target, instance)
            });

            nodes.forEach(function(instance) {
                if (instance.target.length && instance.source.length) {
                    map[instance.target].links++;
                    map[instance.source].links++;
                    links.push({source: map[instance.source].key, target: map[instance.target].key});
                }
            });

            return {nodes: nodes_array, links: links, countries: country_arr};
        }

    };
})();
