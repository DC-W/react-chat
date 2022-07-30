// store userlist in map
global.userList = [];


// API to handle authentication VIA post only
export default function Auth(req, res) {
    // only use post
    if (req.method === 'POST') {
        if (req.body.type === 'register') {
            // handle registration requests 
            if (_register(req.body.uname, req.body.upass)) {
                //user was a new register
                return res.status(200).send();
            }
            //user was a new register
            return res.status(403).send();
        }
        else if (req.body.type === 'login') {
            // handle login reqs
            if (_login(req.body.uname, req.body.upass)) {
                // set session
                req.session.set("user", u);
                req.session.save();
                // tell to local redirect to home
                res.redirect("/home");
                res.end();
            }
            res.redirect('/');
            res.end();
        }
        else if (req.body.type === 'logout') {
            // handle logout reqs
        }
    }
}



//-------------------------------------------------
function _register(u, p) {
    // if array is empty then insert user obj
    if (global.userList.length === 0) {
        // create user obj
        const userObj = {
            "userkey": u.toString().toLowerCase(),
            "userName": u,
            "pass": p,
            "isActive": false
        }
        // push to array
        global.userList.push(userObj);
        return true;
    }

    // find if user already exists
    const uexist = global.userList.find((elem) => {
        return (elem.userkey).startsWith(u);
    });

    // if no user exists
    if (uexist == undefined) {
        // create user obj
        const userObj = {
            "userkey": u,
            "userName": u,
            "pass": p,
            "isActive": false
        }
        global.userList.push(userObj);
        return true;
    }

    // user already exists
    return false;

}

function _login(u, p) {
    // handle login reqs
    global.userList.some((elem, id, arr) => {
        // check if user exists in database
        if (elem.userkey === u.toString().toLowerCase()) {
            // check is user password is the same
            if (elem.pass === p.toString()) {
                //same pass and correct user
                if (!elem.isActive) {
                    // only log in if user not logged in
                    elem.isActive = true;
                    console.log(elem);
                    return true;
                }
            }
        }
    });
    return false;
}

function _logout(u) {
    // handle logout reqs
}