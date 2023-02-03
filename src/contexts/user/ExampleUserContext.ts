import { UserContextCommand } from "../../structures/UserContextCommand";

const ExampleUserContextCommand = new UserContextCommand("Who's This");

ExampleUserContextCommand.handle = async (interaction) => {
     interaction.reply({
          content: `You clicked on ${interaction.user.username}!`,
          ephemeral: true
     });
};

export default ExampleUserContextCommand;