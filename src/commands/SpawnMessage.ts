import {MessageOptions, Permissions} from "discord.js";
import ExampleInteraction from "../interactions/ExampleInteraction";
import { SlashCommand } from "../structures/SlashCommand";

const choices: Record<string, { name: string, message: MessageOptions }> = {
     "exampleinteraction": {
          message: {
               content: "Click the button below!",
               components: ExampleInteraction.createInstance()
          },
          name: "Example Interaction Message"
     }
};

const SpawnMessageCommand = new SlashCommand("spawnmessage", {
     value: "Spawn a message"
}, [{
     type: "STRING",
     choices: Object.keys(choices).map(x => ({ name: choices[x].name, value: x })),
     name: "message",
     description: "Message you want to spawn",
     required: true
}] as const);

SpawnMessageCommand.execute = async (args, interaction) => {
     interaction.channel.send(choices[args[0]].message);
     interaction.reply({
          content: "Done!",
          ephemeral: true
     });
};

SpawnMessageCommand.permissions = [Permissions.FLAGS.ADMINISTRATOR];

export default SpawnMessageCommand;