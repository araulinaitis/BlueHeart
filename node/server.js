import Discord from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const CHANNEL_IDS = ['951216669953507439', '940696336959934484'];

const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
});

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
  console.log('sup');
});

client.on('message', async msg => {
  if (msg.author.bot) {
    return;
  }
  if (CHANNEL_IDS.includes(msg.channel.id)) {
    const body = msg.content;
    if ((body.includes('💚') || body.includes('🟩')) && body.includes('rdle')) {
      let newBody = body.replaceAll('🟨', '🟦');
      newBody = newBody.replaceAll('🟩', '🟨');
      newBody = newBody.replaceAll('💛', '💙');
      newBody = newBody.replaceAll('💚', '💛');
      const user = (await msg.guild.members.fetch(msg.author.id)).user;
      const newMessage = await msg.channel.send(`${user}'s -rdle score(s):\n${newBody}`);
      newMessage.suppressEmbeds();
      msg.delete();
    }
  }
});
