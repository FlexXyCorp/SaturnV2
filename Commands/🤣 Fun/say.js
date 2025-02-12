const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDMPermission(false)
    .setDescription("Says a specified message as specified user.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Specified user will be faked.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Specified message will be sent as the fake user.")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { options } = interaction;


if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers) && interaction.user.id !== '310107091542999040') return await interaction.reply({ content: 'You **do not** have the permission to do that!', ephemeral: true});



    const member = options.getUser("user");
    const message = options.getString("message");
    interaction.channel
      .createWebhook({
        name: member.username,
        avatar: member.displayAvatarURL({ dynamic: true }),
      })
      .then((webhook) => {
        webhook.send({ content: message });
        setTimeout(() => {
          webhook.delete();
        }, 3000);
      });
    interaction.reply({
      content: "Spoof was **successful**!",
      ephemeral: true,
    });
  },
};