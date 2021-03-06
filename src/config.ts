require('dotenv').config();

  

export let config = {

    "token": "",

    "prefix": process.env.prefix||"~", 
    "commands":[
        "kick",
        "prune",
        "serverinfo",
        "join",
        "play",
        "pause",
        "resume",
        "skip",
        "restart",
        "volume",
        "vol",
        "pop",
        "destroy",
        "loop",
        "info",
        "stats",
        "update",
        "skills",
        "date",
        "souls",
        "leave",
        "queue",
        "bounties",
        "clues",
        "test2",
        "emoji",
        "help",
        "ask",
        "cv",
        "talk",
        "spam"
    ]
}
