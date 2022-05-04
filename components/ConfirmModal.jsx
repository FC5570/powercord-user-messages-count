const { React } = require("powercord/webpack");
const { Modal } = require("powercord/components/modal");
const { close } = require("powercord/modal");
const { FormTitle, Button, Flex } = require("powercord/components");

class ConfirmModal extends React.Component {
  render() {
    return (
      <Modal className="powercord-text">
        <Modal.Header>
          <FormTitle tag="h4" align="center">
            Usage of User Token
          </FormTitle>
        </Modal.Header>

        <Modal.Content style={{ marginTop: 20, marginBottom: 20 }}>
          The "user messages count plugin" makes an API request to get the total
          amount of messages a user has in a server, this is however{" "}
          <strong>
            only possible by making the request with your token in the headers
          </strong>
          . This is possibly against powercord's guidelines and Discord's TOS as
          it makes an API request. However, this does not abuse the API in any
          way and only makes a single request with your consent. Please confirm
          if you agree with the usage of your token.
        </Modal.Content>

        <Modal.Footer>
          <Flex style={{ alignContent: "center", justifyContent: "center" }}>
            <Button
              color={Button.Colors.GREEN}
              style={{ marginRight: 8 }}
              onClick={() => {
                this.props.settings.set("use-token-for-search", true);
                close()
              }}
            >
              Agree
            </Button>
            <Button
              color={Button.Colors.RED}
              onClick={() => {
                this.props.settings.set("use-token-for-search", false);
                close();
              }}
            >
              Disagree
            </Button>
          </Flex>
        </Modal.Footer>
      </Modal>
    );
  }
}

module.exports = ConfirmModal;
