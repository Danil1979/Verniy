import * as Discord from "discord.js";
import {IBotCommand} from "../api";
require('dotenv').config();
export default class cv implements IBotCommand {

    private readonly _commands = ["cv","coronavirus"];

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return this._commands.includes(command);
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
      
        var unirest = require("unirest");
        new Promise((resolve) =>{
            unirest.get("https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php")
        .headers({
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": process.env.RAPIDAPIKEY
        })
        .query({
            "country": args[0]||"Malaysia"
        })
        .end((res: any) => {
            if (res.error) throw new Error(res.error)   
            const object = JSON.parse(res.body)
            resolve(object.latest_stat_by_country[0])
        })})
        .then((value)=>
        this.embed(msgObject,value)
        )



    }
    embed(msgObject: Discord.Message,country:any){
        console.log(country)
        let embed =new Discord.RichEmbed()
        .addField("Country",`${country.country_name}`,true)
        .addField("Total cases",`${country.total_cases||0}`,true)
        .addField("New cases",`${country.new_cases||0}`,true)
        .addField("Active cases",`${country.active_cases||0}`,true)
        .addField("Total deaths",`${country.total_deaths||0}`,true)
        .addField("New deaths",`${country.new_deaths||0}`,true)
        .addField("Total recovered",`${country.total_recovered||0}`,true)
        .setFooter(`${country.record_date}`)
        msgObject.channel.send(embed)
        .catch(console.error);
    }




} 