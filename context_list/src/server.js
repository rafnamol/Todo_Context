
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.makeServer = void 0;
var miragejs_1 = require("miragejs");
var faker = require("faker");
export function makeServer() {
    var server = new miragejs_1.Server({
        serializers: {
            // application: JSONAPISerializer.extend({
            //     alwaysIncludeLinkageData: false
            // }),
            todo: miragejs_1.RestSerializer.extend({
                serializeIds: "always",
            })
            // users: RestSerializer.extend({
            //     include:["todo"],
            //     embed: true
            // })
        },
        models: {
            todo: miragejs_1.Model.extend({
                user: miragejs_1.belongsTo()
            }),
            user: miragejs_1.Model.extend({
                todos: miragejs_1.hasMany()
            })
        },
        factories: {
            user: miragejs_1.Factory.extend({
                id: function (i) {
                    return Number(i + 1);
                },
                firstName: function () {
                    return faker.name.firstName();
                },
                lastName: function () {
                    return faker.name.lastName();
                }
            }),
            todo: miragejs_1.Factory.extend({
                name: function () {
                    return faker.random.words(faker.random.number(4) + 1);
                },
                isComplete: false
            })
        },
        seeds: function (server) {
            var users = server.createList("user", 5);
            for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
                var user = users_1[_i];
                server.createList("todo", faker.random.number(4), { user: user });
            }
        },
        routes: function () {
            this.namespace = "api";
            this.get("/users", function (schema) {
                return schema.users.all();
            });
            this.get("/user/:id/todos", function (schema, request) {
                var userID = request.params.id;
                var todos = schema.todos.where({ userID: userID });
                return {
                    todos: todos
                };
            });
            // todo apis
            this.get("/todos", function (schema, request) {
                var active = request.params.active;
                console.log(active);
                return schema.todos.all();
            });
            this.get("/todo/:id", function (schema, request) {
                var todoId = request.params.id;
                var todo = schema.todos.find(todoId);
                return {
                    todo: todo
                };
            });
            this.delete("/todo/:id/delete", function (schema, request) {
                var todoId = request.params.id;
                schema.todos.find(todoId).destroy();
                return { success: true };
            });
            this.post("/todo/create", function (schema, request) {
                var attrs = JSON.parse(request.requestBody);
                return schema.todos.create(attrs);
            });
        }
    });
    return server;
}

