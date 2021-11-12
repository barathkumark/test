export class User {
    id: number;
    username: string;
    password: string;
    token?: string;
}

export class UserDashboard {
    id!: string;
    schema_name!: string;
    user_name!: string;
    user_email!: string;
    user_status!: string;
    isDeleting: boolean = false;
}
