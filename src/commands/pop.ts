import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import {popSong} from "./play"
export default class pop implements IBotCommand {

    private readonly _command = "pop";

    help(): string {
        return "~pop|to remove the most recently queue song.\n";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

       popSong(msgObject.guild,msgObject);

    }



} 