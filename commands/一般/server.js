const node = require("nodeactyl");
const userdata = "../../userpteraccdata.json";
const {login} = require("nodeactyl")
const api = "SwbGr96ojD7dWort5whV5cN3eYvrXJ6b6tDEWXb1KiNAZ5zZ"
module.exports = {
    config: {
        name: "server",
        aliases: ["h", "halp", "commands"],
        usage: "!server",
        category: "一般",
        description: "see stats at bot",
        accessableby: "Members"
    },
    run: async (bot, message, args , node) => {
            //node.login("http://panel.widh.ga", `${userdata}.${message.author.tag}`)
        if(`${userdata}.${message.author.tag}` != null){
    node.login("https://panel.widh.ga", api, "application").catch(error => {
         if (error) console.log(error);
        });
            node.getAllServers().then(responce => {
                message.channel.send(responce)
            })
        }
    }
}