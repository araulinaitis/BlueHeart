import Discord from 'discord.js';
import dotenv from 'dotenv';
import * as fs from 'fs/promises';
dotenv.config();

const CHANNEL_IDS = ['951216669953507439', '940696336959934484'];

const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
});

client.login(process.env.BOT_TOKEN);

let userList = {};

client.on('ready', async () => {
  try {
    userList = JSON.parse(await fs.readFile('./userList.json', 'utf8'));
  }
  catch(err) {
    fs.writeFile('./userList.json'), JSON.stringify({});
  }

  console.log('sup');
  console.log(userList);
});

client.on('message', async msg => {
  if (msg.author.bot) {
    return;
  }
  if (CHANNEL_IDS.includes(msg.channel.id)) {
    const body = msg.content;
    if (body.substring(0, ('!blueHeart opt in').length).toLowerCase() === '!blueheart opt in') {
      userList[msg.member.id] = true;
      await saveList();
      msg.channel.send('Thank you for opting in to the blueHeart bot!\n💙💛');
    }
    else if (body.substring(0, ('!blueHeart opt out').length).toLowerCase() === '!blueheart opt out') {
      userList[msg.member.id] = false;
      await saveList();
      msg.channel.send('You have been opted out of the blueHeart bot.');
    }
    else if (body.substring(0, ('!blueHeart').length).toLowerCase() === '!blueheart') {
      const user = (await msg.guild.members.fetch(msg.author.id)).user;
      msg.channel.send(`${user}, use \`!blueHeart opt in\` or \`!blueHeart opt out\` to change your opt-in/out status`);
    }
    else if ((body.includes('💚') || body.includes('🟩')) && body.includes('rdle') && userList[msg.member.id]) {
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


async function saveList() {
  await fs.writeFile('./userList.json', JSON.stringify(userList));
}
