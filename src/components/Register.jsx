import React,{useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context/UserAuthContext';
import { db } from '../auth/firebase';
import { serverTimestamp, setDoc, doc } from "firebase/firestore";


function Register() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    confirmpassword: ""
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(user.password === user.confirmpassword){
      try {
        // setLoading(true);
        const created_user = await signup(user.email, user.password);

        await setDoc(doc(db,"users", created_user.user.uid),{
         email:user.email,
         firstname:user.firstname,
         lastname:user.lastname,
         role:1,
         createdAt:serverTimestamp(),
         updatedAt:serverTimestamp()
        });

        navigate("/Home");

      } catch (error) {
        console.log(error);
      }
      // setLoading(false);
    }else{
      alert("Password Did not match! Try again..");
      // window.location.reload(true);
    }
  }
    return (
        <div className="content">
        <div
        // style="background-image: url('assets/media/various/bg-pattern-inverse.png');"
        >
          <div className="row mx-0 justify-content-center">
            <div className="hero-static col-lg-6 col-xl-4">
              <div className="content content-full overflow-hidden">
                <form className="py-30" onSubmit={handleSubmit}>
                  <div className="block block-themed block-rounded block-shadow ">
                    <div className="block-header bg-blue-600">
                      <h3 className="block-title">Please Sign Up</h3>
                    </div>
                    <div className="px-12 py-30">
                      <div className="form-group row">
                        <label className="ml-3 mb-3">First name</label>
                        <div className="col-12">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="firstname"
                            name="firstname"
                            placeholder="Enter your firstname.."
                            onChange={(e) =>
                              setUser({ ...user, firstname: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="ml-3 mb-3">Last name</label>
                        <div className="col-12">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="lastname"
                            name="lastname"
                            placeholder="Enter your lastname.."
                            onChange={(e) =>
                              setUser({ ...user, lastname: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="ml-3 mb-3">Email</label>
                        <div className="col-12">
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            id="email"
                            name="email"
                            placeholder="Enter your email.."
                            onChange={(e) =>
                              setUser({ ...user, email: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="ml-3 mb-3">Password</label>
                        <div className="col-12">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            id="password"
                            name="password"
                            placeholder="Enter your password.."
                            onChange={(e) =>
                              setUser({ ...user, password: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="ml-3 mb-3">Confirm Password</label>
                        <div className="col-12">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            id="confirmpassword"
                            name="confirmpassword"
                            placeholder="Enter your password.."
                            onChange={(e) =>
                              setUser({ ...user, confirmpassword: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row pt-20">
                        <div className="col-12 text-center">
                          <button
                            type="submit"
                            className="btn btn-hero btn-alt-primary min-width-175"
                          >
                            <i className="fa fa-send mr-5"></i> Register
                          </button>
                          <p className="pt-4">Already have an account? <Link to="/" className="text-blue-600 hover:underline" > Login</Link></p>
                        </div>
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

export default Register;