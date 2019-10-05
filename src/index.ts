import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import { IBotCommand } from "./api";
// import * as Youtube from "simple-youtube-api";

var ffmpeg = require('ffmpeg-static');
// import * as ytdl from ''

const client: Discord.Client = new Discord.Client();

let commands : IBotCommand[] = [];

loadCommands(`${__dirname}/commands`);

client.on("ready", ()=>{
    //when bot is ready
    console.log("Ready!!");
    //bot activity
    client.user.setActivity("Danil suffers", {type:"WATCHING" });
})
client.on("message",msg=>{

    //if messager = bot, ignore it
    if(msg.author.bot) {return;}
    //if its direct message then ignore
    if(msg.channel.type=="dm"){return;}
    //if message did not start with !
    if(!msg.content.startsWith(ConfigFile.config.prefix)) {return;}

    //Handle Command
    handleCommand(msg);
})

async function handleCommand(msg:Discord.Message){
//Split the string into command and all of the args
    let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "").toLowerCase();
    let args = msg.content.split(" ").slice(1);

    for(const commandsClass of commands){
        //attempt to execute commands
        try {
            //check commandClass for if this command is the correct one
            if(!commandsClass.isThisCommand(command)){
                //go to next one if this is not the correct one
                continue;
            }
            //Pause execution whilst we run the command's coce
            await commandsClass.runCommand(args,msg, client);
            
        }
        catch(exception){

            console.log(exception);
        }
    }
}

 function loadCommands(commandsPath: string){
//Exit if no commands
if(!ConfigFile.config ||(ConfigFile.config.commands as string[]).length === 0 ){return; }

//Loop through command list
for (const commandName of ConfigFile.config.commands as string[]){

    const commandsClass = require(`${commandsPath}/${commandName}`).default;

    const command = new commandsClass() as IBotCommand;

    commands.push(command);
}   

 }

client.login(ConfigFile.config.token);
