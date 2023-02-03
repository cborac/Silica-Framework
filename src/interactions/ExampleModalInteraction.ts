import {
     MessageActionRow,
     MessageButton,
     MessageComponentInteraction,
} from "discord.js";
import ExampleModal from "../modals/ExampleModel";
import { InteractionApp } from "../structures/InteractionApp";

const SendForm = new InteractionApp<MessageComponentInteraction<"cached">>("ExampleInteraction");

SendForm.handle = async (interaction) => {
     ExampleModal.send(interaction, {
          input1: "Prefilled"
     });
};

SendForm.createInstance = () => {
     return [new MessageActionRow().setComponents(
          new MessageButton()
               .setCustomId("ExampleInteraction")
               .setLabel("Example Button")
               .setStyle("SECONDARY"))];
};

export default SendForm;