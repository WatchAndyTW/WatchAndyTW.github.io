const { RichEmbed } = require("discord.js")
const { prefix , FooterCreator } = require("../../botconfig.json");
module.exports = {
    config: {
        name: "suggestion",
        aliases: ["h", "halp", "commands"],
        usage: `${prefix}suggestion`,
        category: "一般",
        description: "建議頻道",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        /*
        const suggestionChannel = bot.channels.get("615727062895952000")
        var suggestion = message
        var suggester = message.author.username
        let SuggestEmbed = new RichEmbed()
        .setTitle("建議者: " + suggester)
        .setDescription(suggestion)
        .setColor("RANDOM")
        message.delete();

        if(args[0] === ' ') {
            const Errorembed = new RichEmbed()
            .setDescription(`❌ 正確使用: ${prefix}suggestion <建議> (提示:<#615727062895952000> 打指令)`)
            message.channel.send(Errorembed)
        }
        try {

            
            suggestionChannel.send(SuggestEmbed).then(async msg => {
            
              await msg.react('✅')
              await msg.react('❎')
            })}catch {
                const Errorembed = new RichEmbed()
                .setDescription(`❌ 正確使用: ${prefix}suggestion <建議> (提示:<#615727062895952000> 打指令)`)
                message.channel.send(Errorembed)
            }
*/
        }}
