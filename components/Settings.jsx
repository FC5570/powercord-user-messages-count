const { React } = require("powercord/webpack");
const { SwitchItem } = require("powercord/components/settings");

class Settings extends React.Component {
  render() {
    const { getSetting, toggleSetting } = this.props;
    return (
      <>
        <SwitchItem
          value={getSetting("use-token-for-search", false)}
          onChange={() => toggleSetting("use-token-for-search")}
          note={`Consent to usage of user token for making API requests. This plugin makes an API request to get the total amount of messages a user has in a server, this is however only possible by making the request with your token in the headers. This is possibly against powercord's guidelines and Discord's TOS as it makes an API request. However, this does not abuse the API in any way and only makes a single request with your consent.`}
        >
          Use token for search
        </SwitchItem>

        <SwitchItem
          value={getSetting("include-nsfw-messages-in-search", false)}
          onChange={() => toggleSetting("include-nsfw-messages-in-search")}
          note="Whether to include messages from NSFW channels too."
        >
          Include NSFW messages in search
        </SwitchItem>
      </>
    );
  }
}

module.exports = Settings;
