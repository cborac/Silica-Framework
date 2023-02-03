import {ButtonInteraction, InteractionUpdateOptions, MessageActionRow, MessageButton, MessageOptions} from "discord.js";
import {MessageButtonStyles} from "discord.js/typings/enums";
import {client} from "./Client";

export class Pagination {
     name: string;

     constructor(name: string) {
          this.name = name;
     }

     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     async fetch(nonce: string, page: number): Promise<[InteractionUpdateOptions, boolean]> {
          return [{}, true];
     }

     async createPage(nonce: string, page: number): Promise<InteractionUpdateOptions | MessageOptions> {
          const [message, last] = await this.fetch(nonce, page);

          const components: MessageButton[] = [];

          if (page !== 0)
               components.push(new MessageButton().setStyle(MessageButtonStyles.SECONDARY)
                    .setEmoji("⏮️")
                    .setCustomId(`Pag${this.name}-${page - 1}-${nonce}`));

          if (!last)
               components.push(new MessageButton().setStyle(MessageButtonStyles.SECONDARY)
                    .setEmoji("⏭️")
                    .setCustomId(`Pag${this.name}-${page + 1}-${nonce}`));

          return {
               ...message,
               components: components.length === 0 ? undefined : [new MessageActionRow().setComponents(components), ...(message.components || [])],
               nonce
          };
     }

     static async handlePagination(interaction: ButtonInteraction) {
          const [name, page, nonce] = interaction.customId.slice(3).split("-");

          const msg = await client.paginations.get(name).createPage(nonce as string, parseInt(page));

          await interaction.update(msg as InteractionUpdateOptions);
     }
}