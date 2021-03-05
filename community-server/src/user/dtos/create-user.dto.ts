export class CreateAccountInput {
  email: string;
  password: string;
  name: string;
  userRole: string;
}

export class CreateAccountOutput {
  ok: boolean;
  error?: string;
}
