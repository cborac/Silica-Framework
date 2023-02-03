import { client } from "../structures/Client";
import { DiscordEvent } from "../structures/DiscordEvent";
import { SlashCommand } from "../structures/SlashCommand";
import {Pagination} from "../structures/Pagination";

const InteractionCreate = new DiscordEvent("interactionCreate");

InteractionCreate.handle = async (interaction) => {
     if (interaction.isAutocomplete()) {
          client.interactions.get("AutoComplete_" + interaction.commandName).handle(interaction);
     } else if (interaction.isCommand()) {
          const command = client.commands.get(interaction.commandName);

          if (!command) return;

          let args = [];

          if (!command.overriden) {
               args = command.arguments.map((x: any) => {
                    //@ts-expect-error Sorry, TS being an ass
                    return interaction.options["get" + SlashCommand.NiceArgumentNames[x.type]](x.name, false);
               });
          }


          command.execute(args, interaction);
     } else if (interaction.isUserContextMenu()) {
          client.contexts.user.get(interaction.commandName)?.handle(interaction);
     }
     /**
      * `customId` only exists on Button Interactions etc.
      *  So by checking if it has the property, we are basically checking if it's a "that type" of interaction
      *  But typescript believes that this is an "unknown" Interaction, so it says customId will never exist
      */
     //@ts-expect-error `customId` only exists on Button Interactions
     else if (interaction.customId) {
          if (interaction.isButton() && interaction.customId.startsWith("Pag")) {
               return await Pagination.handlePagination(interaction);
          }

          //@ts-expect-error `customId` only exists on Button Interactions
          client.interactions.get(interaction.customId.split("-")[0])?.handle(interaction);
     }
};

export default InteractionCreate;