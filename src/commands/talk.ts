import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class talk implements IBotCommand {

    private readonly _command = "talk";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
      if(!args[0]){
        return;
      }
      if(args[0]=="here"){
        args.shift();
        const message = args.join(" ");
        msgObject.channel.send(message);
      }else{
          this.ask(args,msgObject,client);
      }
    
    }
    async ask(args: string[],msgObject:Discord.Message,client:Discord.Client){
        const guild =client.guilds.get(args[0]);
        if(!guild){
          msgObject.channel.send("Guild not found.");
          return;
        }
      //   const channelId =await this.getString(msgObject, client, "Please enter channel ID.");
      // const message = await this.getString(msgObject, client, "Please enter message to send.");
      const promiseChannelId =new Promise((resolve,reject)=>{
          resolve(this.getString(msgObject, client, "Please enter channel ID."));
      })
  
      let channelId:string =await promiseChannelId as string;
  
      
      if (channelId=="here"){
          var channel:Discord.TextChannel = msgObject.channel as Discord.TextChannel;
      }else{
          var channel:Discord.TextChannel =  guild.channels.get(channelId) as Discord.TextChannel;
      }
      
  
      if(!channel){
          msgObject.channel.send("Channel not found.");
          return;
        }
      const promiseMessage =new Promise((resolve,reject)=>{
          resolve(this.getString(msgObject, client, "Please enter message to send."));
      })
      let message = await promiseMessage;
     
        channel.send(message);
    }
    async getString(msgObject: Discord.Message, client: Discord.Client, message:String):Promise<string>{
        const promiseString =new Promise((resolve,reject)=>{
            msgObject.channel.send(`>>> ${message}`).then((msg)=>{
                (msg as Discord.Message).channel.awaitMessages(response => response.author.id != client.user.id,{ max: 1, time: 10000, errors: ['time'] }).then(
                 collected => resolve(collected.first().content) 
                ).catch(()=>{
                    console.log(`Time Out. `)
                    resolve("Default");
                });
            })
        })
        const string = await promiseString as string;
        return string;
    }
    



} 