import * as Discord from "discord.js";
import {IBotCommand} from "../api";
var interval:boolean=false;
var intervalId:number;
export default class spam implements IBotCommand {

    private readonly _command = "spam";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        if(interval==false){
            msgObject.channel.send("Started.");
            interval=true;
           intervalId= setInterval(this.execute,5000,msgObject);
          }else{
              msgObject.channel.send("Stopped.");
              interval = false;
              clearInterval(intervalId);
          }
    }

    async execute(msgObject: Discord.Message): Promise<void> {
        const spam =["yes", "maybe","no","defnitely","just do whatever you think is right","why are you asking this?"];
        msgObject.channel.send(spam[Math.floor(Math.random() * spam.length)]);
    }
} 