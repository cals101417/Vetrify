import React from 'react';
import { useAuth } from '../auth/context/UserAuthContext';
function Header(props) {
    const {logout} = useAuth();
    const handleLogout = async(e) => {
        try{
            await logout();
        }catch(error){
            console.log(error);
        }
    }
    return (
        <header id="page-header" className="bg-dark">
            <div class="content-header">
                <div class="content-header-section">
                    {/* <button type="button" class="btn btn-circle btn-dual-secondary" data-toggle="layout" data-action="sidebar_toggle">
                        <i class="fa fa-navicon"></i>
                    </button>
                   <button type="button" class="btn btn-circle btn-dual-secondary" data-toggle="layout" data-action="header_search_on">
                       <i class="fa fa-search"></i>
                   </button> */}
                </div>
        
                <div class="content-header-section">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-rounded btn-dual-secondary" id="page-header-user-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-user d-sm-none"></i>
                            <span class="d-none d-sm-inline-block"></span>
                            <i class="fa fa-angle-down ml-5"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right min-width-200" aria-labelledby="page-header-user-dropdown">
                            <h5 class="h6 text-center py-10 mb-5 border-b text-uppercase">User</h5>
                            <a class="dropdown-item" href="profile.php">
                                <i class="si si-user mr-5"></i> Profile
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item cursor-pointer" onClick={handleLogout}>
                                <i class="si si-logout mr-5"></i> Sign Out
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="page-header-search" class="overlay-header">
                <div class="content-header content-header-fullrow">
                    <form action="be_pages_generic_search.html" method="post">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <button type="button" class="btn btn-secondary" data-toggle="layout" data-action="header_search_off">
                                    <i class="fa fa-times"></i>
                                </button>
                            </div>
                            <input type="text" class="form-control" placeholder="Search or hit ESC.." id="page-header-search-input" name="page-header-search-input" />
                            <div class="input-group-append">
                                <button type="submit" class="btn btn-secondary">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div id="page-header-loader" class="overlay-header bg-primary">
                <div class="content-header content-header-fullrow text-center">
                    <div class="content-header-item">
                        <i class="fa fa-sun-o fa-spin text-white"></i>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;