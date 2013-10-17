// 	                                       
//  geoinfo.js - module for storing geo position data
//

function geouser (user,lat,lon,time)
{ // geouser
	this.username  = user;
	this.latitude  = lat;
	this.longitude = lon;
	this.time      = time;
} // geouser


function geoorg (orgname)
{ // geoorg
	this.orgname = orgname;
	this.geouserarray = new Array ();
	
	this.dumpOut = function () { // dumpOut
		for (var x in this.geouserarray) { // foreach
			console.log ("    "+this.geouserarray[x].username+" "+this.geouserarray[x].latitude + " "+this.geouserarray[x].longitude + " " +this.geouserarray[x].time);
		} // foreach
	} // dumpOut
	
	this.updUser = function (theUser,theLat,theLon,theTime) { // updUser
		var retval  = -1;
		for (var x in this.geouserarray) { // foreach
			if (this.geouserarray[x].username == theUser) { // match
				this.geouserarray[x].latitude  = theLat;
				this.geouserarray[x].longitude = theLon;
				this.geouserarray[x].time      = theTime;
				retval = x;
				break;
			} // match
		} // foreach
		
		if (retval == -1) { // is new
			retval = this.geouserarray.push (new geouser (theUser,theLat,theLon,theTime)) - 1;	// add this as it doesn't exists
		} // is new
		return retval;
	} // updUser
} // geoorg


function geoinfo () 
{ // geoinfo
	this.geoorgarray = new Array ();
	
	//////////////////////////////////////////////////////////////////// dump out all the orgs and users
	this.dumpOut = function () { // dumpOut
		for (var x in this.geoorgarray) { // foreach
			console.log (this.geoorgarray[x].orgname);
			this.geoorgarray[x].dumpOut ();
		} // foreach
    } // dumpOut
    
    //////////////////////////////////////////////////////////////////// add a new organisation
    this.updOrg = function (theOrg) { // updOrg
		var retval  = -1;
		for (var x in this.geoorgarray) { // foreach
			if (this.geoorgarray[x].orgname == theOrg) { // match
				retval = x;
				break;
			} // match
		} // foreach
		
		if (retval == -1)
			retval = this.geoorgarray.push (new geoorg (theOrg)) - 1;	// add this as it doesn't exists
		return retval;
	} // updOrg
	
	//////////////////////////////////////////////////////////////////// update/add new organisation and user position
	this.updOrgUser = function (theOrg,theUser,theLat,theLon,theTime) { // updOrgUser
		var orgIdx = this.updOrg (theOrg);
		this.geoorgarray[orgIdx].updUser (theUser,theLat,theLon,theTime);	
	} // updOrgUser
	
	//////////////////////////////////////////////////////////////////// get the users for an organisation.
	this.getOrgUsersJSON = function (theOrg) { 
		var orgIdx  = -1;
		for (var x in this.geoorgarray) { // foreach
			if (this.geoorgarray[x].orgname == theOrg) { // match
				orgIdx = x;
				break;
			} // match
		} // foreach
		
		return orgIdx!=-1?JSON.stringify(this.geoorgarray[x]):"{}";
	} // getOrgUsersJSON
} // geoinfo

module.exports = geoinfo;
