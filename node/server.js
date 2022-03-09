import Discord from 'discord.js';
import dotenv from 'dotenv'
dotenv.config();

const CHANNEL_IDS = ['951216669953507439', '940696336959934484'];

const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
});

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
  console.log('sup');
})

client.on('message', async msg => {
  if (msg.author.bot) { return }
  if (CHANNEL_IDS.includes(msg.channel.id)) {
    const body = msg.content;
    console.log(body);
    if(body.includes('💚')) {
      const newBody = body.replaceAll('💚', '💙');
      const user = (await msg.guild.members.fetch(msg.author.id)).user;
      await msg.channel.send(`${user}'s -rdle score:\n${newBody}`);
      msg.delete();
    }
  }

  // const commandBody = msg.content.substring(commandPrefix.length)
  // const command = commandBody.split(' ')[0];
  // const commandInput = commandBody.substring(command.length + 1);

  // if (Object.keys(commands).includes(command.toLowerCase())) {
  //   checkVoteLife();
  //   commands[command.toLowerCase()](msg, commandInput);
  // }
  // else {
  //   msg.channel.send(`Invalid Command: ${command}`);
  // }

});