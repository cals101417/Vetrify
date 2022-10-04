import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/img/logo.png"
import { useAuth } from '../auth/context/UserAuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await login(user.email, user.password);
      navigate("/Home");
    } catch (error) {
      alert(error);
      // window.location.reload(true);
    }
  }

  const handleChange = ({ target: { value, name } }) =>
  setUser({ ...user, [name]: value });

    return (
        <div className="content h-screen">
        <div
        // style="background-image: url('assets/media/various/bg-pattern-inverse.png');"
        >
          <div className="row mx-0 justify-content-center">
            <div className="hero-static col-lg-6 col-xl-4">
              <div className="content content-full overflow-hidden">
                <div className="py-10 text-center">
                  <a className="font-w700" href="index.php">
                    {/* <img
                      className="img pd-l-30"
                      src="assets/media/favicons/Fiafi logo.png"
                      style="height: 60px; !important"
                    /> */}
                  </a>
                     <img
                     className='h-28 mx-auto'
                      src={logo}
                    />
                  <h1 className="h4 mt-10 font-w700 mb-10">
                    Welcome to Vetrify
                  </h1>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="block block-themed block-rounded block-shadow">
                    <div className="block-header bg-blue-600">
                      <h3 className="block-title">Please Sign In</h3>
                    </div>
                    <div className="block-content px-12 my-5">
                      <div className="form-group row">
                        <label className="text-left ml-6 mb-2 ">Email:</label>
                        <div className="col-12">
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="text-left ml-6 mb-2 ">Password:</label>
                        <div className="col-12">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group ">
                        <div className="col-sm-12 text-sm-center py-20">
                          <button type="submit" className="btn btn-alt-primary">
                            <i className="si si-login mr-10"></i> Sign In
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="block-content bg-body-light">
                      <div className="form-group text-center">
                        <Link to="/Register"
                          className="link-effect text-muted mr-10 mb-5 d-inline-block"
                        >
                          <i className="fa fa-plus mr-5"></i> Create Account
                        </Link>
                        <a
                          className="link-effect text-muted mr-10 mb-5 d-inline-block"
                          href="op_auth_reminder3.html"
                        >
                          <i className="fa fa-warning mr-5"></i> Forgot Password
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Login;