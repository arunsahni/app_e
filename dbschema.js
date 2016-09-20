user: {
	username: 'string',
	email: 'string',
	phone_number: 'string',
	password: 'string',
	name: 'string',
	conpany: ['ObjID for company'],
	role: ['Admin', 'Company', 'Performer', 'User'],
	address: {
		address1: {details: 'string'/*address details*/}
		address2: {details: 'string'/*address details*/}
	},
	createdAt: 'datetime',
	modifiedAt: 'datetime',
	subscription: {
		details
	}
};

company: {
	name: 'string',
	owner: ['ObjId of user'],
	address: [{
		address1: {details: 'string'/*address details*/}
		//address2: {details: 'string'/*address details*/}
	}],
	createdAt: 'datetime',
	modifiedAt: 'datetime',
};

booking: {
	createdBy: ['Owner id'],
	serviceProvider: ['service provided by company in case booking done by company'],
	performer: [''],	
	createdAt: 'datetime',
	modifiedAt: 'datetime',
};

payments: {

	createdAt: 'datetime',
	modifiedAt: 'datetime',
};

category: {
	title: 'string',
	description: 'string',
	createdAt: 'datetime',
	modifiedAt: 'datetime',
	SubCategory: {
		title: 'string',
		description: 'string',
		createdAt: 'datetime',
		modifiedAt: 'datetime'
	}
};

subscription: {
	subs name: 
	userId: [user1, user2, user3]
};

userSubscription:  {

}

