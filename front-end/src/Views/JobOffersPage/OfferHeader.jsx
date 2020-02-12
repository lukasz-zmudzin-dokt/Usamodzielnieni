import React from "react";

class OfferHeader extends React.Component {
    render() {
        let offerTitle = this.props.post + "\n" + this.props.company;
        return (
          <div>
            {offerTitle}
          </div>
        );
      }
}

export default OfferHeader;