console.log("Bot is starting ...");
const Discord = require("discord.js");
const auth = require("./auth.json");
const MainController = require("./Controller/MainController");
const ServerManager = require("./Tools/ServerManager");
const fs = require('fs');
const Client = new Discord.Client;

//Mise en place des différentes commandes
Client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    Client.commands.set(command.name, command);
}
Client.commands.set("main", require(`./commands/lmt.js`));

//Quand le bot est démarré...
Client.on("ready", () => {
    console.log("...Bot started !");
    Client.user.setActivity("Look at success")

    let manager = new ServerManager();
    manager.initialize(Client);
    let controller = new MainController(Client, manager);
    controller.listen();
});

Client.login(auth.TOKEN);