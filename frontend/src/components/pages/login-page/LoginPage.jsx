import React, { Component } from "react";
import classes from "./LoginPage.module.css";
import TextInput from "../../shared-components/TextInput/TextInput";
import { FormButton } from "../../shared-components/Button/Button";
import { connect } from "react-redux";
import { login, autoLogin } from "../../../redux/actions/login-action";
import jwtDecode from "jwt-decode";
import PageContainer from '../../shared-components/PageContainer/PageContainer'

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.accessToken !== null) {
      return this.props.history.replace("/dashboard/rooms");
    }
  }

  componentDidMount = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (
      accessToken &&
      jwtDecode(accessToken).exp > new Date().getTime() / 1000
    ) {
      await this.props.autoLogin();
      return this.props.history.replace("/dashboard/rooms");
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state.formData;

    await this.props.login({ email, password });
    window.location.reload();
  };

  handleChange = ({ target }) => {
    this.setState({
      formData: { ...this.state.formData, [target.name]: target.value },
    });
  };

  render() {
    const { email, password } = this.state.formData;

    const errorMessage = this.props.error ? (
      <div className="alert alert-danger">{this.props.error.message}</div>
    ) : (
      ""
    );

    return (
      <PageContainer>
        <div className={classes.LoginPage}>
        <div className="container">
          <div className="row">
            <div className={classes.PageMargin}></div>

            <div className="col-md-3   col-sm-12"></div>
            <div className="col col-md-6 col-sm-12">
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
      </PageContainer>
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
  autoLogin: () => dispatch(autoLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
