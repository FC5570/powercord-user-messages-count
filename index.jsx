/* eslint-disable */

const { Plugin } = require("powercord/entities");
const { getModule, React } = require("powercord/webpack");
const { open } = require("powercord/modal");

const ConfirmModal = require("./components/ConfirmModal");
const Settings = require("./components/Settings");

class UserMessageCountPlugin extends Plugin {
  startPlugin() {
    powercord.api.settings.registerSettings(this.entityID, {
      category: this.entityID,
      label: "User Message Count",
      render: Settings,
    });

    if (this.settings.get("use-token-for-search", null) === null) {
      open((event) => <ConfirmModal settings={this.settings} event={event} />);
    }

    powercord.api.commands.registerCommand({
      command: "message-count",
      aliases: ["msgcount", "usermessages", "messages"],
      description: "Check the message count of a user.",
      executor: async (args) => {
        if (!this.settings.get("use-token-for-search", false)) {
          return {
            send: false,
            result:
              "You need to consent to usage of your token to be able to use this plugin. Head over to `Settings -> User Message Count` to agree.",
          };
        }

        const id = args[0];
        if (!id)
          return {
            send: false,
            result: "Please specify a user ID.",
          };
        try {
          const includeNsfw = this.settings.get(
            "include-nsfw-messages-in-search",
            false
          );
          const { getGuildId } = await getModule(["getLastSelectedGuildId"]);
          const data = await this.fetchMessages(getGuildId(), id, includeNsfw);
          const messages = await data.json();

          return {
            send: false,
            result: `<@${id}> has ${new Intl.NumberFormat().format(
              messages.total_results
            )} messages ${
              includeNsfw
                ? "(also includes messages sent in NSFW channels.)"
                : ""
            }`,
          };
        } catch (err) {
          console.log(err);
        }
      },
    });
  }

  fetchMessages(guildId, userId, includeNsfw = false) {
    return fetch(
      `https://canary.discord.com/api/v9/guilds/${guildId}/messages/search?author_id=${userId}&include_nsfw=${includeNsfw}`,
      {
        headers: {
          Authorization: this.fetchToken(),
        },
      }
    );
  }

  fetchToken() {
    return webpackChunkdiscord_app.push([
      [Math.random()],
      {},
      (r) => {
        return Object.values(r.c)
          .find(
            (m) =>
              m.exports &&
              m.exports.default &&
              m.exports.default.getToken !== void 0
          )
          .exports.default.getToken();
      },
    ]);
  }

  pluginWillUnload() {
    powercord.api.settings.unregisterSettings(this.entityID);
    powercord.api.commands.unregisterCommand("message-count");
  }
}

module.exports = UserMessageCountPlugin;
