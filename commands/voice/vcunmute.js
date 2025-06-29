const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    MessageSelectMenu
} = require('discord.js')

module.exports = {
    name: 'vcunmute',
    category: 'voice',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MUTE_MEMBERS')) {
            const error = new MessageEmbed()
                .setColor(client.color)
                .setDescription(
                    `You must have \`Mute members\` permission to use this command.`
                )
            return message.channel.send({ embeds: [error] })
        }
        if (!message.guild.me.permissions.has('MUTE_MEMBERS')) {
            const error = new MessageEmbed()
                .setColor(client.color)
                .setDescription(
                    `I must have \`Mute members\` permission to use this command.`
                )
            return message.channel.send({ embeds: [error] })
        }
        if (!message.member.voice.channel) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `You must be connected to a voice channel first.`
                        )
                ]
            })
        }
        let member1 =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0])
        if (!member1) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `You must mention someone whom you want to unmute in your vc.`
                        )
                ]
            })
        }
        let member =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0])
        if (!member.voice.channel) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<@${member.user.id}> is not in your vc.`
                        )
                ]
            })
        }
        try {
            member.voice.setMute(
                false,
                `${message.author.tag} (${message.author.id})`
            )
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<a:Tick:1306038825054896209>  | Successfully UnMuted <@${member.user.id}> From Voice!`
                        )
                ]
            })
        } catch (err) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `I was unable to voice unmute <@${member.user.id}>.`
                        )
                ]
            })
        }
    }
}
