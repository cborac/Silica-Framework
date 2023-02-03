import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { ChatInputApplicationCommandData } from "discord.js";
import _ from "lodash";
import { client } from "../structures/Client";
import { DiscordEvent } from "../structures/DiscordEvent";
import { Localization } from "../structures/SlashCommand";
import { logger } from "../structures/Logger";

const ReadyEvent = new DiscordEvent("ready");

ReadyEvent.handle = async () => {
     logger.info("Connected to the gateway!");

     if (client.guilds.cache.size > 1) logger.warn("Silica Framework is a monoguild framework, expect unwanted behaviour when worked with more than 1 guild."); 

     client.guild = client.guilds.cache.first();

     const rest = new REST({ version: "9" }).setToken(client.token);

     const commandsList = await rest.get(Routes.applicationGuildCommands(client.user.id, client.guild.id)) as (ChatInputApplicationCommandData & { description_localizations?: Localization, id: string })[];
     const commands: Record<string, ChatInputApplicationCommandData & { description_localizations?: Localization, id: string }> = {};

     for (const cmd of commandsList) {
          commands[cmd.name] = cmd;
     }

     const updateData: any[] = [];
     const checked: string[] = [];

     client.commands.forEach(x => {
          updateData.push(x.serialize());

          if (commands[x.name]) checked.push(x.name);
     });

     client.contexts.user.forEach(x => {
          updateData.push(x.serialize());

          if (commands[x.name]) checked.push(x.name);
     });
     
     const deletionQueue: string[] = [];
     _.difference(Object.keys(commands), checked).forEach(x => deletionQueue.push(commands[x].id));

     await rest.put(Routes.applicationGuildCommands(client.user.id, client.guild.id), {
          body: updateData
     });

     deletionQueue.forEach(x => rest.delete(Routes.applicationGuildCommand(client.user.id, client.guild.id, x)));

     if (deletionQueue.length > 0) logger.info(`${deletionQueue.length} interaction(s) deleted.`);
     if (updateData.length > 0) logger.info(`${updateData.length} interaction(s) updated/created.`);

     logger.info("All the interactions are up-to-date!");

     logger.info("Ready!");
};

export default ReadyEvent;