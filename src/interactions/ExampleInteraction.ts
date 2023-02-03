import {
     MessageActionRow,
     MessageButton,
     MessageComponentInteraction,
} from "discord.js";
import { InteractionApp } from "../structures/InteractionApp";

const ExampleInteraction = new InteractionApp<MessageComponentInteraction<"cached">>("ExampleInteraction");

ExampleInteraction.handle = async (interaction) => {
     interaction.reply({
          content: "Hello World!"
     });
};

ExampleInteraction.createInstance = () => {
     return [new MessageActionRow().setComponents(
          new MessageButton()
               .setCustomId("ExampleInteraction")
               .setLabel("Example Button")
               .setStyle("SECONDARY"))];
};

export default ExampleInteraction;