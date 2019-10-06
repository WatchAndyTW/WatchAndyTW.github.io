const userdata = "../../userpteraccdata.json";
const login = require("nodeactyl")
const api = "SwbGr96ojD7dWort5whV5cN3eYvrXJ6b6tDEWXb1KiNAZ5zZ"
module.exports = {
    config: {
        name: "test",
        aliases: ["h", "halp", "commands"],
        usage: "!server",
        category: "一般",
        description: "see stats at bot",
        accessableby: "Members"
    },
    run: async (bot, message, args , node) => {
        const Node = require('nodeactyl');
    Node.login("https://panel.widh.ga", api).catch(error => {
         if (error) {
             message.channel.send(error)}
        })
        Node.getAllServers().then(response => {
            message.channel.send(response); 
        }
        )}
}