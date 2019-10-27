"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const update_1 = require("./update");
class souls {
    constructor() {
        this._command = "souls";
    }
    help() {
        return "~souls soulname|to search for a soul's effect.\n";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const soulQuery = args.join(" ");
            if (!args[0]) {
                return;
            }
            this.accessSheet(soulQuery, msgObject, false);
        });
    }
    accessSheet(soulQuery, msgObject, retried) {
        return __awaiter(this, void 0, void 0, function* () {
            var soul;
            for (let i = 0; i < update_1.default.soulArray.length; i++) {
                const aliasArray = update_1.default.soulArray[i][1].split(",");
                for (let x = 0; x < aliasArray.length; x++) {
                    if (aliasArray[x].charAt(0) == " ") {
                        aliasArray[x] = aliasArray[x].substring(1);
                    }
                    aliasArray[x] = aliasArray[x].toLowerCase();
                }
                if (update_1.default.soulArray[i][0].toLowerCase() == soulQuery.toLowerCase()) {
                    soul = update_1.default.soulArray[i];
                    break;
                }
                if (aliasArray.indexOf(soulQuery.toLowerCase()) != -1) {
                    soul = update_1.default.soulArray[i];
                    break;
                }
            }
            if (soul) {
                this.format(soul, msgObject);
            }
            else if (!soul && retried) {
                msgObject.channel.send("Soul not found.");
                return;
            }
            else if (!soul && !retried) {
                yield update_1.initialize();
                this.accessSheet(soulQuery, msgObject, true);
            }
            ;
        });
    }
    format(soulArray, msgObject) {
        const soul = {
            name: soulArray[0],
            partialCombo: soulArray[2],
            partialRequirement: soulArray[3],
            fullCombo: soulArray[4],
            fullRequirement: soulArray[5],
            soulImage: soulArray[6],
            soulThumbnail: soulArray[7],
            note: soulArray[8]
        };
        let embed = new Discord.RichEmbed()
            .setThumbnail(soul.soulThumbnail)
            .setImage(soul.soulImage)
            .addField(soul.partialRequirement + " Piece Effect", soul.partialCombo, true)
            .addField(soul.fullRequirement + " Piece Effect", soul.fullCombo, true);
        if (soul.note) {
            embed.addField("Note", soul.note, true);
        }
        msgObject.channel.send(embed)
            .catch(console.error);
    }
}
exports.default = souls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291bHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc291bHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMscUNBQThDO0FBRTlDLE1BQXFCLEtBQUs7SUFBMUI7UUFFaUIsYUFBUSxHQUFHLE9BQU8sQ0FBQztJQXVGcEMsQ0FBQztJQXJGRCxJQUFJO1FBQ0EsT0FBTyxrREFBa0QsQ0FBQztJQUM5RCxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUMvRSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLElBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQ1IsT0FBTzthQUNWO1lBR0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWhELENBQUM7S0FBQTtJQUVLLFdBQVcsQ0FBQyxTQUFnQixFQUFDLFNBQXlCLEVBQUMsT0FBZTs7WUFDeEUsSUFBSSxJQUFJLENBQUM7WUFDVCxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO2dCQUNsQyxNQUFNLFVBQVUsR0FBVyxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTdELEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO29CQUNoQyxJ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