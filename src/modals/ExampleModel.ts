import { MessageModal, MessageModalInput } from "../structures/MessageModal";

const ExampleModal = new MessageModal("ExampleModal")
     .setTitle("Example Modal")
     .addInput(new MessageModalInput("input1").setMaxLength(16).setLabel("Input").setPlaceholder("Placeholder"))
     .addInput(new MessageModalInput("input2").setMaxLength(16).setLabel("Input").setPlaceholder("Placeholder"));


ExampleModal.handle = async (values, interaction) => {
     interaction.reply({
          ephemeral: true,
          content: `Received the values: ${JSON.stringify(values)}`
     });
};

export default ExampleModal;