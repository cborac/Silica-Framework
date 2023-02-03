import { MessageEmbedOptions } from "discord.js";
import { Pagination } from "../structures/Pagination";

const ExamplePagination = new Pagination("ExamplePagination");

const pages: MessageEmbedOptions[] = [{
     description: "Title of Page 1."
}, {
     description: "Title of Page 2."
}];

ExamplePagination.fetch = async function(_, page) {
     return [{
          embeds: [pages[page]]
     }, page === pages.length - 1];
};

export default ExamplePagination;