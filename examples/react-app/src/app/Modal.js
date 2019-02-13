import React, { Component } from "react";

class Modal extends Component {
  render() {
    const { splitster } = this.props;
    const modal = splitster.get("MODAL");
    return (
      <div>
        Modaaaal
        {modal.value === "hello" ? "It is hello" : "it is " + modal.value}
      </div>
    );
  }
}

export default Modal;
