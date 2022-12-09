interface IUser {
    "id": number;
    "email": string;
    "active": boolean;
    "user": {
        "id": number
        "name": string
        "lastName": string
        "birthDate": string
    }
    "roles": [
        {
            "name": string
        }
    ]
    "organization": {
        "companyTitle": string,
        "isBlocked": boolean,
        "license": {
            "id": null,
            "endLicenseDate": string
        },
        "blocked": boolean
    };
}

export default IUser;