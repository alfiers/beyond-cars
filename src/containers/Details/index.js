import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import WhatsappImg from "../../assets/whatsapp.png";

import {
  loadDetailsData,
  saveDetails,
  sendEmail
} from "../../redux/actions/app";

import "./index.css";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: props.details,
      language: "Chinese",
      changed: false
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.loadDetailsData(id);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.details === null) {
      this.props.history.push("/");
      return;
    }
    if (newProps.details !== this.props.details) {
      this.setState({ details: newProps.details, changed: false });
    }
  }
  handleLngChange = event => {
    this.setState({ language: event.target.value });
  };
  handleChange = name => event => {
    let { details } = this.state;
    details[name] = event.target.value;
    this.setState({
      details,
      changed: true
    });
  };
  handleSave = () => {
    this.props.saveDetails({
      id: this.props.match.params.id,
      details: this.state.details
    });
  };
  sendEmail = () => {
    this.props.sendEmail({
      language: this.state.language,
      details: this.state.details
    });
  };
  whatsapp = () => {
    const { phoneNumber } = this.state.details;
    window.open("https://wa.me/852" + phoneNumber, "_blank");
  };
  render() {
    const { details, changed } = this.state;

    if (details === undefined) {
      return null;
    }
    const {
      canConsign,
      canDirectSale,
      carColour,
      carMake,
      carMileage,
      carModel,
      carPreviousOwners,
      carYear,
      consignPrice,
      customerName,
      dealerPrice,
      email,
      language,
      phoneNumber,
      preferredSellingMethod
    } = details;
    return (
      <div className="details-container">
        <Typography component="h2" variant="h3">
          Sell Quote Detail
        </Typography>
        <br />
        <Typography component="h3" variant="h6">
          {carYear}&nbsp;{carMake}&nbsp;{carModel}
        </Typography>
        <br />
        <Grid container spacing={24}>
          <Grid item xs>
            <Typography variant="body1">Colour:&nbsp;{carColour}</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="body1">Hand:&nbsp;{carColour}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs>
            <Typography variant="body1">Miledge:&nbsp;{carMileage}</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="body1">
              DS:&nbsp;{canDirectSale}&nbsp;|&nbsp;CSGN:&nbsp;{canConsign}
            </Typography>
          </Grid>
        </Grid>
        <br />
        <Divider />
        <Typography component="h3" variant="h6">
          PRICE
        </Typography>
        <TextField
          value={consignPrice}
          label="CONSIGN PRICE"
          type="number"
          onChange={this.handleChange("consignPrice")}
          error={consignPrice === ""}
        />
        <br />
        <br />
        <TextField
          value={dealerPrice}
          label="DEALER PRICE"
          type="number"
          onChange={this.handleChange("dealerPrice")}
          error={dealerPrice === ""}
        />
        <Typography component="h3" variant="h6">
          OPTIONS
        </Typography>
        <RadioGroup
          aria-label="position"
          name="position"
          value={preferredSellingMethod}
          onChange={this.handleChange("preferredSellingMethod")}
          row
        >
          <FormControlLabel
            value="dealerOnly"
            control={<Radio color="primary" />}
            label="Dealer Only"
            labelPlacement="end"
          />
          <FormControlLabel
            value="cosignOnly"
            control={<Radio color="primary" />}
            label="Cosign Only"
            labelPlacement="end"
          />
          <FormControlLabel
            value="cosignDealer"
            control={<Radio color="primary" />}
            label="Cosign + Dealer"
            labelPlacement="end"
          />
          <FormControlLabel
            value="noOffer"
            control={<Radio color="primary" />}
            label="No Offer"
            labelPlacement="end"
          />
        </RadioGroup>
        <Button
          disabled={!changed}
          onClick={this.handleSave}
          variant="contained"
        >
          Save
        </Button>
        <br />
        <br />
        <Divider />
        <Typography component="h3" variant="h6">
          EMAIL - {this.state.language}
        </Typography>
        <RadioGroup
          aria-label="position"
          name="position"
          value={this.state.language}
          onChange={this.handleLngChange}
          row
        >
          <FormControlLabel
            value="Chinese"
            control={<Radio color="primary" />}
            label="Chinese"
            labelPlacement="end"
          />
          <FormControlLabel
            value="English"
            control={<Radio color="primary" />}
            label="English"
            labelPlacement="end"
          />
        </RadioGroup>
        <Button onClick={this.sendEmail} variant="contained">
          Send Email
        </Button>
        &nbsp;&nbsp;
        <Link
          component="button"
          variant="body2"
          onClick={this.whatsapp}
          style={styles.whatsapp}
        >
          <img src={WhatsappImg} style={styles.whatsapp} />
        </Link>
        <br />
        <br />
        <Divider />
        <Typography component="h3" variant="h6">
          Customer Detail
        </Typography>
        <Typography variant="body1">
          {customerName}&nbsp;|&nbsp;{phoneNumber}&nbsp;|&nbsp;{email}
        </Typography>
        <Divider />
        <br />
        <Typography variant="body2">Record Created:&nbsp;</Typography>
        <Typography variant="body2">
          Firestore ID:&nbsp;{this.props.match.params.id}
        </Typography>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    details: state.app.details
  };
}

function mapDispatchToProps(dispatch) {
  const actions = { loadDetailsData, saveDetails, sendEmail };
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);

const styles = {
  whatsapp: {
    height: 36
  }
};
