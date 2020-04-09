import React, { Component } from "react";
import classes from "./LoginPage.module.css";
import TextInput from "../../shared-components/TextInput/TextInput";
import { FormButton } from "../../shared-components/Button/Button";
import { connect } from "react-redux";
import { login } from "../../../redux/actions/login-action";
import { Redirect } from "react-router";
class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: "",
        password: "",
      },
      formErrors: {
        email: "",
        password: "",
      },

      formIsValid: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state.formData;

    this.props.login({ email, password });
  };

  handleChange = ({ target }) => {
    this.setState({
      formData: { ...this.state.formData, [target.name]: target.value },
    });
  };

  render() {
    const { email, password } = this.state.formData;

    const errorMessage = this.props.error ? (
      <div className="alert alert-danger">Please use valid credentials</div>
    ) : (
      ""
    );

    if (this.props.accessToken) {
      return <Redirect to="/dashboard/rooms" />;
    }
    return (
      <div className={classes.LoginPage}>
        <div className="container">
          <div className="row">
            <div className={classes.PageMargin}></div>
            <div className="col col-md-6 offset-3">
              {errorMessage}

              <form
                className={classes.LoginForm}
                method="post"
                onSubmit={this.handleSubmit}
              >
                <div className="form-group">
                  <TextInput
                    placeholder="Email address"
                    required
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                  <TextInput
                    placeholder="Password"
                    type="password"
                    required
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </div>
                <FormButton loading={this.props.loading}>LOGIN</FormButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.login.loading,
  error: state.login.error,
  accessToken: state.login.accessToken,
});

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
