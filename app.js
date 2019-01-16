var Queue = function () {
    this.items = [];
};
Queue.prototype.enqueue = function (obj) {
    console.log("enqueue: ", obj);
    this.items.push(obj);
};
Queue.prototype.dequeue = function () {
    return this.items.shift();
};
Queue.prototype.isEmpty = function () {
    return this.items.length === 0;
};
Queue.prototype.isPresent = function (item) {
    return this.items.indexOf(item) > -1;
}

/**********************************************************/
class Graph {
    constructor() {
        this.vertices = [];
        this.adjacentList = new Map();
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
        this.adjacentList.set(vertex, []);
    }
    getAdjacencyListVertex(v) {
        return this.adjacentList.get(v);
    }

    addEdge(u, v) {
        let uVertex = this.getAdjacencyListVertex(u),
            vVertex = this.getAdjacencyListVertex(v);
        //Step 1 : push V into U's list
        uVertex.push(v);
        //Step 2: push U into V's list
        vVertex.push(u);
    }

    print() {
        this.adjacentList.forEach(function (value, key, map) {
            console.log(`${key} => ${value}`);
        });
    }

    apply_breadth_first_search(startingVertex) {


        var visited = [];
        var queue = new Queue();
        var distances = {};
        var parent = {};



        for (let i = 0; i < this.vertices.length; i++) {
            distances[this.vertices[i]] = -1;
            //we initialize all preceding distance to null with the exception
            //of the current start vertex.
            if (this.vertices[i] === startingVertex) {
                distances[this.vertices[i]] = 0;
                parent[this.vertices[i]] = startingVertex;
            } else {
                parent[this.vertices[i]] = null;
            }

        }//for loop end


        //1
        queue.enqueue(startingVertex);

        //2
        while (!queue.isEmpty()) {
            //3
            var firstVertexItemInQueue = queue.dequeue();

            //4
            this.getAdjacencyListVertex(firstVertexItemInQueue).forEach(function (adjVertex) {

                if (!queue.isPresent(adjVertex) && visited.indexOf(adjVertex) === -1) {
                    if (startingVertex === firstVertexItemInQueue) {
                        distances[adjVertex] = 1;
                    }
                    else {
                        distances[adjVertex] = distances[firstVertexItemInQueue] + 1;
                    }
                    parent[adjVertex] = firstVertexItemInQueue;
                    queue.enqueue(adjVertex);
                }
            });

            //5
            visited.push(firstVertexItemInQueue);
        }

        console.log(`Result: ${visited}`);


        //Output Shortest distance based on number of hops
        for (var i in distances) {
            console.log('Shortest Distance from ' + startingVertex + ' to ' + i + ' is in ' + distances[i] + ' step(s)');
        }

        debugger;
        return {
            distances: distances,
            parent: parent
        }
    }//apply_breadth_first_search

    shortest_path(source, target) {
        debugger;
        var path = null;
        var stack = [];
        var disptances_n_parents = this.apply_breadth_first_search(source);
        debugger;
        document.getElementById('bfs').innerHTML = JSON.stringify(disptances_n_parents);

        stack.push(target);

        do {
            var recentVertex = stack[stack.length - 1];
            var previousVertex = disptances_n_parents.parent[recentVertex];
            stack.push(previousVertex);
        } while (disptances_n_parents.distances[previousVertex] !== 0);

        return stack.reverse();

    }


}//end of Graph class
var graph = new Graph();



//create an array of vertices to add to graph
var vertices = ['K', 'T', 'J', 'M', 'N', 'F'];
//iterate vertices and add each vertex to the graph

vertices.map(function (vertex) {
    graph.addVertex(vertex);
});

//create edge connections
graph.addEdge('K', 'T');
graph.addEdge('K', 'M');
graph.addEdge('K', 'J');
graph.addEdge('T', 'M');
graph.addEdge('J', 'M');
graph.addEdge('J', 'F');
graph.addEdge('M', 'N');
graph.addEdge('M', 'F');


graph.print();

//graph.apply_breadth_first_search("K");

var startVertex = vertices[0];
var bfs = graph.apply_breadth_first_search(startVertex);

function getShortestPath() {
    debugger;
    var source = document.getElementById('source').value;
    var target = document.getElementById('target').value;
    var shortestPathFromTo = graph.shortest_path(source, target);
    console.log(`Shortest Path From ${source} to ${target} is: ${shortestPathFromTo}`);
    document.getElementById('shortespath').innerHTML = `Shortest Path From ${source} to ${target} is: ${shortestPathFromTo}`;
}


debugger;
// graph.shortestPathToAll(startVertex, bfs);


