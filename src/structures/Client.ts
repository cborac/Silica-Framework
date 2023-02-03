import { Intents, Client, Guild, Collection } from "discord.js";
import { InteractionApp } from "./InteractionApp";
import { MessageModal } from "./MessageModal";
import { SlashCommand } from "./SlashCommand";
import { UserContextCommand } from "./UserContextCommand";
import {Pagination} from "./Pagination";

const intents = new Intents();
/* INTENTS COMES HERE */
intents.add(Intents.FLAGS.GUILDS);

export const client = new Client({ intents: intents }) as Client & {
     guild: Guild,
     interactions: Collection<string, InteractionApp<any>>,
     commands: Collection<string, SlashCommand<any>>,
     modals: Collection<string, MessageModal<any>>,
     contexts: {
          user: Collection<string, UserContextCommand>
     },
     paginations: Collection<string, Pagination>
};

// Declare the interactions and commands collection
client.interactions = new Collection();
client.commands = new Collection();
client.modals = new Collection();
client.contexts = {
     user: new Collection()
};
client.paginations = new Collection();