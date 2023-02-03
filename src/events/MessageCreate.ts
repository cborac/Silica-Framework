import { DiscordEvent } from "../structures/DiscordEvent";
import fetch from "node-fetch";
import {createTicketThread} from "../interactions/ticket/CreateTicket";
import {client} from "../structures/Client";

const MessageCreateEvent = new DiscordEvent("messageCreate");

MessageCreateEvent.handle = async (msg) => {
     if (msg.author.id === "965737907690303488" && msg.channel.id === "946842453162479636") {
          const res = await fetch(msg.attachments.first().url).then(x => x.json()) as any;

          await createTicketThread(await client.guild.members.fetch(res.executor_id as string), res.reason, {
               target: res.target_id,
               extraText: res.description
          });
     }
};

export default MessageCreateEvent;